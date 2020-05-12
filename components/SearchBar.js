import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard } from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

import { colors } from '../configs/colors';

const SearchBar = ({ setSortedList, list, setIsSearched }) => {

    const [input, setInput] = useState('');

    const textChangeHandler = (value) => {
        setInput(value);
        const newList = list.filter(item => item.title.toUpperCase().indexOf(value.toUpperCase()) > -1);
        setSortedList(newList);
    }

    const pressHandler = () => {
        Keyboard.dismiss();
        setIsSearched(false);
    }

    return (
        <View style={styles.container}>

            <TextInput
                placeholder='Search music...'
                style={styles.textInput}
                underlineColorAndroid='transparent'
                value={input}
                onChangeText={textChangeHandler} />

            <TouchableOpacity style={styles.button} onPress={pressHandler}>
                <Text style={styles.textButton}>Hủy</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: colors.gray,
        borderWidth: moderateScale(2),
        borderRadius: moderateScale(10),
        margin: 5,
        height: verticalScale(40),
        alignItems: 'center'
    },
    textInput: {
        marginLeft: scale(10),
        flex: 1,
    },
    button: {
        borderColor: '#87CEFA',
        backgroundColor: '#87CEFA',
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(5),
        paddingHorizontal: moderateScale(5),
        paddingVertical: moderateScale(5),
        marginRight: moderateScale(10)
    },
    textButton: {
        color: 'white'
    }
})

export default SearchBar
