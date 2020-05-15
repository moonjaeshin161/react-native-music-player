import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { colors } from '../configs/colors';
import I18n from '../i18n';

const Header = ({ setIsSearched, reloadHandler }) => {
    return (
        <View style={styles.container} >
            <View style={styles.titleBar}>
                <Text style={styles.title}>{I18n.t('musicPlayer')}</Text>
                <AntDesign name='search1' size={moderateScale(30)} style={styles.icon} onPress={() => setIsSearched(true)} />
            </View>
            <AntDesign name='reload1' size={moderateScale(25)} style={{ marginHorizontal: moderateScale(5) }} onPress={reloadHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleBar: {
        flex: 1,
        borderColor: colors.gray,
        borderWidth: moderateScale(2),
        borderRadius: moderateScale(10),
        margin: moderateScale(7),
        height: verticalScale(40),
        justifyContent: 'center'
    },
    title: {
        fontSize: moderateScale(20),
        marginHorizontal: moderateScale(10),
        fontWeight: '700'
    },
    icon: {
        position: 'absolute',
        right: moderateScale(10),

    }
})

export default Header
