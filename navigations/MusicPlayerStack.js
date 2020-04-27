import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import PlayerScreen from '../views/musicPlayer/PlayerScreen';
import ListMusicScreen from '../views/musicPlayer/ListMusicScreen';

const Stack = createStackNavigator();

const MusicPlayerStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='MusicList' component={ListMusicScreen} />
            <Stack.Screen name='Player' component={PlayerScreen} />
        </Stack.Navigator>
    )
}

export default MusicPlayerStack;