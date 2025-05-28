import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ff9edf',
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            backgroundColor: '#344453',
          },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Users',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="contacts" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Create User',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="adduser" color={color} />,
        }}
      />
    </Tabs>
  );
};
