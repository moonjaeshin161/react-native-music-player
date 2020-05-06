import React from 'react'
import { View, Text, ImageBackground, StyleSheet, Button } from 'react-native'
import SettingBackground from '../../assets/images/setting_background.png';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as RootNavigation from '../../navigations/RootNavigation';
//firebase
import auth from '@react-native-firebase/auth';

import { signOutSuccess } from '../auth/AuthAction';

const SettingScreen = () => {

    const isLogin = useSelector(state => state.auth.isLogin);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const signoutHandler = async () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                dispatch(signOutSuccess());
                RootNavigation.navigate('Home');
            });
    }


    return (
        <View>
            {console.log('Is login:', isLogin)}
            <ImageBackground resizeMode="cover" style={styles.background} source={SettingBackground} />

            <View style={styles.content}>
                <Text style={styles.title}>Xin chào đến với app nghenhacretien </Text>
                {
                    isLogin ? <Button title="Đăng xuất" onPress={() => signoutHandler()} />
                        : <>
                            <Text>Đăng nhập ngay để sử dụng đầy đủ tính năng nhất</Text>
                            <Button title='Đăng nhập' onPress={() => navigation.navigate('Login')} />
                        </>
                }


            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: verticalScale(200)
    },
    content: {
        alignItems: 'center'
    },
    title: {
        fontFamily: 'BalooBhaina2-ExtraBold',
        fontSize: moderateScale(20)
    }
});

export default SettingScreen
