import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import HomeStack from './HomeStack';
import MusicPlayerStack from './MusicPlayerStack';
import SettingStack from './SettingStack';
import UserStack from './UserStack';

import Entypo from 'react-native-vector-icons/Entypo'
import I18n from '../i18n';

const Tab = createBottomTabNavigator();

const AppTab = () => {

    const isLogin = useSelector(state => state.auth.isLogin);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === I18n.t('home')) {
                        iconName = 'home'
                    } else if (route.name === I18n.t('musicPlayer')) {
                        iconName = 'folder-music';
                    } else if (route.name === I18n.t('setting')) {
                        iconName = 'cog';
                    } else if (route.name === I18n.t('user')) {
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
            <Tab.Screen name={I18n.t('home')} component={HomeStack} />
            <Tab.Screen name={I18n.t('musicPlayer')} component={MusicPlayerStack} />
            {
                isLogin && <Tab.Screen name={I18n.t('user')} component={UserStack} />
            }
            <Tab.Screen name={I18n.t('setting')} component={SettingStack} />
        </Tab.Navigator>
    )
}

export default AppTab;