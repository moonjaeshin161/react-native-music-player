import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING, STATE_PAUSED } from 'react-native-track-player';

import MiniThumbnail from '../assets/images/default_mini_thumbnail.png';
import { setCurrentSong } from '../views/musicPlayer/PlayerActions';

const events = [
    TrackPlayerEvents.PLAYBACK_STATE,
    TrackPlayerEvents.PLAYBACK_ERROR,
    TrackPlayerEvents.REMOTE_PLAY,
    TrackPlayerEvents.REMOTE_PAUSE,
    TrackPlayerEvents.REMOTE_PREVIOUS,
    TrackPlayerEvents.REMOTE_NEXT,
    TrackPlayerEvents.REMOTE_STOP
];

const MiniPlayer = () => {

    const currentSong = useSelector(state => state.player.currentSong);
    const list = useSelector(state => state.player.list);
    const [playerState, setPlayerState] = useState(null);
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
            previousHandler();
        }
        if (event.type === TrackPlayerEvents.REMOTE_NEXT) {
            nextHandler();
        }
        if (event.type === TrackPlayerEvents.REMOTE_STOP) {
            TrackPlayer.destroy();
        }
    });

    useEffect(() => {
        if (currentSong.id) {
            TrackPlayer.reset();
            TrackPlayer.add(currentSong);
            TrackPlayer.play();
        }
        console.log('Rendering...');
    }, [currentSong.id])

    const playHandler = () => {
        if (currentSong.id) {
            TrackPlayer.add(currentSong);
            TrackPlayer.play();
        }
    }

    const pauseHandler = () => {
        TrackPlayer.pause();
    }

    const nextHandler = async () => {
        const nextTrackID = await (parseInt(currentSong.id) + 1).toString();
        await TrackPlayer.add(list[nextTrackID]);
        dispatch(setCurrentSong(list[nextTrackID]));
        TrackPlayer.skipToNext();
    }

    const previousHandler = async () => {
        const previousTrackID = await (parseInt(currentSong.id) - 1).toString();
        await TrackPlayer.add(list[previousTrackID]);
        dispatch(setCurrentSong(list[previousTrackID]));
        TrackPlayer.skipToNext();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={MiniThumbnail} style={styles.miniThumb} />
            <View style={styles.titleContainer}>
                <Text style={styles.titleSong}>{title ? title : 'Song Name'}</Text>
                <Text style={styles.titleArtist}>{artist ? artist : 'Unknown'}</Text>
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
        </SafeAreaView>
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
        justifyContent: 'center'
    },
    titleSong: {
        fontSize: moderateScale(18),
        fontWeight: '600'
    },
    titleArtist: {
        fontSize: moderateScale(10),
        paddingLeft: moderateScale(7)
    },
    controlContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        paddingRight: moderateScale(30)
    }
});

export default MiniPlayer
