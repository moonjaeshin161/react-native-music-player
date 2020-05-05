import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useDispatch } from 'react-redux';
import { verifyPermission } from '../musicPlayer/PlayerActions';

const HomeScreen = () => {

    const [result, setResult] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        checkPermission();
        if (result === RESULTS.DENIED) {
            requestPermission();
        }
        dispatch(verifyPermission(result));
    }, [result]);

    const checkPermission = async () => {
        let checkResult = await check(
            Platform.select({
                android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.MEDIA_LIBRARY
            })
        );
        await setResult(checkResult);
    }

    const requestPermission = async () => {
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
            <Text style={styles.title}>Bài tập lớn - App nghe nhạc</Text>
            <Text style={styles.subTitle}>Các thành viên trong nhóm</Text>
            <View style={styles.listContainer}>
                <Text style={styles.member}>Nguyễn Công Huynh</Text>
                <Text style={styles.member}>Vũ Đăng Huy</Text>
                <Text style={styles.member}>Hoàng Thái Hà</Text>
                <Text style={styles.member}>Doãn Đoàn Đại Hùng</Text>
                <Text style={styles.member}>Kiều Thanh Phong</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: scale(27),
        fontWeight: '600',
        fontFamily: 'BalooBhaina2-ExtraBold',
    },
    subTitle: {
        fontSize: scale(22),
        fontWeight: '400',
        marginTop: scale(5)
    },
    listContainer: {
        paddingTop: verticalScale(10)
    },
    member: {
        fontSize: scale(13),
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: scale(5)
    }
})

export default HomeScreen
