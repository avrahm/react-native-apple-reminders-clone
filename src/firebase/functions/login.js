import { firebase } from '../config';

export function login(email, password) {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            //handle successful login
            const uid = response.user.uid
            //connect to firestore collection 'users'
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    //check firestore for user account data
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return;
                    }
                    const user = firestoreDocument.data()
                    // navigation.navigate('Home', {user})
                    console.log(user);
                })
                .catch(error => {
                    //handle error retriveing user account
                    alert(error)
                });
        })
        .catch(error => {
            //handle errors on login
            alert(error)
        })
}