import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import I18n from '../../i18n';

const AboutScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: moderateScale(10), alignItems: 'center' }}>
                <Text style={styles.title}>{I18n.t('aboutUs')}</Text>
            </View>
            <View style={styles.content}>

                <Text style={styles.textDescription}>
                    {I18n.t('description')}
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


