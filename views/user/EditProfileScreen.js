import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { updateUser } from './UserActions';
import DefaultAvatar from '../../assets/images/default_avatar.png';

const EditProfileScreen = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [isEdited, setIsEdited] = useState(false);
    const [inputs, setInputs] = useState({ displayName: user.displayName });
    const [imageURI, setImageURI] = useState(user.avatar ? { uri: user.avatar } : DefaultAvatar);
    const [isChanged, setIsChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const changeHandler = (value, name) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const editHandler = async () => {
        const currentUser = auth().currentUser;
        if (isChanged) {
            setIsLoading(true);

            const fileExtension = await imageURI.uri.split('.').pop();
            const fileName = `${currentUser.uid}.${fileExtension}`;

            const storageRef = storage().ref(`users/avatar/${fileName}`);

            storageRef.putFile(imageURI.uri)
                .on(
                    storage.TaskEvent.STATE_CHANGED,
                    snapshot => {
                        console.log('Snapshot: ', snapshot.state);

                        if (snapshot.state === storage.TaskState.SUCCESS) {
                            console.log('Success')
                        }
                    },
                    error => {
                        unsubscribe();
                        console.log('Image upload error: ', error.toString());
                    },
                    () => {
                        storageRef.getDownloadURL()
                            .then(downloadURL => {
                                console.log('File available at: ', downloadURL);
                                currentUser.updateProfile({
                                    displayName: inputs.displayName,
                                    photoURL: downloadURL
                                });
                                dispatch(updateUser({ displayName: inputs.displayName, avatar: downloadURL }));
                                firestore()
                                    .collection('Users')
                                    .doc(currentUser.uid)
                                    .update({
                                        avatar: downloadURL,
                                        displayName: inputs.displayName
                                    })
                            })
                            .then(() => {
                                setIsLoading(false);
                                navigation.goBack();
                            })
                    }
                );
        }
        else {
            setIsLoading(true);
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
                        setIsLoading(false);
                        navigation.goBack();
                    }).catch(err => {
                        console.log('Error when saving name: ', err);
                        setIsLoading(false);
                    })
            }).catch(err => {
                console.log('ERROR when updating name: ', err);
                setIsLoading(false);
            })
        }
    }

    const pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: 'Image upload', maxHeight: 300, maxWidth: 300 }
            , (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    setImageURI({ uri: response.uri });
                    setIsChanged(true);
                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                }
            });
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={isLoading}
            />
            {console.log('User: ', user)}

            <View style={{ marginTop: moderateScale(64), alignItems: 'center' }}>


                <Text style={{ fontSize: moderateScale(30), fontWeight: '600', fontFamily: 'BalooBhaina2-ExtraBold', color: '#3D425C' }}>Chỉnh sửa thông tin</Text>
                <TouchableOpacity style={[styles.avatarContainer, { marginTop: moderateScale(10) }]} onPress={pickImageHandler}>
                    <Image style={styles.avatar} source={imageURI} />
                </TouchableOpacity>

                <View style={[styles.section, { marginTop: moderateScale(25) }]}>
                    <View style={{ flexDirection: 'row', width: scale(200), alignItems: 'center', flex: 1 }}>
                        <Text style={[styles.editText, { fontWeight: '500' }]}>Tên hiển thị : </Text>
                        {
                            !isEdited
                                ? <>
                                    <View style={{ flex: 9, justifyContent: 'center' }}>
                                        <Text style={[styles.editText]}>{user.displayName} </Text>
                                    </View>
                                    <MaterialIcons name="edit" style={{ flex: 2 }} color='gray' size={moderateScale(25)} onPress={() => setIsEdited(true)} />
                                </>
                                :
                                <>
                                    <TextInput
                                        onChangeText={(value) => changeHandler(value, 'displayName')}
                                        style={styles.textInput}
                                        value={inputs.displayName}
                                        placeholder={user.displayName}
                                    />
                                    <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEdited(false)}>
                                        <Text style={{ fontSize: moderateScale(12), color: 'gray' }}>Huỷ</Text>
                                    </TouchableOpacity>
                                </>
                        }
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={editHandler} style={{ ...styles.optionButton, backgroundColor: '#1E90FF' }}>
                        <Text style={{ color: 'white' }}>Xác nhận thay đổi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ ...styles.optionButton, backgroundColor: '#FF7F50' }}>
                        <Text style={{ color: 'white' }}>Hủy</Text>
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
        width: scale(300),
        height: verticalScale(40),
        alignItems: 'center',
        marginTop: moderateScale(10),
        borderColor: '#B0C4DE'
    },
    textInput: {
        flex: 9,
        paddingLeft: moderateScale(10),
        fontSize: moderateScale(20)
    },
    editText: {
        fontSize: moderateScale(20),
        paddingLeft: moderateScale(10),
    },
    cancelButton: {
        flex: 2,
        borderWidth: moderateScale(1),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(5),
        borderRadius: moderateScale(5)
    },
    optionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(5),
        marginVertical: moderateScale(7),
        marginHorizontal: moderateScale(5),
        paddingHorizontal: moderateScale(5),
        paddingVertical: moderateScale(5),
        borderColor: '#E6E6FA'
    }

})

export default EditProfileScreen


