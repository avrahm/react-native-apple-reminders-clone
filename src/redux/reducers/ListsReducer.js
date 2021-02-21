import update from 'immutability-helper';
//immutability-helper
//https://reactjs.org/docs/update.html

//create the initial state of the app
const initialState = {
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
        
        case 'DELETE_LIST':
            index = state.lists.findIndex(list => list.id === action.payload.id)
            newState = update(state, { lists: { $splice: [[index, 1]] } })
            return {
                ...state,
                ...newState
            }

        case 'COMPLETE_LIST':

        case 'UPDATE_LIST':
            index = state.lists.findIndex(list => list.id === action.payload.id)
            newState = update(state, {
                lists: {
                    [index]: {
                        $set: action.payload
                    }
                }
            })
            return {
                ...newState
            }
    }
    return state;
}

export default lists;