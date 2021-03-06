import React from 'react';
import {
    View, Text, Button, StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import { logoutFirebase } from '../firebase/functions/logout';

export default function ProfileScreen() {

    const userInfo = useSelector(state => state.userState.userInfo);
    const dispatch = useDispatch();
    const signOutUser = () => {

        dispatch(logoutFirebase());

    };

    return (
        <View style={styles.container}>
            <View>
                <Text>
                    Logged In as
                    {userInfo.email}
                </Text>
                <Button onPress={() => signOutUser()} title="Logout" />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
    },
});
