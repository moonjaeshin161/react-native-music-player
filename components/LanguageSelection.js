import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';

import AntDesign from 'react-native-vector-icons/AntDesign';

const LanguageSelection = ({ language, setLanguage, setIsModalVisible, confirmHandler }) => {

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Lựa chọn ngôn ngữ</Text>
            </View>

            <View style={styles.selectContainer}>
                <TouchableOpacity style={{ ...styles.selectButton, marginBottom: moderateScale(10) }} onPress={() => setLanguage('en')}>
                    <Text style={styles.textButton}>Tiếng Anh</Text>
                    {
                        language === 'en' ?
                            <AntDesign name='checksquare' size={moderateScale(20)} style={{ marginLeft: moderateScale(10) }} />
                            : <AntDesign name='checksquareo' size={moderateScale(20)} style={{ marginLeft: moderateScale(10) }} />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectButton} onPress={() => setLanguage('vi')}>
                    <Text style={styles.textButton}>Tiếng Việt</Text>
                    {
                        language === 'vi' ?
                            <AntDesign name='checksquare' size={moderateScale(20)} style={{ marginLeft: moderateScale(10) }} />
                            : <AntDesign name='checksquareo' size={moderateScale(20)} style={{ marginLeft: moderateScale(10) }} />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
                <TouchableOpacity style={{ ...styles.optionButton, backgroundColor: '#4CAF50' }} onPress={confirmHandler}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Đồng ý thay đổi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.optionButton, backgroundColor: '#555555' }} onPress={() => setIsModalVisible(false)}>
                    <Text style={{ color: 'white', fontWeight: '300' }}>Hủy</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.alertContainer}>
                <Text style={styles.alertText}>Lưu ý: App sẽ khởi động lại để áp dụng những thay đổi</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#EAEAEC'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'BalooBhaina2-ExtraBold',
        fontSize: moderateScale(20)
    },
    selectContainer: {
        alignItems: 'center',
        paddingBottom: 0,
    },
    selectButton: {
        height: verticalScale(40),
        width: scale(120),
        borderColor: '#87CEFA',
        borderWidth: moderateScale(1),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(10),
        flexDirection: 'row',
    },
    textButton: {
        fontWeight: '700',
        color: '#808080'
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(10)
    },
    optionButton: {
        height: verticalScale(40),
        width: scale(100),
        borderColor: '#87CEFA',
        borderWidth: moderateScale(1),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(10),
        marginLeft: moderateScale(5)
    },
    alertContainer: {
        marginTop: moderateScale(8),
        paddingHorizontal: moderateScale(5)
    },
    alertText: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        textAlign: 'center'
    }
})

export default LanguageSelection

