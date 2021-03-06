import { firebase } from '../config';
import { logout } from '../../redux/actions/UserActions';
import { clearData } from '../../redux/actions/TodoActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logoutFirebase = () => async dispatch => {
    try {
        await firebase.auth().signOut();
        // handle sucessful logout
        dispatch(logout())
        dispatch(clearData())
        AsyncStorage.clear();
    } catch (error) {
        //handle logout errors
        alert(error);
    }
}