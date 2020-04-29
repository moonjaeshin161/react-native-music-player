import React from 'react';
import { View, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlayer from 'react-native-track-player';

import Controller from '../../components/Controller';
import CardMusic from '../../components/CardMusic';
import SeekBar from '../../components/SeekBar';

import { colors } from '../../configs/colors';

const PlayerModal = ({ setIsVisible, playerState, previousHandler, pauseHandler, playHandler, nextHandler, currentSong, position, duration }) => {

    return (
        <View style={styles.container}>

            <AntDesign name='down' size={30} onPress={() => setIsVisible(false)} />
            <CardMusic currentSong={currentSong} />
            <Controller
                playerState={playerState}
                previousHandler={previousHandler}
                pauseHandler={pauseHandler}
                nextHandler={nextHandler}
                playHandler={playHandler}
            />
            <SeekBar position={position} duration={duration} />

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})

export default PlayerModal;
