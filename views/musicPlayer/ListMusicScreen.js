import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { scale, moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";

import MusicItem from '../../components/MusicItem';
import MiniPlayer from '../../components/MiniPlayer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

import { colors } from '../../configs/colors';
import { setupPlayer } from '../../utils';

const ListMusicScreen = () => {

    const [list, setList] = useState([]);
    const [sortedList, setSortedList] = useState([]);
    const [loadList, setLoadList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const readPermission = useSelector(state => state.player.readPermission);
    const [isSearched, setIsSearched] = useState(false);

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
            if (tracks !== 'Something get wrong with musicCursor') {
                if (tracks.length !== 0) {
                    const musics = await tracks.map((music, index) => {
                        if (!music.title) {
                            let newTitle = (music.fileName.split('.')[0]).substring(0, 20);
                            music.title = newTitle;
                        }
                        music.title = music.title.substring(0, 20);
                        return { ...music, id: index.toString(), url: music.path, artist: music.author }
                    })
                    setList(musics);
                    setSortedList(musics);
                    setLoadList(true);
                    await AsyncStorage.setItem('list', JSON.stringify(musics));
                    setIsLoading(false);
                }
            }
            else {
                setList([]);
                showMessage({
                    message: "There is no music file in your device",
                    type: "warning",
                });
                setIsLoading(false);
            }
        }).catch(errors => {
            showMessage({
                message: `Error occurs when fetching music: ${errors} `,
                type: "warning",
            });
            setIsLoading(false);
        })
    }

    const loadLocalMusic = async () => {
        const data = await AsyncStorage.getItem('list');
        setList(JSON.parse(data));
        setSortedList(JSON.parse(data));
        if (!data) {
            fetchMusic();
        }
        setLoadList(true);
    }

    const reloadHandler = () => {
        AsyncStorage.removeItem('list');
        fetchMusic();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={isLoading}
                textStyle={styles.spinnerTextStyle}
            />
            {
                !isSearched ? <Header setIsSearched={setIsSearched} reloadHandler={reloadHandler} />
                    : <SearchBar setSortedList={setSortedList} list={list} setIsSearched={setIsSearched} />
            }
            <FlatList
                style={styles.musicItem}
                data={sortedList}
                renderItem={({ item }) => <MusicItem item={item} setIsLoading={setIsLoading} />}
                keyExtractor={item => item.id}
            />
            <MiniPlayer style={styles.miniPlayer} list={list} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
