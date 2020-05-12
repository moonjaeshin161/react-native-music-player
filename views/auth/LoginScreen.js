import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from "react-native-flash-message";
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
                    showMessage({
                        message: 'That email address is already in use!',
                        type: "warning",
                    });
                }

                if (error.code === 'auth/invalid-email') {
                    showMessage({
                        message: 'That email address is invalid!',
                        type: "warning",
                    });

                }
                setIsLoading(false);
                dispatch(loginFail());
                showMessage({
                    message: `Error occurs: ${error} `,
                    type: "warning",
                });
            });
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={isLoading}
                textStyle={styles.spinnerTextStyle}
            />
            <Text style={styles.title}>Đăng nhập</Text>
            <Text style={styles.subTitle}>Đăng nhập bằng email và mật khẩu</Text>
            <View style={styles.content}>
                <View style={styles.section}>
                    <MaterialIcons name="email" size={moderateScale(30)} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Email'
                        onChangeText={(value) => changeHandler(value, 'email')}
                    />
                </View>
                <View style={styles.section}>
                    <MaterialIcons name="lock-outline" size={moderateScale(30)} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        secureTextEntry
                        onChangeText={(value) => changeHandler(value, 'password')}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.smallTitle}>Chưa có tài khoản ư ? Đăng ký ngay thôi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.login} onPress={loginHandler}>
                    <Text style={styles.loginButton}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        paddingHorizontal: moderateScale(30),
        paddingVertical: moderateScale(100)
    },
    spinnerTextStyle: {
        color: colors.white
    },
    title: {
        fontSize: moderateScale(35),
        fontWeight: 'bold',
        color: colors.blue
    },
    subTitle: {
        color: 'gray'
    },
    section: {
        flexDirection: 'row',
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(5),
        paddingHorizontal: moderateScale(15),
        paddingVertical: moderateScale(10),
        alignItems: 'center',
        marginTop: moderateScale(10)
    },
    textInput: {
        flex: 1,
        paddingLeft: moderateScale(10)
    },
    smallTitle: {
        textAlign: 'right',
        marginTop: moderateScale(10),
        color: colors.blue
    },
    login: {
        width: '100%',
        height: verticalScale(40),
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(10),
        borderRadius: 50
    },
    loginButton: {
        color: colors.white,
        fontSize: moderateScale(15),
        fontWeight: 'bold'
    }
})

export default LoginScreen

