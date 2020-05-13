import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import TrackPlayer, { STATE_PLAYING } from 'react-native-track-player';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Slider from '@react-native-community/slider';
import Moment from 'moment';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DefaultThumbnail from '../../assets/images/default_thumbnail.jpg';
import I18n from '../../i18n';

const PlayerModal = (props) => {

    const { setIsVisible,
        playerState,
        previousHandler,
        pauseHandler,
        playHandler,
        nextHandler,
        currentSong,
        position,
        replayType,
        setReplayType,
        isRandom,
        setIsRandom
    } = props;

    const duration = currentSong.id ? currentSong.duration / 1000 : 0;
    const [track, setTrack] = useState({ timeElapsed: "0:00", timeRemaining: Moment.utc(duration * 1000).format("m:ss") });
    const [isPlaying, setIsPlaying] = useState((playerState === STATE_PLAYING) ? true : false);

    const changeTime = (seconds) => {
        setTrack({
            ...track,
            timeElapsed: Moment.utc(seconds * 1000).format("m:ss"),
            timeRemaining: Moment.utc((duration - seconds) * 1000).format("m:ss"),
        })
    }

    const handleSliding = (time) => {
        TrackPlayer.seekTo(time);
        TrackPlayer.play();
    };

    const playControl = () => {
        if (playerState !== null) {
            playHandler();
            setIsPlaying(true);
        }
    }

    const pauseControl = () => {
        pauseHandler();
        setIsPlaying(false);
    }

    useEffect(() => {
        setTrack({
            ...track,
            timeElapsed: Moment.utc(position * 1000).format("m:ss"),
            timeRemaining: Moment.utc((duration - position) * 1000).format("m:ss"),
        });
    }, [position])

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: moderateScale(24) }}>
                <EvilIcons name='arrow-left' size={moderateScale(35)} style={{ paddingLeft: moderateScale(10) }} color='gray' onPress={() => setIsVisible(false)} />
                <Text style={[styles.textLight, { fontSize: moderateScale(12) }]}>{I18n.t('playlist')}</Text>
                <EvilIcons name='navicon' size={moderateScale(35)} style={{ paddingRight: moderateScale(10) }} color='gray' onPress={() => setIsVisible(false)} />
            </View>

            <View style={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.text, { fontSize: moderateScale(15), fontWeight: '500', marginTop: moderateScale(8) }]}>
                        {I18n.t('thankyou')}
                    </Text>
                </View>

                <View style={[styles.coverContainer, { marginTop: moderateScale(15) }]}>
                    <Image source={DefaultThumbnail} style={styles.cover} />
                </View>
            </View>

            <View style={{ alignItems: 'center', marginTop: moderateScale(25) }}>
                <Text style={[styles.textDark, { fontSize: moderateScale(20), fontWeight: '500' }]}>
                    {currentSong.id ? currentSong.title : I18n.t('songName')}
                </Text>
                <Text style={[styles.text, { fontSize: moderateScale(16), marginTop: moderateScale(8) }]}>
                    {currentSong.artist ? currentSong.artist : I18n.t('unknown')}
                </Text>
            </View>

            <View style={{ margin: moderateScale(32) }}>
                <Slider
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    minimumTrackTintColor='#FFF'
                    thumbTintColor='#3D425C'
                    onValueChange={(seconds) => changeTime(seconds)}
                    onSlidingStart={() => TrackPlayer.pause()}
                    onSlidingComplete={(value) => handleSliding(value)}
                />
                <View style={{ marginTop: moderateScale(-12), flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.textLight, styles.timeStamp]}>{track.timeElapsed}</Text>
                    <Text style={[styles.textLight, styles.timeStamp]}>{track.timeRemaining}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ paddingRight: moderateScale(10) }}>
                    {
                        (replayType === 'no')
                            ? <MaterialCommunityIcons name='repeat-off' size={moderateScale(25)} color="#93A8BA" onPress={() => setReplayType('all-songs')} />
                            : (replayType === 'all-songs')
                                ? < MaterialCommunityIcons name='repeat' size={moderateScale(25)} color="black" onPress={() => setReplayType('one-song')} />
                                : < MaterialCommunityIcons name='repeat-once' size={moderateScale(25)} color="black" onPress={() => setReplayType('no')} />

                    }
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome5 name='backward' size={moderateScale(32)} color="#93A8BA" onPress={previousHandler} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playButtonContainer}>
                    {
                        isPlaying
                            ? <FontAwesome5 name='pause' size={moderateScale(35)} color="#3D425C" onPress={pauseControl} />
                            : <FontAwesome5 name='play' size={moderateScale(35)} color="#3D425C" style={[styles.playButton, { marginLeft: moderateScale(8) }]} onPress={playControl} />
                    }
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome5 name='forward' size={moderateScale(32)} color="#93A8BA" onPress={nextHandler} />
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: moderateScale(10) }}>
                    <FontAwesome name='random' size={moderateScale(20)} color={isRandom ? '#000000' : "#93A8BA"} onPress={() => setIsRandom(!isRandom)} />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEC'
    },
    textLight: {
        color: '#B6B7BF'
    },
    text: {
        color: '#8E97A6'
    },
    textDark: {
        color: '#3D425C'
    },
    coverContainer: {
        width: scale(250),
        height: verticalScale(250),
        shadowColor: '#5D3F6A',
        shadowOffset: { height: verticalScale(15) },
        shadowRadius: 8,
        shadowOpacity: 0.3
    },
    cover: {
        width: scale(250),
        height: scale(250),
        borderRadius: scale(125)
    },
    timeStamp: {
        fontSize: moderateScale(11),
        fontWeight: '400',
        marginTop: moderateScale(10)
    },
    playButtonContainer: {
        backgroundColor: '#FFF',
        borderColor: "rgba(93,63,106,0.2)",
        borderWidth: moderateScale(12),
        width: scale(100),
        height: scale(100),
        borderRadius: moderateScale(64),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: moderateScale(20),
        shadowColor: '#5D3F6A',
        shadowRadius: moderateScale(30),
        shadowOpacity: scale(0.5)
    }

})

export default PlayerModal;
