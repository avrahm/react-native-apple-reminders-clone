/* eslint-disable import/prefer-default-export */
import { firebase } from '../config';
import { loadData } from '../../redux/actions/TodoActions';

export const getDataFromFirebase = userID => async dispatch => {

    // create a connection to firebase and get look at the tasks collection for a document by userID
    const docRef = firebase.firestore().collection('tasks').doc(userID);
    docRef.get().then(doc => {

        if (doc.exists) {

            // alert("Document data:", doc.data());
            // handle successfully getting data
            dispatch(loadData(doc.data()));

        } else {

            // doc.data() will be undefined in this case
            // handle no documents
            alert('No such document!');

        }

    }).catch(error => {

        // handle errors getting docs
        alert('Error getting document:', error);

    });

};
