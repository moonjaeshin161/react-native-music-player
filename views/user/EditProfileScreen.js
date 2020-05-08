import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { updateUser } from './UserActions';
import DefaultAvatar from '../../assets/images/default_avatar.png';

const EditProfileScreen = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [isEdited, setIsEdited] = useState(false);
    const [inputs, setInputs] = useState({ displayName: '' });
    const navigation = useNavigation();

    const changeHandler = (value, name) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const editHandler = async () => {
        const currentUser = auth().currentUser;
        currentUser.updateProfile({
            displayName: inputs.displayName
        }).then(() => {
            firestore()
                .collection('Users')
                .doc(currentUser.uid)
                .update({
                    displayName: inputs.displayName
                }).then(async () => {
                    await dispatch(updateUser({ displayName: inputs.displayName }));
                    navigation.goBack();
                }).catch(err => {
                    console.log('Error when saving name: ', err)
                })
        }).catch(err => {
            console.log('ERROR when updating name: ', err)
        })
        console.log('Editingggg');
    }

    return (
        <View style={styles.container}>
            {console.log('User: ', user)}

            <View style={{ marginTop: moderateScale(64), alignItems: 'center' }}>

                <Text>Edit Profile</Text>
                <TouchableOpacity style={[styles.avatarContainer, { marginTop: moderateScale(10) }]}>
                    <Image style={styles.avatar} source={DefaultAvatar} />
                </TouchableOpacity>

                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', width: scale(200) }}>
                        <Text>Tên hiển thị : </Text>
                        {
                            !isEdited
                                ? <>
                                    <Text>{user.displayName} </Text>
                                    <MaterialIcons name="edit" size={moderateScale(25)} onPress={() => setIsEdited(true)} />
                                </>
                                :
                                <>
                                    <TextInput
                                        onChangeText={(value) => changeHandler(value, 'displayName')}
                                        style={styles.textInput}
                                        value={inputs.displayName}
                                        placeholder={user.displayName}
                                    />
                                    <TouchableOpacity>
                                        <Text>OK</Text>
                                    </TouchableOpacity>
                                </>
                        }
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={editHandler}>
                        <Text>Xác nhận thay đổi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Hủy</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(30),
    },
    avatarContainer: {
        shadowColor: '#151734',
        shadowRadius: 15,
        shadowOpacity: 0.4,
    },
    avatar: {
        width: scale(136),
        height: scale(136),
        borderRadius: scale(68)
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
})

export default EditProfileScreen


