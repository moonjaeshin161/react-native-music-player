import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Platform, Text, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { moderateScale } from 'react-native-size-matters';
import Spinner from 'react-native-loading-spinner-overlay';
//firebase
import firestore from '@react-native-firebase/firestore';

import I18n from '../../i18n';
import SavedMusicItem from '../../components/SavedMusicItem'

const SavedMusicScreen = () => {

    const [result, setResult] = useState(null);
    const [savedMusics, setSavedMusics] = useState([]);
    const user = useSelector(state => state.user.user);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkWritePermission();
        if (result === RESULTS.DENIED) {
            requestWritePermission();
        }
    }, [result]);

    useEffect(() => {
        loadOnlineMusics();
    }, [])

    const checkWritePermission = async () => {
        let checkResult = await check(
            Platform.select({
                android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.MEDIA_LIBRARY
            })
        );
        await setResult(checkResult);
    }

    const loadOnlineMusics = async () => {
        const musicsRef = firestore().collection('Musics');
        const subcriber = musicsRef
            .where('uid', '==', user.uid)
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        setSavedMusics(preMusics => [
                            ...preMusics,
                            change.doc.data()
                        ])
                    }
                })

            })

        return () => subcriber();
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

    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={isLoading}
                textStyle={styles.spinnerTextStyle}
            />
            <Text style={styles.title}>{I18n.t('savedMusics')}</Text>
            <FlatList
                data={savedMusics}
                keyExtractor={item => item.mid}
                renderItem={({ item }) => <SavedMusicItem item={item} setIsLoading={setIsLoading} />}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: moderateScale(30),
        fontFamily: 'BalooBhaina2-ExtraBold',
        textAlign: 'center',
        color: '#3D425C'
    }
})

export default SavedMusicScreen;

