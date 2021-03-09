/* eslint-disable import/prefer-default-export */
import { firebase } from '../config';
import { setUser } from '../../redux/actions/UserActions';
import { syncDataToFirebase } from './syncData';
import { starterList } from '../../redux/selectors/TodoSelectors';

export const signUpFirebase = signupDetails => async dispatch => {
    const { fullName, email, password } = signupDetails;
    const firebaseAuth = firebase.auth();

    const createUserOnFirebase = await firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then(async response => {
            try {
                // handle successful new create user
                const { uid } = response.user;
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                const usersRef = firebase.firestore().collection('users');
                await usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        // handle successful retrieving user data
                        // navigation.navigate('Home', { user: data })
                        dispatch(setUser(data));
                        dispatch(syncDataToFirebase({ 0: starterList }, uid));
                        return true;
                    });
                return true;
            } catch (error) {
                // handle errors when retrieving user data
                alert(error);
                return false;
            }
        })
        .catch(error => {
            // handle erros on create new user
            alert(error);
            return false;
        });
    return createUserOnFirebase;
};
