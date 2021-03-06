import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob';
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';

import { colors } from '../configs/colors';
import { setCurrentSong } from '../views/musicPlayer/PlayerActions';
import MiniThumbnail from '../assets/images/default_mini_thumbnail.png';

const SavedMusicItem = ({ item, setIsLoading }) => {

    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isLogin);

    const pressHandler = async () => {
        await dispatch(setCurrentSong(item));
    }

    const downloadHandler = async () => {

        setIsLoading(true);
        let path = RNFetchBlob.fs.dirs.DownloadDir;
        RNFetchBlob
            .config({
                fileCache: true,
                mediaScannable: true,
                path: `${path}/${item.title}.mp3`
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
                setIsLoading(false);
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path());
            })
            .catch(err => {
                showMessage({
                    message: 'Error occurs: ', err,
                    type: "warning",
                });
                setIsLoading(false);
            })
    }

    const downloadMusic = async () => {
        let data = await AsyncStorage.getItem('list');
        if (data !== null) {
            let index = await JSON.parse(data).findIndex(music => music.title === item.title);
            if (index !== -1) {
                showMessage({
                    message: 'Musics already in your storage',
                    type: "warning",
                });
            }
            else {
                downloadHandler();
            }
        }
        else {
            downloadHandler();
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={pressHandler}>

            <View style={styles.listItem}>
                <Image style={styles.miniThumb} source={MiniThumbnail} />
                <Text style={styles.title}>{item.title}</Text>
                {
                    isLogin &&
                    <View style={styles.uploadContainer}>

                        <AntDesign name='clouddownloado' size={moderateScale(27)} style={styles.uploadButton} color='#B6B7BF' onPress={downloadMusic} />

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

export default SavedMusicItem
