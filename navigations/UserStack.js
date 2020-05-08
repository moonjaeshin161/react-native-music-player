import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../views/user/ProfileScreen';
import EditProfileScreen from '../views/user/EditProfileScreen';

const Stack = createStackNavigator();

const UserStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Edit' component={EditProfileScreen} />
        </Stack.Navigator>
    )
}

export default UserStack;