import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import SettingBackground from '../../assets/images/setting_background.png';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as RootNavigation from '../../navigations/RootNavigation';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
//firebase
import auth from '@react-native-firebase/auth';

import { signOutSuccess } from '../auth/AuthAction';
import LanguageSelection from '../../components/LanguageSelection';

const SettingScreen = () => {

    const isLogin = useSelector(state => state.auth.isLogin);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [language, setLanguage] = useState('vi');

    const signoutHandler = async () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                dispatch(signOutSuccess());
                RootNavigation.navigate('Home');
            });
    }

    const selectHandler = () => {
        setIsModalVisible(true);
    }

    const confirmHandler = async () => {
        try {
            await AsyncStorage.setItem('language', language)
        } catch (e) {
            console.log('Error when saving to async storage: ', e)
        }
    }

    return (
        <View style={styles.container}>

            <Modal isVisible={isModalVisible} style={styles.modal}>
                <LanguageSelection
                    setLanguage={setLanguage}
                    language={language}
                    setIsModalVisible={setIsModalVisible}
                    confirmHandler={confirmHandler} />
            </Modal>
            <ImageBackground resizeMode="cover" style={styles.background} source={SettingBackground} />
            <View style={styles.content}>

                <Text style={styles.title}>Xin chào đến với app nghenhacretien </Text>
                {!isLogin && <Text style={{ color: '#8E97A6', fontSize: moderateScale(13), fontWeight: '500' }}>Đăng nhập ngay để sử dụng đầy đủ tính năng nhất</Text>}
                <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('About')}>
                    <Text style={styles.optionText}>Về chúng tôi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={selectHandler}>
                    <Text style={styles.optionText}>Ngôn ngữ</Text>
                </TouchableOpacity>
                {
                    isLogin
                        ? <TouchableOpacity style={styles.optionButton} onPress={signoutHandler}>
                            <Text style={styles.optionText}>Đăng xuất</Text>
                        </TouchableOpacity>
                        : <>
                            <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.optionText}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </>
                }
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: verticalScale(200)
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'BalooBhaina2-ExtraBold',
        fontSize: moderateScale(20),
        color: '#3D425C'
    },
    optionButton: {
        marginTop: moderateScale(15),
        marginBottom: moderateScale(5),
        backgroundColor: '#1E90FF',
        width: scale(120),
        height: scale(45),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#E6E6FA',
        borderRadius: moderateScale(8)
    },
    optionText: {
        fontSize: moderateScale(15),
        color: '#F5FFFA',
        fontFamily: 'AlfaSlabOne-Regular'
    },
    modal: {
        height: verticalScale(225),
        width: scale(250),
        backgroundColor: 'white',
        flex: 0,
        top: '30%',
        left: '10%',
    }
});

export default SettingScreen
