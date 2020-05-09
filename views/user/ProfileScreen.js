import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import DefaultAvatar from '../../assets/images/default_avatar.png';

const ProfileScreen = () => {
    const user = useSelector(state => state.user.user);
    const navigation = useNavigation();
    const [imageURI, setImageURI] = useState(user.avatar ? { uri: user.avatar } : DefaultAvatar);

    return (
        <View style={styles.container}>

            <View style={{ marginTop: moderateScale(64), alignItems: 'center' }}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={imageURI} />
                </View>
                <Text style={styles.displayName}>Lâu lắm mới thấy bạn đó, {user.displayName ? user.displayName : 'User'} à</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('Edit')}>
                    <Text style={styles.optionText}>Chỉnh sửa thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('Edit')}>
                    <Text style={styles.optionText}>Nhạc của tui</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    displayName: {
        marginTop: moderateScale(24),
        fontSize: moderateScale(20),
        fontWeight: '600',
        fontFamily: 'BalooBhaina2-ExtraBold',
        color: '#3D425C'
    },
    optionContainer: {
        marginTop: moderateScale(15),
        backgroundColor: '#1E90FF',
        width: scale(150),
        height: scale(150),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#E6E6FA',
        borderRadius: moderateScale(8)
    },
    optionText: {
        textAlign: "center",
        fontSize: moderateScale(15),
        color: 'white',
        fontWeight: 'bold',
    }
})

export default ProfileScreen;

