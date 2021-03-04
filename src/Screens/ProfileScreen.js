import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from './LoginScreen';

import { firebase } from '../firebase/config';
import { logout } from '../redux/actions/UserActions';
export default function ProfileScreen() {
    const isLoggedIn = useSelector(state => state.userState.isLoggedIn);
    // console.log('isLoggedin', isLoggedIn);
    const dispatch = useDispatch()
    const signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            // navigate('Auth');
            dispatch(logout())
        } catch (e) {
            console.log(e);
        }
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
                    <Text>Logged In</Text>
                    <Button onPress={() => signOutUser()} title='Logout' />
                </View>
            ) : (
                    <LoginScreen />
                )}
        </View>
    )
}