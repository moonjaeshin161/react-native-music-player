import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
//firebase
import auth from '@react-native-firebase/auth';

import * as RootNavigation from '../../navigations/RootNavigation';
import { loginSuccess, loginFail } from './AuthAction';
import { colors } from '../../configs/colors';

const LoginScreen = () => {

    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const changeHandler = (value, name) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const loginHandler = async () => {
        setIsLoading(true);
        console.log('Email password: ', inputs.email, inputs.password)
        auth()
            .signInWithEmailAndPassword(inputs.email, inputs.password)
            .then(() => {
                console.log('User account signed in!');
                dispatch(loginSuccess());
                setIsLoading(false);
                navigation.navigate('Setting');
                RootNavigation.navigate('Home');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                setIsLoading(false);
                dispatch(loginFail());
                console.error(error);
            });
    }

    return (
        <SafeAreaView>
            <Spinner
                visible={isLoading}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Đăng nhập</Text>
            </View>

            <View style={styles.content}>

                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={(value) => changeHandler(value, 'email')}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={(value) => changeHandler(value, 'password')}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text>Chưa có tài khoản ư ? Đăng ký ngay thôi</Text>
                </TouchableOpacity>
                <Button title='Đăng nhập' onPress={loginHandler} />

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        height: verticalScale(200),
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(35),
        fontWeight: '700'
    },
    content: {
        height: verticalScale(400),
        alignItems: 'center'
    },
    textInput: {
        width: '80%',
        height: verticalScale(40),
        borderColor: colors.gray,
        borderWidth: moderateScale(1),
        marginVertical: moderateScale(5)
    }
})

export default LoginScreen

