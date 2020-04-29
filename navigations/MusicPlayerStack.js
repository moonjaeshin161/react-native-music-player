import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import ListMusicScreen from '../views/musicPlayer/ListMusicScreen';

const Stack = createStackNavigator();

const MusicPlayerStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='MusicList' component={ListMusicScreen} />
        </Stack.Navigator>
    )
}

export default MusicPlayerStack;