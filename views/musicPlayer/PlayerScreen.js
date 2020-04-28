import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import Controller from '../../components/Controller';
import CardMusic from '../../components/CardMusic';
import SeekBar from '../../components/SeekBar';

const PlayerScreen = () => {

    const currentSong = useSelector(state => state.player.currentSong);
    const navigation = useNavigation();

    useEffect(() => {
        setupPlayer();
        fetchMusic();
        TrackPlayer.play();
    }, [])

    const setupPlayer = async () => {
        await TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                TrackPlayer.CAPABILITY_STOP
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                TrackPlayer.CAPABILITY_STOP
            ]
        });
    }

    const fetchMusic = async () => {
        console.log('Current Song: ', currentSong);
        await TrackPlayer.add(currentSong);
    }

    const navigateMenuHandler = () => {
        navigation.navigate('MusicList');
    }

    return (
        <View>
            <AntDesign name='ellipsis1' size={moderateScale(50)} onPress={navigateMenuHandler} />
            <CardMusic />
            <Controller />
            <SeekBar />
        </View>
    )

}

export default PlayerScreen
