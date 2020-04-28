import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { scale, verticalScale } from 'react-native-size-matters';
import TrackPlayer from 'react-native-track-player';

import { minutesAndSeconds } from '../utils'

const SeekBar = () => {

    const { position, duration } = TrackPlayer.useTrackPlayerProgress();
    const elapsed = minutesAndSeconds(position);
    const remaining = minutesAndSeconds(duration - position);

    const handleSliding = (time) => {
        TrackPlayer.seekTo(time);
        TrackPlayer.play();
    };

    return (
        <View style={styles.container}>

            <View style={styles.itemDuration}>
                <Text>{elapsed[0] + ":" + elapsed[1]}</Text>
                <Text>{remaining[0] + ":" + remaining[1]}</Text>
            </View>

            <Slider
                style={styles.itemSlider}
                maximumValue={duration}
                value={position}
                onSlidingStart={() => TrackPlayer.pause()}
                onSlidingComplete={handleSliding}
                onValueChange={value => { }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    itemSlider: {
        width: scale(300),
        height: verticalScale(30)
    },
    itemDuration: {
        width: scale(550),
        flexDirection: 'row',
        justifyContent: 'space-around',

    }
});

export default SeekBar
