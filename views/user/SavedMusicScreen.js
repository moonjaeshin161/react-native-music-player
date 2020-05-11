import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
//firebase
import firestore from '@react-native-firebase/firestore';

const SavedMusicScreen = () => {

    const [loading, setLoading] = useState(true);
    const [savedMusics, setSavedMusics] = useState([]);
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        realtimeGetMusic()
    }, []);

    const getMusic = async () => {
        const musicsCollection = firestore().collection('Musics');
        musicsCollection
            .doc(user.uid)
            .get()
            .then(doc => {
                console.log(doc.data())
            })
    }

    const realtimeGetMusic = async () => {
        const musicsDoc = firestore().collection('Musics').doc(user.uid);
        musicsDoc.onSnapshot({
            includeMetadataChanges: true
        }, (doc) => {
            console.log('Data: ', doc.data())
        }
        )

    }

    return (
        <View>
            <TouchableOpacity onPress={getMusic}>
                <Text>Get Music</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default SavedMusicScreen

