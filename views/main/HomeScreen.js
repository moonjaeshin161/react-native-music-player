import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useDispatch } from 'react-redux';
import { verifyReadPermission } from '../musicPlayer/PlayerActions';
import auth from '@react-native-firebase/auth';

import { loginSuccess } from '../auth/AuthAction';
import { setUser } from '../user/UserActions';

const HomeScreen = () => {

    const [result, setResult] = useState(null);
    const dispatch = useDispatch();
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        checkReadPermission();
        if (result === RESULTS.DENIED) {
            requestReadPermission();
        }
        dispatch(verifyReadPermission(result));
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [result]);

    function onAuthStateChanged(user) {
        if (user) {
            dispatch(setUser({ email: user.email, displayName: user.displayName, avatar: user.photoURL, uid: user.uid }));
            dispatch(loginSuccess());
        }
        if (initializing) setInitializing(false);
    }

    const checkReadPermission = async () => {
        let checkResult = await check(
            Platform.select({
                android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.MEDIA_LIBRARY
            })
        );
        await setResult(checkResult);
    }

    const requestReadPermission = async () => {
        let requestResult = await request(
            Platform.select({
                android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.MEDIA_LIBRARY
            })
        );
        await setResult(requestResult);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: moderateScale(20), alignItems: 'center' }}>
                <Text style={styles.title}>Bài tập lớn - App nghe nhạc</Text>
                <Text style={styles.subTitle}>Các thành viên trong nhóm</Text>
                <View style={styles.listContainer}>
                    <Text style={styles.member}>Nguyễn Công Huynh</Text>
                    <Text style={styles.member}>Vũ Đăng Huy</Text>
                    <Text style={styles.member}>Hoàng Thái Hà</Text>
                    <Text style={styles.member}>Doãn Đoàn Đại Hùng</Text>
                    <Text style={styles.member}>Kiều Thanh Phong</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: scale(23),
        fontWeight: '600',
        fontFamily: 'AlfaSlabOne-Regular'
    },
    subTitle: {
        fontSize: scale(22),
        fontWeight: '400',
        marginTop: scale(5),
        fontFamily: 'BalooBhaina2-ExtraBold',
    },
    listContainer: {
        marginTop: verticalScale(1)
    },
    member: {
        fontSize: scale(18),
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: scale(5),
        fontFamily: 'Jura',
    }
})

export default HomeScreen
