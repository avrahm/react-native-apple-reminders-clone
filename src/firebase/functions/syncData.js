/* eslint-disable import/prefer-default-export */
import { firebase } from '../config';
import { starterList } from '../../redux/selectors/TodoSelectors';
import { setLastSync } from '../../redux/actions/UserActions';

export const syncDataToFirebase = (data, userID) => async dispatch => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const dataNode = {
        tasks: data || { starterList },
        authorID: userID,
        lastSyncedAt: timestamp,
    };
    const entityRef = firebase.firestore().collection('tasks');
    await entityRef
        .doc(userID)
        .set(dataNode)
        .then(async () => {
            // handle sync complete
            dispatch(setLastSync(new Date()));
        }).catch(error => {
            // handle error new task list
            alert(error);
        });
};
