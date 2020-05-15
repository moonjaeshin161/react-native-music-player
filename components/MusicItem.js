import React, { useEffect, useState } from 'react';
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
    const musicRef = firestore().collection('Musics');

    const pressHandler = async () => {
        await dispatch(setCurrentSong(item));
    }

    const uploadHandler = async () => {
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
                            title: item.title,
                            downloadURL,
                            mid: item.id,
                            uid: user.uid
                        }
                        musicRef
                            .add(savedSong)
                            .then(() => {
                                showMessage({
                                    message: 'Upload success',
                                    type: "success",
                                });
                                setIsLoading(false);
                            })
                            .catch(err => {
                                showMessage({
                                    message: `Error occurs: ${err} `,
                                    type: "warning",
                                });
                            })
                    })
            }
        )
    }

    const uploadMusic = async () => {
        setIsLoading(true);
        musicRef
            .where('uid', '==', user.uid)
            .where('mid', '==', item.id)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.docs.length === 0) {
                    uploadHandler();
                }
                else {
                    showMessage({
                        message: 'Music has already upload',
                        type: "warning",
                    });
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log('Error when check exist: ', err)
            });

    }

    return (
        <TouchableOpacity style={styles.container} onPress={pressHandler}>

            <View style={styles.listItem}>
                <Image style={styles.miniThumb} source={MiniThumbnail} />
                <Text style={styles.title}>{item.title}</Text>
                {
                    isLogin &&
                    <View style={styles.uploadContainer}>
                        <AntDesign name='upload' size={moderateScale(27)} style={styles.uploadButton} color='#B6B7BF' onPress={uploadMusic} />
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
        fontWeight: '600',
        fontFamily: 'Pangolin-Regular'
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
