import { firebase } from '../config';
import { setUser } from '../../redux/actions/UserActions';

export const signUpFirebase = (signupDetails) => dispatch => {
    const { fullName, email, password } = signupDetails;
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            //handle successful new create user
            const uid = response.user.uid
            const data = {
                id: uid,
                email: email,
                fullName: fullName,
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    // handle successful retrieving user data
                    // navigation.navigate('Home', { user: data })
                    dispatch(setUser(data))
                })
                .catch((error) => {
                    //handle errors when retrieving user data
                    alert(error)
                });
        })
        .catch((error) => {
            //handle erros on create new user 
            alert(error)
        });
}