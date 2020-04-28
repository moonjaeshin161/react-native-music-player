import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { colors } from '../configs/colors';
import { setCurrentSong } from '../views/musicPlayer/PlayerActions';

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
                <Text style={styles.title}>{parseInt(item.id) + 1}. </Text>
                <Text style={styles.title}>{item.title}</Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: colors.gray,
        borderWidth: scale(0.5),
    },
    listItem: {
        paddingLeft: scale(5),
        flexDirection: 'row'
    },
    title: {
        fontSize: verticalScale(15),
    }
});

export default MusicItem
