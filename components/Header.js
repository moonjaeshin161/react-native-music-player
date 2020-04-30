import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { colors } from '../configs/colors';

const Header = ({ setIsSearched }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.title}>Music Player</Text>
            <AntDesign name='search1' size={moderateScale(30)} style={styles.icon} onPress={() => setIsSearched(true)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: colors.gray,
        borderWidth: moderateScale(2),
        borderRadius: moderateScale(10),
        margin: 5,
        height: verticalScale(40),
        alignItems: 'center'
    },
    title: {
        fontSize: moderateScale(20),
        marginHorizontal: moderateScale(18),
        fontWeight: '700'
    },
    icon: {
        position: 'absolute',
        right: moderateScale(10),

    }
})

export default Header
