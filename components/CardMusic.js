import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import DefaultThumbnail from '../assets/images/default_thumbnail.jpg';

const CardMusic = () => {

    const currentSong = useSelector(state => state.player.currentSong);

    const cutText = (string) => {
        let newString = string.substring(0, 25);
        if (string.length >= 25) newString += "...";
        return newString;
    };

    return (
        <View style={styles.container}>

            <Image style={styles.thumbnail} source={DefaultThumbnail} />
            <Text style={styles.itemName}>{currentSong.title ? cutText(currentSong.title) : 'Song Name'}</Text>
            <Text style={styles.itemArtist}>{currentSong.artist ? cutText(currentSong.artist) : 'Artist'}</Text>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    thumbnail: {
        width: scale(200),
        height: verticalScale(200),
        margin: moderateScale(20)
    },
    itemName: {
        fontSize: moderateScale(20),
        fontWeight: "bold"
    },
    itemArtist: {
        fontSize: moderateScale(15),
        fontWeight: "400"
    }
})

export default CardMusic
