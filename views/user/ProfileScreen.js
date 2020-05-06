import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
    const user = useSelector(state => state.user.user);

    return (
        <SafeAreaView>
            {console.log('User', user)}
            <Text>Profile Screen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default ProfileScreen;

