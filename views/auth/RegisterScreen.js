import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { showMessage } from 'react-native-flash-message';
//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import * as RootNavigation from '../../navigations/RootNavigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../configs/colors';
import { registerSuccess, registerFail } from './AuthAction';
import I18n from '../../i18n';

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
                    firestore()
                        .collection('Users')
                        .doc(currentUser.uid)
                        .set({
                            email: inputs.email,
                            displayName: inputs.displayName,
                            uid: currentUser.uid
                        })
                }).then(() => {
                    setIsLoading(false);
                    dispatch(registerSuccess());
                    navigation.navigate('Setting');
                    RootNavigation.navigate(I18n.t('home'));
                })

            })
            .catch(error => {
                setIsLoading(false);
                dispatch(registerFail());
                if (error.code === 'auth/email-already-in-use') {
                    showMessage({
                        message: 'Email này đã được sử dụng!',
                        type: "warning",
                    });
                }

                if (error.code === 'auth/invalid-email') {
                    showMessage({
                        message: 'Email không hợp lệ',
                        type: "warning",
                    });
                }

            });
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={isLoading}
                textStyle={styles.spinnerTextStyle}
            />
            <Text style={styles.title}>{I18n.t('register')}</Text>
            <Text style={styles.subTitle}>{I18n.t('registerWith')}</Text>
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
                    <MaterialIcons name="account-circle" size={moderateScale(30)} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={I18n.t('displayName')}
                        onChangeText={(value) => changeHandler(value, 'displayName')}
                    />
                </View>
                <View style={styles.section}>
                    <MaterialIcons name="lock-outline" size={moderateScale(30)} />
                    <TextInput
                        style={styles.textInput}
                        placeholder={I18n.t('password')}
                        secureTextEntry
                        onChangeText={(value) => changeHandler(value, 'password')}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.smallTitle}>{I18n.t('loginForNow')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.register} onPress={registerHandler}>
                    <Text style={styles.registerButton}>{I18n.t('register')}</Text>
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
    register: {
        width: '100%',
        height: verticalScale(40),
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(10),
        borderRadius: 50
    },
    registerButton: {
        color: colors.white,
        fontSize: moderateScale(15),
        fontWeight: 'bold'
    }
})

export default RegisterScreen

