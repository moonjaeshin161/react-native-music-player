import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import DefaultAvatar from '../../assets/images/default_avatar.png';

const ProfileScreen = () => {
    const user = useSelector(state => state.user.user);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={{ marginTop: moderateScale(64), alignItems: 'center' }}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={DefaultAvatar} />
                </View>
                <Text style={styles.displayName}>Lâu lắm mới thấy bạn đó {user.displayName ? user.displayName : 'User'}</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('Edit')}>
                    <Text style={{ color: 'white' }}>Edit Profile</Text>
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
        fontSize: moderateScale(16),
        fontWeight: '600'
    },
    optionContainer: {
        backgroundColor: 'blue',
        width: scale(100),
        height: verticalScale(200),
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default ProfileScreen;

