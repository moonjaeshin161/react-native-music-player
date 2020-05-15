import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import HomeStack from './HomeStack';
import MusicPlayerStack from './MusicPlayerStack';
import SettingStack from './SettingStack';
import UserStack from './UserStack';

import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createBottomTabNavigator();

const AppTab = () => {

    const isLogin = useSelector(state => state.auth.isLogin);
    const [language, setLanguage] = useState();

    useEffect(() => {
        getCurrentLanguage();
    }, []);

    const getCurrentLanguage = async () => {
        let currentLanguage = await AsyncStorage.getItem('language');
        if (currentLanguage === null) {
            currentLanguage = 'vi';
        }
        await setLanguage(currentLanguage);
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home' || route.name === 'Trang chủ') {
                        iconName = 'home'
                    } else if (route.name === 'Music Player' || route.name === 'Máy phát nhạc') {
                        iconName = 'folder-music';
                    } else if (route.name === 'Setting' || route.name === 'Cài đặt') {
                        iconName = 'cog';
                    } else if (route.name === 'User' || route.name === 'Người dùng') {
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
            <Tab.Screen name={(language === 'vi') ? 'Trang chủ' : 'Home'} component={HomeStack} />
            <Tab.Screen name={(language === 'vi') ? 'Máy phát nhạc' : 'Music Player'} component={MusicPlayerStack} />
            {
                isLogin && <Tab.Screen name={(language === 'vi') ? 'Người dùng' : 'User'} component={UserStack} />
            }
            <Tab.Screen name={(language === 'vi') ? 'Cài đặt' : 'Setting'} component={SettingStack} />
        </Tab.Navigator>
    )
}

export default AppTab;