import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';
import Modal from 'react-native-modal';
import { showMessage } from "react-native-flash-message";

import PlayerModal from '../views/musicPlayer/PlayerModal'
import MiniThumbnail from '../assets/images/default_mini_thumbnail.png';
import { setCurrentSong } from '../views/musicPlayer/PlayerActions';
import I18n from '../i18n'

const events = [
    TrackPlayerEvents.PLAYBACK_STATE,
    TrackPlayerEvents.PLAYBACK_ERROR,
    TrackPlayerEvents.REMOTE_PLAY,
    TrackPlayerEvents.REMOTE_PAUSE,
    TrackPlayerEvents.REMOTE_PREVIOUS,
    TrackPlayerEvents.REMOTE_NEXT,
    TrackPlayerEvents.REMOTE_STOP,
    TrackPlayerEvents.PLAYBACK_QUEUE_ENDED
];

const MiniPlayer = ({ list }) => {

    const currentSong = useSelector(state => state.player.currentSong);
    const [playerState, setPlayerState] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [replayType, setReplayType] = useState('no');
    const [isRandom, setIsRandom] = useState(false);

    const { position, duration } = TrackPlayer.useTrackPlayerProgress();

    const dispatch = useDispatch();

    const { title, artist } = currentSong;

    TrackPlayer.useTrackPlayerEvents(events, async (event) => {
        if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
            console.warn('An error occurred while playing the current track.');
        }
        if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
            await setPlayerState(event.state);
        }
        if (event.type === TrackPlayerEvents.REMOTE_PLAY) {
            TrackPlayer.play();
        }
        if (event.type === TrackPlayerEvents.REMOTE_PAUSE) {
            TrackPlayer.pause()
        }
        if (event.type === TrackPlayerEvents.REMOTE_PREVIOUS) {
            await previousHandler();
        }
        if (event.type === TrackPlayerEvents.REMOTE_NEXT) {
            await nextHandler();
        }
        if (event.type === TrackPlayerEvents.REMOTE_STOP) {
            TrackPlayer.destroy();
        }
        if (event.type === TrackPlayerEvents.PLAYBACK_QUEUE_ENDED) {
            await nextHandler();
        }
    });

    useEffect(() => {
        if (currentSong.id) {
            TrackPlayer.reset();
            TrackPlayer.add(currentSong);
            TrackPlayer.play();
        }
    }, [currentSong.id])

    const playHandler = () => {
        if (currentSong.id) {
            TrackPlayer.add(currentSong);
            TrackPlayer.play();
        }
    }

    const pauseHandler = () => {
        console.log('Pause')
        TrackPlayer.pause();
    }

    const nextHandler = async () => {
        if (list !== null) {
            if (currentSong.id === (list.length - 1).toString() && isRandom === false) {
                if (replayType === 'all-songs') {
                    await TrackPlayer.add(list[0]);
                    dispatch(setCurrentSong(list[0]));
                    TrackPlayer.skipToNext();
                }
                else {
                    showMessage({
                        message: "Mini Player: No next song",
                        type: "warning",
                    });
                }
            }
            else if (currentSong.id) {
                if (replayType === 'no' || replayType === 'all-songs') {
                    const nextTrackID = isRandom ? await (Math.floor(Math.random() * list.length)).toString() : await (parseInt(currentSong.id) + 1).toString();
                    await TrackPlayer.add(list[nextTrackID]);
                    dispatch(setCurrentSong(list[nextTrackID]));
                    TrackPlayer.skipToNext();
                }
                else if (replayType === 'one-song') {
                    await TrackEvent.add(currentSong.id);
                    TrackPlayer.skipToNext();
                }
            }
        }
    }

    const previousHandler = async () => {
        if (list !== null) {
            if (currentSong.id === '0') {
                showMessage({
                    message: "Mini Player: No previous song",
                    type: "info",
                });
            }
            else if (currentSong.id) {
                const previousTrackID = isRandom ? await (Math.floor(Math.random() * list.length)).toString() : await (parseInt(currentSong.id) - 1).toString();
                await TrackPlayer.add(list[previousTrackID]);
                dispatch(setCurrentSong(list[previousTrackID]));
                TrackPlayer.skipToNext();
            }
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => setIsVisible(true)}>
            <Modal
                isVisible={isVisible}
                style={{ margin: 0 }}
            >
                <PlayerModal
                    setIsVisible={setIsVisible}
                    playerState={playerState}
                    previousHandler={previousHandler}
                    pauseHandler={pauseHandler}
                    playHandler={playHandler}
                    nextHandler={nextHandler}
                    currentSong={currentSong}
                    position={position}
                    duration={duration}
                    replayType={replayType}
                    setReplayType={setReplayType}
                    isRandom={isRandom}
                    setIsRandom={setIsRandom}
                />
            </Modal>
            <Image source={MiniThumbnail} style={styles.miniThumb} />
            <View style={styles.titleContainer}>
                <Text style={styles.titleSong}>{title ? title : I18n.t('songName')}</Text>
                <Text style={styles.titleArtist}>{artist ? artist : I18n.t('unknown')}</Text>
            </View>
            <View style={styles.controlContainer}>
                <Entypo name='controller-jump-to-start' style={{ marginLeft: moderateScale(7) }} size={moderateScale(35)} onPress={previousHandler} />
                {
                    (playerState === STATE_PLAYING)
                        ? <Entypo
                            name='controller-paus'
                            style={{ marginLeft: moderateScale(7) }}
                            size={moderateScale(35)}
                            onPress={pauseHandler}
                        />
                        : <Entypo
                            name='controller-play'
                            style={{ marginLeft: moderateScale(7) }}
                            size={moderateScale(35)}
                            onPress={playHandler} />
                }
                <Entypo name='controller-next' style={{ marginLeft: moderateScale(7) }} size={moderateScale(35)} onPress={nextHandler} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: verticalScale(55),
        width: '100%',
        borderRadius: moderateScale(10),
        borderColor: 'black',
        alignItems: 'center',
        borderWidth: scale(3),
        flexDirection: 'row'
    },
    miniThumb: {
        height: verticalScale(40),
        width: scale(40),
        borderRadius: 25,
        marginLeft: moderateScale(5)
    },
    titleContainer: {
        flexDirection: 'column',
        marginLeft: moderateScale(8),
    },
    titleSong: {
        fontSize: moderateScale(20),
        fontWeight: '600',
        fontFamily: 'Pangolin-Regular'
    },
    titleArtist: {
        fontSize: moderateScale(10),
        paddingLeft: moderateScale(7),
        marginBottom: moderateScale(5),
    },
    controlContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        paddingRight: moderateScale(30)
    }
});

export default MiniPlayer
