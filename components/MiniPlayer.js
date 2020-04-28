import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING, STATE_PAUSED } from 'react-native-track-player';

import MiniThumbnail from '../assets/images/default_mini_thumbnail.png';

const MiniPlayer = () => {
    return (
        <View style={styles.container}>
            <Image source={MiniThumbnail} style={styles.miniThumb} />
            <View style={styles.titleContainer}>
                <Text style={styles.titleSong}>Song Name</Text>
                <Text style={styles.titleArtist}>Artist</Text>
            </View>
            <View style={styles.controlContainer}>
                <Entypo name='controller-jump-to-start' style={{ marginLeft: moderateScale(7) }} size={moderateScale(35)} />
                <Entypo name='controller-play' style={{ marginLeft: moderateScale(7) }} size={moderateScale(35)} />
                <Entypo name='controller-next' style={{ marginLeft: moderateScale(7) }} size={moderateScale(35)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: verticalScale(55),
        width: '100%',
        borderRadius: moderateScale(10),
        borderColor: 'black',
        alignItems: 'center',
        borderWidth: scale(3),
        flexDirection: 'row'
    },
    miniThumb: {
        height: verticalScale(40),
        width: scale(40),
        borderRadius: 25,
        marginLeft: moderateScale(5)
    },
    titleContainer: {
        flexDirection: 'column',
        marginLeft: moderateScale(8),
        justifyContent: 'center'
    },
    titleSong: {
        fontSize: moderateScale(18),
        fontWeight: '600'
    },
    titleArtist: {
        fontSize: moderateScale(10),
        paddingLeft: moderateScale(7)
    },
    controlContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        paddingRight: moderateScale(30)
    }
});

export default MiniPlayer
