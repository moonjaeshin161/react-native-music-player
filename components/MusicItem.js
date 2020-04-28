import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { colors } from '../configs/colors';
import { setCurrentSong } from '../views/musicPlayer/PlayerActions';
import MiniThumbnail from '../assets/images/default_mini_thumbnail.png';

const MusicItem = ({ item }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const pressHandler = () => {
        dispatch(setCurrentSong(item));
        navigation.navigate('Player');
    }

    return (
        <TouchableOpacity style={styles.container} onPress={pressHandler}>

            <View style={styles.listItem}>
                <Image style={styles.miniThumb} source={MiniThumbnail} />
                <Text style={styles.title}>{item.title}</Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: colors.gray,
        borderBottomWidth: scale(0.1),
        marginVertical: verticalScale(2)
    },
    listItem: {
        paddingLeft: moderateScale(5),
        flexDirection: 'row',
        alignItems: 'center'
    },
    miniThumb: {
        width: scale(50),
        height: verticalScale(50)
    },
    title: {
        fontSize: verticalScale(20),
        paddingLeft: scale(5),
        fontWeight: '200'
    }
});

export default MusicItem
