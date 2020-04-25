import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale } from 'react-native-size-matters';

import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';
import { useTrackPlayerEvents } from 'react-native-track-player/index';

const events = [
    TrackPlayerEvents.PLAYBACK_STATE,
    TrackPlayerEvents.PLAYBACK_ERROR,

];

const Controller = () => {

    const [playerState, setState] = useState(null);

    useTrackPlayerEvents(events, (event) => {
        if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
            console.warn('An error occurred while playing the current track.');
        }
        if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
            setState(event.state)
        }
    });

    const playHandler = () => {
        TrackPlayer.play();
    }

    const pauseHandler = () => {
        TrackPlayer.pause();
    }

    const nextHandler = () => {
        TrackPlayer.skipToNext();
    }

    const previousHandler = () => {
        TrackPlayer.skipToPrevious();
    }

    return (
        <View style={styles.container}>
            {console.log(TrackPlayerEvents)}
            <AntDesign name='stepbackward' size={moderateScale(50)} onPress={previousHandler} />
            {
                (playerState === 'playing')
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
