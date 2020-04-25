import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import Controller from '../../components/Controller';
import CardMusic from '../../components/CardMusic';

const PlayerScreen = () => {

    const list = useSelector(state => state.player.list);

    useEffect(() => {
        setupPlayer();
        fetchMusic();
    }, [])

    const setupPlayer = async () => {
        await TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            stopWithApp: false,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                TrackPlayer.CAPABILITY_STOP
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE
            ]
        });
    }

    const fetchMusic = async () => {
        await TrackPlayer.add(list);
    }

    return (
        <View>
            <CardMusic />
            <Controller />
        </View>
    )

}

export default PlayerScreen
