import { firebase } from '../config';
import { getData } from '../../redux/actions/TodoActions';

export const syncDataToFirebase = (data, userID) => async dispatch => {

    const entityRef = firebase.firestore().collection('tasks');
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const dataNode = {
        tasks: data || {
            list: { id: 0, title: 'Inbox', icon: 'mail-outline', color: 'gray', listHidden: true, showCompletedTasks: false },
            data: [
                { id: 1, title: "Thing to do", description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et', dueDate: testDueTodayDate, complete: false, listId: 0 },
                { id: 2, title: "Homework", description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab', dueDate: '', complete: false, listId: 0 },
                { id: 11, title: "Get this done", description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated', dueDate: '', complete: true, listId: 0 },
            ],
            showCompletedTasks: false
        },
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
        })
        .catch((error) => {
            //handle error new task list
            alert(error)
        });
}