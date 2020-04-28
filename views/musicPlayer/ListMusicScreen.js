import React, { useEffect, useState } from 'react';
import { View, Text, Platform, StyleSheet, FlatList } from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import { useSelector, useDispatch } from 'react-redux';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Spinner from 'react-native-loading-spinner-overlay';
import { scale } from 'react-native-size-matters';

import { setSongList } from './PlayerActions';
import MusicItem from '../../components/MusicItem';
import { colors } from '../../configs/colors';

const ListMusicScreen = () => {

    const readPermission = useSelector(state => state.player.readPermission);
    const list = useSelector(state => state.player.list);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        checkPermission();
    }, []);

    const checkPermission = async () => {
        check(
            Platform.select({
                android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.MEDIA_LIBRARY
            })
        ).then(result => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log(
                        'This feature is not available (on this device / in this context)',
                    );
                    break;
                case RESULTS.DENIED:
                    requestPermission();
                    break;
                case RESULTS.GRANTED:
                    setIsLoading(true);
                    fetchMusic();
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    break;
            }
        }).catch((error) => {
            console.log('Check permission error: ', error)
        });
    }

    const requestPermission = async () => {
        request(
            Platform.select({
                android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.MEDIA_LIBRARY
            })
        ).then((result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log(
                        'This feature is not available (on this device / in this context)',
                    );
                    break;
                case RESULTS.DENIED:
                    console.log(
                        'The permission has not been requested / is denied but requestable',
                    );
                    break;
                case RESULTS.GRANTED:
                    fetchMusic();
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    break;
            }
        })
    }

    const fetchMusic = async () => {

        const options = {
            artist: true,
            duration: true,
            title: true,
            minimumSongDuration: 10000,
            genre: true,
            cover: true,
            fields: ['title', 'albumTitle', 'genre', 'lyrics', 'artwork', 'duration']
        }

        MusicFiles.getAll(options).then(tracks => {
            const musics = tracks.map((music, index) => {
                if (!music.title) {
                    let newTitle = (music.fileName.split('.')[0]).substring(0, 20);
                    music.title = newTitle;
                }
                music.title = music.title.substring(0, 20);
                return { ...music, id: index.toString(), url: music.path }
            })
            dispatch(setSongList(musics));

            setIsLoading(false);
        }).catch(errors => {
            console.log('Error when fetching music: ', errors);
            setIsLoading(false);
        })
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={isLoading}
                textStyle={styles.spinnerTextStyle}
            />
            {
                (list.length === 0)
                    ? <Text>Song Not Found</Text>
                    : <>
                        <Text style={styles.title}>Song List</Text>
                        <FlatList
                            style={styles.musicItem}
                            data={list}
                            renderItem={({ item }) => <MusicItem item={item} />}
                            keyExtractor={item => item.id}
                        />
                    </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    }
})

export default ListMusicScreen
