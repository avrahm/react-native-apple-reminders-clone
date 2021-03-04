import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from './LoginScreen';

import { logoutFirebase } from '../firebase/functions/logout';

export default function ProfileScreen() {
    const isLoggedIn = useSelector(state => state.userState.isLoggedIn);
    const userInfo = useSelector(state => state.userState.userInfo);
    const dispatch = useDispatch();
    const signOutUser = () => {
        dispatch(logoutFirebase())
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            {isLoggedIn ? (
                <View>
                    <Text>Logged In as {userInfo.email}</Text>
                    <Button onPress={() => signOutUser()} title='Logout' />
                </View>
            ) : (
                    <LoginScreen />
                )}
        </View>
    )
}