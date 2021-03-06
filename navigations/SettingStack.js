import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import SettingScreen from '../views/main/SettingScreen';
import LoginScreen from '../views/auth/LoginScreen';
import RegisterScreen from '../views/auth/RegisterScreen';
import AboutScreen from '../views/main/AboutScreen';

const Stack = createStackNavigator();

const SettingStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen name='Setting' component={SettingScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='About' component={AboutScreen} />

        </Stack.Navigator>
    )
}

export default SettingStack