import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const AboutScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: moderateScale(10), alignItems: 'center' }}>
                <Text style={styles.title}>Về chúng tôi</Text>
            </View>
            <View style={styles.content}>

                <Text style={styles.textDescription}>
                    {'  App hỗ trợ người dùng nghe nhạc được lưu sẵn trong bộ nhớ máy cũng như lưu trữ những bài hát mình yêu thích online'}
                </Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: moderateScale(10),
        marginTop: moderateScale(5)
    },
    title: {
        fontFamily: 'AlfaSlabOne-Regular',
        fontSize: moderateScale(40),
        color: '#3D425C'
    },
    textDescription: {
        fontSize: moderateScale(25),
        fontFamily: 'Jura',
        color: '#696969',
    }
})

export default AboutScreen;


