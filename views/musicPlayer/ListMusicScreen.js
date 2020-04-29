import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { scale, moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-community/async-storage';

import MusicItem from '../../components/MusicItem';
import MiniPlayer from '../../components/MiniPlayer';
import {
    setSongList
} from './PlayerActions';
import { colors } from '../../configs/colors';
import { setupPlayer } from '../../utils';

const ListMusicScreen = () => {

    const [list, setList] = useState([]);
    const [loadList, setLoadList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const readPermission = useSelector(state => state.player.readPermission);

    const dispatch = useDispatch();

    useEffect(() => {
        if (readPermission) {
            setupPlayer();
            loadLocalMusic();
        }
    }, [loadList])

    const fetchMusic = async () => {
        setIsLoading(true);
        const options = {
            artist: true,
            duration: true,
            title: true,
            minimumSongDuration: 10000,
            genre: true,
            cover: true,
            fields: ['title', 'albumTitle', 'genre', 'lyrics', 'artwork', 'duration']
        }

        MusicFiles.getAll(options).then(async (tracks) => {
            const musics = tracks.map((music, index) => {
                if (!music.title) {
                    let newTitle = (music.fileName.split('.')[0]).substring(0, 20);
                    music.title = newTitle;
                }
                music.title = music.title.substring(0, 20);
                return { ...music, id: index.toString(), url: music.path, artist: music.author }
            })
            dispatch(setSongList(musics));
            setList(musics);
            setLoadList(true);
            await AsyncStorage.setItem('list', JSON.stringify(musics));
            setIsLoading(false);
        }).catch(errors => {
            console.log('Error when fetching music: ', errors);
            setIsLoading(false);
        })
    }

    const loadLocalMusic = async () => {
        const data = await AsyncStorage.getItem('list');
        await setList(JSON.parse(data));
        if (!data) {
            fetchMusic();
        }
        setLoadList(true);
        dispatch(setSongList(JSON.parse(data)));
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={isLoading}
                textStyle={styles.spinnerTextStyle}
            />
            <Text style={styles.title}>Song List</Text>
            <FlatList
                style={styles.musicItem}
                data={list}
                renderItem={({ item }) => <MusicItem item={item} />}
                keyExtractor={item => item.id}
            />
            <MiniPlayer style={styles.miniPlayer} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    title: {
        fontSize: scale(20),
        fontWeight: '700'
    },
    spinnerTextStyle: {
        color: colors.white
    },
    musicItem: {
        width: '100%',
    },
    miniPlayer: {
        position: 'absolute',
        bottom: 0,
        borderRadius: moderateScale(10),
        borderColor: 'black'
    }
})

export default ListMusicScreen
