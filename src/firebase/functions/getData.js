import { firebase } from '../config';
import { loadData } from '../../redux/actions/TodoActions';



export const getDataFromFirebase = (userID) => async dispatch => {

    const docRef = firebase.firestore().collection('tasks').doc(userID)

    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Document data:", doc.data());

            //setDataLocally
            dispatch(loadData(doc.data()))
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });



}