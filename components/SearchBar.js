import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';

import { colors } from '../configs/colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const SearchBar = ({ setSortedList, list }) => {

    const [input, setInput] = useState('');

    const textChangeHandler = (value) => {
        setInput(value);
        const newList = list.filter(item => item.title.toUpperCase().indexOf(value.toUpperCase()) > -1);
        setSortedList(newList);
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Search music...'
                style={styles.textInput}
                underlineColorAndroid='transparent'
                value={input}
                onChangeText={textChangeHandler} />
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
        width: '100%',
    }
})

export default SearchBar
