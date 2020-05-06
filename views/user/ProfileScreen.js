import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux'

import DefaultAvatar from '../../assets/images/default_avatar.png'

const ProfileScreen = () => {
    const user = useSelector(state => state.user.user);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: moderateScale(64), alignItems: 'center' }}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={DefaultAvatar} />
                </View>
                <Text style={styles.displayName}>{user.displayName ? user.displayName : 'User'}</Text>
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
        height: verticalScale(136),
        borderRadius: 68
    },
    displayName: {
        marginTop: moderateScale(24),
        fontSize: moderateScale(16),
        fontWeight: '600'
    }
})

export default ProfileScreen;

