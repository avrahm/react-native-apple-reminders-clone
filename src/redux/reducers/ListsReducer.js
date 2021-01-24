import update from 'immutability-helper';
//immutability-helper
//https://reactjs.org/docs/update.html

//create the initial state of the app
const initialState = {
    listId: 1,
    lists: {
        name: '',
        icon: '',
        color: ''
    }
}

//reducer handles the actions sent by dispatchers to modify and return the state
const lists = (state = initialState, action) => {

    let index;
    let newState;

    switch (action.type) {
        case 'ADD_LIST':
            
        case 'DELETE_LIST':
            
        case 'COMPLETE_LIST':
            
        case 'UPDATE_LIST':

    }
    return state;
}

export default lists;