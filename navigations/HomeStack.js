import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../views/main/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack