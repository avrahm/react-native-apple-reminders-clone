import React from 'react';
import { View } from 'react-native';
import LoginScreen from './LoginScreen';

export default function ProfileScreen() {

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <LoginScreen />
        </View>
    )
}