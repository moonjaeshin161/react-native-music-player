import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { STATE_PLAYING, STATE_PAUSED } from 'react-native-track-player';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Controller = (props) => {

    const { playerState,
        previousHandler,
        pauseHandler,
        playHandler,
        nextHandler,
        replayType,
        setReplayType,
        isRandom,
        setIsRandom
    } = props;

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
            {
                (replayType === 'no')
                    ? <MaterialCommunityIcons name='repeat-off' size={moderateScale(30)} onPress={() => setReplayType('all-songs')} />
                    : (replayType === 'all-songs')
                        ? < MaterialCommunityIcons name='repeat' size={moderateScale(30)} onPress={() => setReplayType('one-song')} />
                        : < MaterialCommunityIcons name='repeat-once' size={moderateScale(30)} onPress={() => setReplayType('no')} />

            }
            <AntDesign name='stepbackward' size={moderateScale(50)} onPress={previousHandler} />
            {
                isPlaying
                    ? <AntDesign name='pause' size={moderateScale(65)} onPress={pauseControl} />
                    : <AntDesign name='play' size={moderateScale(65)} onPress={playControl} />
            }
            <AntDesign name='stepforward' size={moderateScale(50)} onPress={nextHandler} />
            <FontAwesome name='random' size={moderateScale(25)} color={isRandom ? 'blue' : 'black'} onPress={() => setIsRandom(!isRandom)} />

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
