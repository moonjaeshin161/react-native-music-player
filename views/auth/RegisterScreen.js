import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
//firebase
import auth from '@react-native-firebase/auth';

import * as RootNavigation from '../../navigations/RootNavigation';

import { colors } from '../../configs/colors';
import { useDispatch } from 'react-redux';
import { registerSuccess, registerFail } from './AuthAction';

const RegisterScreen = () => {

    const [inputs, setInputs] = useState({ email: '', displayName: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const changeHandler = (value, name) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const registerHandler = async () => {
        setIsLoading(true);
        auth()
            .createUserWithEmailAndPassword(inputs.email, inputs.password)
            .then(async () => {
                const currentUser = await auth().currentUser;
                currentUser.updateProfile({
                    displayName: inputs.displayName
                }).then(() => {
                    setIsLoading(false);
                    dispatch(registerSuccess());
                    navigation.navigate('Setting');
                    RootNavigation.navigate('Home');
                })

            })
            .catch(error => {
                setIsLoading(false);
                dispatch(registerFail());
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
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
                <Text style={styles.headerTitle}>Đăng ký</Text>
            </View>

            <View style={styles.content}>

                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={(value) => changeHandler(value, 'email')}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Tên đăng nhập'
                    onChangeText={(value) => changeHandler(value, 'displayName')}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={(value) => changeHandler(value, 'password')}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text>Có tài khoản mà! Đăng nhập đi chờ chi</Text>
                </TouchableOpacity>
                <Button title='Đăng ký' onPress={registerHandler} />

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
    },
    spinnerTextStyle: {
        color: colors.white
    },
})

export default RegisterScreen

