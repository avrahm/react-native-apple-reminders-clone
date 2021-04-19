/* eslint-disable import/prefer-default-export */
import { firebase } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../redux/actions/UserActions';
import { clearData } from '../../redux/actions/TodoActions';

export const logoutFirebase = () => async dispatch => {
    try {
        AsyncStorage.clear();
        dispatch(clearData());
        dispatch(logout());
        await firebase.auth().signOut();
        // handle successful logout
    } catch (error) {
        // handle logout errors
        alert(error);
    }
};
