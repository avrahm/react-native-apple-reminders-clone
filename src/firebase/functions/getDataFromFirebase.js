/* eslint-disable import/prefer-default-export */
import { firebase } from '../config';
import { loadData } from '../../redux/actions/TodoActions';
import { setLastSync } from '../../redux/actions/UserActions';

export const getDataFromFirebase = userID => async dispatch => {
    // create a connection to firebase and get look at the tasks collection for a document by userID
    const docRef = firebase.firestore().collection('tasks').doc(userID);
    return docRef.onSnapshot(doc => {
        if (doc.exists) {
            // handle successfully getting data
            try {
                dispatch(setLastSync(new Date()));
                dispatch(loadData(doc.data()));
            } catch (error) {
                // doc.data() will be undefined in this case
                // handle no documents
                alert('No such document!');
            }
        }
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
};