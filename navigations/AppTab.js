import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MusicPlayerStack from './MusicPlayerStack';
import Entypo from 'react-native-vector-icons/Entypo'

const Tab = createBottomTabNavigator();

const AppTab = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home';
                } else if (route.name === 'MusicPlayer') {
                    iconName = focused ? 'folder-music' : 'folder-music';
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
    </Tab.Navigator>
)

export default AppTab;