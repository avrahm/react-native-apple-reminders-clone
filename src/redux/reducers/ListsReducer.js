import update from 'immutability-helper';
//immutability-helper
//https://reactjs.org/docs/update.html

//create the initial state of the app
const initialState = {
    listId: 3,
    lists: [
        { id: 0, title: 'Inbox', icon: 'mail-outline', color: 'gray', hidden: true },
        { id: 1, title: 'Groceries', icon: 'basket-outline', color: 'green', hidden: false },
        { id: 2, title: 'Travel', icon: 'airplane', color: 'blue', hidden: false }
    ]
}

//reducer handles the actions sent by dispatchers to modify and return the state
const lists = (state = initialState, action) => {

    let index;
    let newState;

    switch (action.type) {
        case 'ADD_LIST':
            ++state.listId
            let newList = {
                id: action.payload.id,
                title: action.payload.title,
                icon: action.payload.icon,
                color: action.payload.color
            }

            return {
                ...state,
                lists: [newList, ...state.lists]
            }

        case 'DELETE_LIST':
            index = state.lists.findIndex(list => list.id === action.payload.id)
            const newLists = update(state, { lists: { $splice: [[index, 1]] } })
            return {
                ...state,
                ...newLists
            }

        case 'COMPLETE_LIST':

        case 'UPDATE_LIST':

    }
    return state;
}

export default lists;