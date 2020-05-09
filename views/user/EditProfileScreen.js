import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
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

                <Text>Edit Profile</Text>
                <TouchableOpacity style={[styles.avatarContainer, { marginTop: moderateScale(10) }]} onPress={pickImageHandler}>
                    <Image style={styles.avatar} source={imageURI} />
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
    }
})

export default EditProfileScreen


