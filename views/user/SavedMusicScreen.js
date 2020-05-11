import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
//firebase
import firestore from '@react-native-firebase/firestore';
import { } from 'react-native-gesture-handler';

const SavedMusicScreen = () => {

    const [loading, setLoading] = useState(true);
    const [savedMusics, setSavedMusics] = useState([]);
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        const subscriber = firestore()
            .collection('Musics')
            .doc(user.uid)
            .onSnapshot({
                includeMetadataChanges: true
            }, (doc) => {
                const data = doc.data();
                setSavedMusics(convertObjToArr(data));
            });
        return () => subscriber();
    }, []);

    const convertObjToArr = (object) => {
        const listKey = Object.keys(object);
        const newList = [];
        for (let i = 0; i < listKey.length; i++) {
            newList.push(object[i]);
        }
        return newList;
    }

    return (
        <View style={styles.container}>
            {console.log('Saved Musics: ', savedMusics)}
            <FlatList
                data={savedMusics}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Text>{item.title}</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1
    // }
})

export default SavedMusicScreen

