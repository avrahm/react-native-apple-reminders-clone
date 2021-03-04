import { firebase } from '../config';
import { logout } from '../../redux/actions/UserActions';

export const logoutFirebase = () => async dispatch => {
    try {
        await firebase.auth().signOut();
        // handle sucessful logout
        dispatch(logout())
    } catch (error) {
        //handle logout errors
        alert(error);
    }
}