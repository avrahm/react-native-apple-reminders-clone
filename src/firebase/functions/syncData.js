/* eslint-disable import/prefer-default-export */
import { firebase } from '../config';
import { starterList } from '../../redux/selectors/TodoSelectors';
import { setLastSync } from '../../redux/actions/UserActions';

export const syncDataToFirebase = (data, userID) => dispatch => {
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
            // handle sync complete
            dispatch(setLastSync(new Date()));
            console.log('sync complete');
            return true;
        })
        .catch(error => {
            // handle error new task list
            alert(error);
            return false;
        });
};
