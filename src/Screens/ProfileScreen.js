import React from 'react';
import {
    View, Text, Button, StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import { logoutFirebase } from '../firebase/functions/logout';
import { formatDateWithTime } from '../assets/utils/formatDate';
import ButtonComponent from '../Components/ButtonComponent';
import { setDataToFirebase } from '../firebase/functions/setDataToFirebase';

export default function ProfileScreen() {
    const dispatch = useDispatch();

    const lastSyncedAtStatus = useSelector(state => state.userState.lastSyncedAt);
    const userInfo = useSelector(state => state.userState.userInfo);
    const getAllTodos = useSelector(state => state.todoState.todoLists);

    return (
        <View style={styles.container}>
            <View>
                <Text>
                    Logged In as {userInfo.email}
                </Text>
                <Text>
                    Last Synced at: {formatDateWithTime(lastSyncedAtStatus)}
                </Text>

                <ButtonComponent icon="sync" text="Sync Data" onPress={() => dispatch(setDataToFirebase(getAllTodos, userInfo.id))} />

                <Button onPress={() => dispatch(logoutFirebase())} title="Logout" />
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
