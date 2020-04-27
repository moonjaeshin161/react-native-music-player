import React, { useEffect } from 'react';
import { View, Text, Platform, StyleSheet, FlatList } from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import { useSelector, useDispatch } from 'react-redux';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { setSongList } from './PlayerActions';
import MusicItem from '../../components/MusicItem';

const ListMusicScreen = () => {

    const readPermission = useSelector(state => state.player.readPermission);
    const list = useSelector(state => state.player.list)

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
                return { ...music, id: index.toString(), url: music.path }
            })
            dispatch(setSongList(musics));
        }).catch(errors => {
            console.log('Error when fetching music: ', errors);
        })
    }

    return (
        <View style={styles.container}>
            {
                (list.length === 0)
                    ? <Text>Song Not Found</Text>
                    : <>
                        <Text>Song List</Text>
                        <FlatList
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
        flex: 1
    }
})

export default ListMusicScreen
