import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { } from 'react-native-safe-area-context';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Bài tập lớn - App nghe nhạc</Text>
            <Text style={styles.subTitle}>Các thành viên trong nhóm</Text>
            <View style={styles.listContainer}>
                <Text style={styles.member}>Nguyễn Công Huynh</Text>
                <Text style={styles.member}>Vũ Đăng Huy</Text>
                <Text style={styles.member}>Hoàng Thái Hà</Text>
                <Text style={styles.member}>Doãn Đoàn Đại Hùng</Text>
                <Text style={styles.member}>Kiều Thanh Phong</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: scale(25),
        fontWeight: '600',
        textAlign: 'center'
    },
    subTitle: {
        fontSize: scale(22),
        fontWeight: '400',
        textAlign: 'center',
        marginTop: scale(5)
    },
    listContainer: {
        paddingTop: verticalScale(10)
    },
    member: {
        fontSize: scale(13),
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: scale(5)
    }
})

export default HomeScreen
