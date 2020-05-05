import React from 'react'
import { View, Text, ImageBackground, StyleSheet, Button } from 'react-native'
import SettingBackground from '../../assets/images/setting_background.png';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {

    const navigation = useNavigation();

    return (
        <View>

            <ImageBackground resizeMode="cover" style={styles.background} source={SettingBackground} />

            <View style={styles.content}>
                <Text style={styles.title}>Xin chào đến với app nghenhacretien </Text>
                <Text>Đăng nhập ngay để sử dụng đầy đủ tính năng nhất</Text>
                <Button title='Đăng nhập' onPress={() => navigation.navigate('Login')} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: verticalScale(200)
    },
    content: {
        alignItems: 'center'
    },
    title: {
        fontFamily: 'BalooBhaina2-ExtraBold',
        fontSize: moderateScale(20)
    }
});

export default SettingScreen
