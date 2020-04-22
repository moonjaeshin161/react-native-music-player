import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MusicPlayerStack from './MusicPlayerStack';

const Tab = createBottomTabNavigator();

const AppTab = () => (
    <Tab.Navigator >
        <Tab.Screen name='Home' component={HomeStack} />
        <Tab.Screen name='MusicPlayer' component={MusicPlayerStack} />
    </Tab.Navigator>
)

export default AppTab;