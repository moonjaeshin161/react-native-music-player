import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlayer from 'react-native-track-player';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Slider from '@react-native-community/slider';
import Moment from 'moment';

import Controller from '../../components/Controller';
import CardMusic from '../../components/CardMusic';
import SeekBar from '../../components/SeekBar';
import DefaultThumbnail from '../../assets/images/default_thumbnail.jpg';

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

    const duration = currentSong.duration / 1000;
    const [track, setTrack] = useState({ timeElapsed: "0:00", timeRemaining: Moment.utc(duration * 1000).format("m:ss") });

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

    useEffect(() => {
        setTrack({
            ...track,
            timeElapsed: Moment.utc(position * 1000).format("m:ss"),
            timeRemaining: Moment.utc((duration - position) * 1000).format("m:ss"),
        })
    }, [position])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'center', marginTop: moderateScale(24) }}>
                    <Text style={[styles.textLight, { fontSize: moderateScale(12) }]}>PLAYLIST</Text>
                    <Text style={[styles.text, { fontSize: moderateScale(15), fontWeight: '500', marginTop: moderateScale(8) }]}>
                        Thank you for using our app
                    </Text>
                </View>

                <View style={styles.coverContainer}>
                    <Image source={DefaultThumbnail} style={styles.cover} />
                </View>
            </View>

            <View style={{ alignItems: 'center', marginTop: moderateScale(32) }}>
                <Text style={[styles.textDark, { fontSize: moderateScale(20), fontWeight: '500' }]}>
                    {currentSong.id ? currentSong.title : 'Song Title'}
                </Text>
                <Text style={[styles.text, { fontSize: moderateScale(16), marginTop: moderateScale(8) }]}>
                    {currentSong.artist ? currentSong.artist : 'Unknown'}
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
            {/* <AntDesign name='down' size={30} onPress={() => setIsVisible(false)} />
            <CardMusic currentSong={currentSong} />
            <Controller
                playerState={playerState}
                previousHandler={previousHandler}
                pauseHandler={pauseHandler}
                nextHandler={nextHandler}
                playHandler={playHandler}
                replayType={replayType}
                setReplayType={setReplayType}
                isRandom={isRandom}
                setIsRandom={setIsRandom}
            />
            <SeekBar position={position} duration={duration} /> */}

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
        marginTop: moderateScale(32),
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
    }

})

export default PlayerModal;
