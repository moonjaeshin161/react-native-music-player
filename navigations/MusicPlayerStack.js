import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PlayerScreen from '../views/musicPlayer/PlayerScreen';

const Stack = createStackNavigator();

const MusicPlayerStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={PlayerScreen} />
        </Stack.Navigator>
    )
}

export default MusicPlayerStack;