import React from 'react';
import { StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Controller from '../../components/Controller';
import CardMusic from '../../components/CardMusic';
import SeekBar from '../../components/SeekBar';

import { colors } from '../../configs/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlayerModal = (props) => {

    const { setIsVisible,
        playerState,
        previousHandler,
        pauseHandler,
        playHandler,
        nextHandler,
        currentSong,
        position,
        duration,
        replayType,
        setReplayType,
        isRandom,
        setIsRandom
    } = props;

    return (
        <SafeAreaView style={styles.container}>

            <AntDesign name='down' size={30} onPress={() => setIsVisible(false)} />
            <CardMusic currentSong={currentSong} />
            <Controller
                playerState={playerState}
                previousHandler={previousHandler}
                pauseHandler={pauseHandler}
                nextHandler={nextHandler}
                playHandler={playHandler}
                replayType={replayType}
                setReplayType={setReplayType}
                isRandom={isRandom}
                setIsRandom={setIsRandom}
            />
            <SeekBar position={position} duration={duration} />

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})

export default PlayerModal;
