import React, { useEffect } from 'react';
import {
    View, Text, Button, StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import { logoutFirebase } from '../firebase/functions/logout';
import { handleSyncData } from '../firebase/functions/handleSyncData';

export default function ProfileScreen() {
    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.userState.userInfo);
    const getAllTodos = useSelector(state => state.todoState.todoLists);
    const logoutSync = true;
    let syncSettings;
    useEffect(() => {
        syncSettings = {
            userInfo, logoutSync, getAllTodos,
        };
    }, [getAllTodos]);
    const signOutUser = () => {
        const syncData = dispatch(handleSyncData(syncSettings));
        if (syncData) {
            dispatch(logoutFirebase());
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text>
                    Logged In as {userInfo.email}
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
