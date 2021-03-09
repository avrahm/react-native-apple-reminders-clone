/* eslint-disable import/prefer-default-export */
import { firebase } from '../config';
import { setUser } from '../../redux/actions/UserActions';

export const loginFirebase = (email, password) => dispatch => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
            // handle successful authentication
            const { uid } = response.user;

            // connect to firestore collection 'users' to get users details
            const usersRef = firebase.firestore().collection('users');
            usersRef.doc(uid).get().then(firestoreDocument => {
                try {
                    // check firestore for user account data
                    if (!firestoreDocument.exists) {
                        alert('User does not exist anymore.');
                        return;
                    }
                    const user = firestoreDocument.data();
                    dispatch(setUser(user));
                } catch (error) {
                    // handle error retriveing user account
                    alert(error);
                }
            });
        })
        .catch(error => {
            // handle errors on login
            alert(error);
        });
};
