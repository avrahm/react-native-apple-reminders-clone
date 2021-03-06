import { firebase } from '../config';
import { starterList } from '../../redux/selectors/TodoSelectors';

export const syncDataToFirebase = (data, userID) => async dispatch => {

    const entityRef = firebase.firestore().collection('tasks');
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const dataNode = {
        tasks: data || { starterList },
        authorID: userID,
        lastSyncedAt: timestamp,
    };
    entityRef
        .doc(userID)
        .set(dataNode)
        .then(() => {
            // setEntityText('')
            // Keyboard.dismiss()
            //handle sync complete
            //dispatch update last sync
            alert('sync complete')
        })
        .catch((error) => {
            //handle error new task list
            alert(error)
        });
}