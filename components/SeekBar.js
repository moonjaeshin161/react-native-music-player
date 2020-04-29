import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { scale, verticalScale } from 'react-native-size-matters';
import TrackPlayer from 'react-native-track-player';

import { minutesAndSeconds } from '../utils'

const SeekBar = ({ position, duration }) => {

    const elapsed = minutesAndSeconds(position);
    const remaining = minutesAndSeconds(duration - position);
    const [isSeek, setIsSeek] = useState(false);
    const [changedTime, setChangedTime] = useState(null);


    const handleSliding = (time) => {
        TrackPlayer.seekTo(time);
        TrackPlayer.play();
    };

    useState(() => {
        console.log('Is seek: ', isSeek);
    }, [isSeek])

    return (
        <View style={styles.container}>

            <View style={styles.itemDuration}>
                {
                    isSeek ? <Text>{changedTime[0] + ":" + changedTime[1]}</Text>
                        : <Text>{elapsed[0] + ":" + elapsed[1]}</Text>
                }

                <Text>{remaining[0] + ":" + remaining[1]}</Text>
            </View>

            <Slider
                style={styles.itemSlider}
                maximumValue={duration}
                value={position}
                onSlidingStart={() => TrackPlayer.pause()}
                onSlidingComplete={handleSliding}
                onValueChange={value => {
                    setIsSeek(true);
                    setChangedTime(minutesAndSeconds(value));
                }
                }
                onSlidingComplete={() => setIsSeek(false)}
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
