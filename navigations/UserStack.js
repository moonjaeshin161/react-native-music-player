import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../views/user/ProfileScreen';

const Stack = createStackNavigator();

const UserStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Profile' component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default UserStack;