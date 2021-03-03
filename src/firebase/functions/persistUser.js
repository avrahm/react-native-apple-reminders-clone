import { firebase } from '../config';

export function persistUser() {
    //connect to firebase and retrieve the 'users' collection
    const usersRef = firebase.firestore().collection('users');
    //use the auth method to link into the app firebase service
    //onAuthStateChanged returns the currently signed in user
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            usersRef
                .doc(user.uid)
                .get()
                .then((document) => {
                    //handle persisted user data
                    const userData = document.data()
                    // setLoading(false)
                    // setUser(userData)
                })
                .catch((error) => {
                    // handle errors when getting persisted user 
                    // setLoading(false)
                });
        } else {
            //handle no persisted user
            setLoading(false)
        }
    });
}