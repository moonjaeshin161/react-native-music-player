import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo'

import HomeStack from './HomeStack';
import MusicPlayerStack from './MusicPlayerStack';
import SettingStack from './SettingStack';
import UserStack from './UserStack';

const Tab = createBottomTabNavigator();

const AppTab = () => {

    const isLogin = useSelector(state => state.auth.isLogin);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home'
                    } else if (route.name === 'MusicPlayer') {
                        iconName = 'folder-music';
                    } else if (route.name === 'Setting') {
                        iconName = 'cog';
                    } else if (route.name === 'User') {
                        iconName = 'user';
                    }

                    // You can return any component that you like here!
                    return <Entypo name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name='Home' component={HomeStack} />
            <Tab.Screen name='MusicPlayer' component={MusicPlayerStack} />
            {
                isLogin && <Tab.Screen name='User' component={UserStack} />
            }
            <Tab.Screen name='Setting' component={SettingStack} />
        </Tab.Navigator>
    )
}

export default AppTab;