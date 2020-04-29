import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale } from 'react-native-size-matters';
import { STATE_PLAYING, STATE_PAUSED } from 'react-native-track-player';

const Controller = ({ playerState, previousHandler, pauseHandler, playHandler, nextHandler }) => {

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (playerState === STATE_PLAYING) {
            setIsPlaying(true);
        }
        if (playerState === STATE_PAUSED) {
            setIsPlaying(false)
        }
    }, [playerState])

    const playControl = () => {
        playHandler();
    }

    const pauseControl = () => {
        pauseHandler();
    }

    return (
        <View style={styles.container}>
            <AntDesign name='stepbackward' size={moderateScale(50)} onPress={previousHandler} />
            {
                isPlaying
                    ? <AntDesign name='pause' size={moderateScale(65)} onPress={pauseControl} />
                    : <AntDesign name='play' size={moderateScale(65)} onPress={playControl} />
            }
            <AntDesign name='stepforward' size={moderateScale(50)} onPress={nextHandler} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(10)
    }
});

export default Controller
