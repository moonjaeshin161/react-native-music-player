import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
//firebase
import firestore from '@react-native-firebase/firestore';
import { } from 'react-native-gesture-handler';
import MusicItem from '../../components/MusicItem';

const SavedMusicScreen = () => {

    const [result, setResult] = useState(null);
    const [savedMusics, setSavedMusics] = useState([]);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        checkWritePermission();
        console.log('Write per: ', result);
        if (result === RESULTS.DENIED) {
            requestWritePermission();
        }
        const subscriber = firestore()
            .collection('Musics')
            .doc(user.uid)
            .onSnapshot({
                includeMetadataChanges: true
            }, (doc) => {
                const data = doc.data();
                setSavedMusics(convertObjToArr(data));
            });
        return () => subscriber();
    }, [result]);

    const checkWritePermission = async () => {
        let checkResult = await check(
            Platform.select({
                android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.MEDIA_LIBRARY
            })
        );
        await setResult(checkResult);
    }

    const requestWritePermission = async () => {
        let requestResult = await request(
            Platform.select({
                android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.MEDIA_LIBRARY
            })
        );
        await setResult(requestResult);
    }



    const convertObjToArr = (object) => {
        const listKey = Object.keys(object);
        const newList = [];
        for (let i = 0; i < listKey.length; i++) {
            newList.push(object[i]);
        }
        return newList;
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={savedMusics}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <MusicItem item={item} savedScreen='true' />}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default SavedMusicScreen;

