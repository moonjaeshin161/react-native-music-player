import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob';
import { showMessage } from "react-native-flash-message";
//firebase
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import { colors } from '../configs/colors';
import { setCurrentSong } from '../views/musicPlayer/PlayerActions';
import MiniThumbnail from '../assets/images/default_mini_thumbnail.png';

const MusicItem = ({ item, savedScreen, setIsLoading }) => {

    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isLogin);
    const user = useSelector(state => state.user.user);

    const pressHandler = async () => {
        await dispatch(setCurrentSong(item));
    }

    const uploadHandler = async () => {
        setIsLoading(true);
        const fileExtension = await item.url.split('.').pop();
        const fileName = await `${item.title}.${fileExtension}`;

        const storageRef = storage().ref(`musics/${user.uid}/${fileName}`);
        const task = storageRef.putFile(item.url);

        task.on(
            'state_changed',
            snapshot => {
                console.log('Snapshot: ', snapshot.state);

                if (snapshot.state === storage.TaskState.SUCCESS) {
                    console.log('Success');
                }
            },
            error => {
                unsubscribe();
                console.log('Music upload error: ', error.toString());
            },
            () => {
                storageRef.getDownloadURL()
                    .then(downloadURL => {
                        console.log('File available at: ', downloadURL);
                        const savedSong = {
                            [item.id]: {
                                title: item.title,
                                downloadURL,
                                id: item.id
                            }
                        }
                        firestore()
                            .collection('Musics')
                            .doc(user.uid)
                            .update(savedSong)
                            .then(() => {
                                showMessage({
                                    message: 'Upload success',
                                    type: "success",
                                });
                                setIsLoading(false);
                            })
                            .catch(err => {
                                if (err.code = 'firestore/not-found') {
                                    firestore()
                                        .collection('Musics')
                                        .doc(user.uid)
                                        .set(savedSong)
                                        .then(() => {
                                            showMessage({
                                                message: 'Upload success',
                                                type: "success",
                                            });
                                            setIsLoading(false);
                                        })
                                }
                                showMessage({
                                    message: `Error occurs: ${error} `,
                                    type: "warning",
                                });
                            })
                    })
            }
        )
    }

    const downloadHandler = async () => {
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob
            .config({
                fileCache: true,
                path: dirs.DownloadDir + `/${item.title}.mp3`
                // response data will be saved to this path if it has access right.

            })
            .fetch('GET', item.downloadURL, {
                //some headers ..
            })
            .then((res) => {
                showMessage({
                    message: 'Download success',
                    type: "success",
                });
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
            })
            .catch(err => {
                showMessage({
                    message: 'Error occurs: ', err,
                    type: "warning",
                });
            })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={pressHandler}>

            <View style={styles.listItem}>
                <Image style={styles.miniThumb} source={MiniThumbnail} />
                <Text style={styles.title}>{item.title}</Text>
                {
                    isLogin &&
                    <View style={styles.uploadContainer}>
                        {
                            savedScreen
                                ? <AntDesign name='clouddownloado' size={moderateScale(27)} style={styles.uploadButton} color='#B6B7BF' onPress={downloadHandler} />
                                : <AntDesign name='upload' size={moderateScale(27)} style={styles.uploadButton} color='#B6B7BF' onPress={uploadHandler} />
                        }

                    </View>
                }
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: colors.gray,
        borderBottomWidth: scale(0.1),
        marginVertical: verticalScale(2),
    },
    listItem: {
        paddingLeft: moderateScale(5),
        flexDirection: 'row',
        alignItems: 'center'
    },
    miniThumb: {
        width: scale(50),
        height: verticalScale(50)
    },
    title: {
        fontSize: verticalScale(20),
        paddingLeft: scale(5),
        fontWeight: '200'
    },
    uploadContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    uploadButton: {
        marginRight: moderateScale(5)
    },
});

export default MusicItem
