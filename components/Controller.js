import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale } from 'react-native-size-matters';

import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING, STATE_PAUSED } from 'react-native-track-player';

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

const Controller = () => {

    const [playerState, setPlayerState] = useState(null);
    const currentSong = useSelector(state => state.player.currentSong);
    const list = useSelector(state => state.player.list);

    const dispatch = useDispatch();

    TrackPlayer.useTrackPlayerEvents(events, async (event) => {
        console.log('EVENT TYPE: ', event.type);
        if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
            console.warn('An error occurred while playing the current track.');
        }
        if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
            await setPlayerState(event.state);
            if (event.state !== STATE_PAUSED) {
                let trackId = await TrackPlayer.getCurrentTrack();
                let trackObject = await TrackPlayer.getTrack(trackId);
                dispatch(setCurrentSong(trackObject));
            }
        }
        if (event.type === TrackPlayerEvents.REMOTE_PLAY) {
            TrackPlayer.play();
        }
        if (event.type === TrackPlayerEvents.REMOTE_PAUSE) {
            TrackPlayer.pause();
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

    const playHandler = async () => {
        TrackPlayer.play();
    }

    const pauseHandler = async () => {
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
        <View style={styles.container}>
            {console.log('TrackPlayerEvent', TrackPlayerEvents)}
            <AntDesign name='stepbackward' size={moderateScale(50)} onPress={previousHandler} />
            {
                (playerState === STATE_PLAYING)
                    ? <AntDesign name='pausecircle' size={moderateScale(50)} onPress={pauseHandler} />
                    : <AntDesign name='play' size={moderateScale(50)} onPress={playHandler} />
            }
            <AntDesign name='stepforward' size={moderateScale(50)} onPress={nextHandler} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'center'
    }
});

export default Controller
