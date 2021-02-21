import update from 'immutability-helper';
//immutability-helper
//https://reactjs.org/docs/update.html

//create the initial state of the app
const initialState = {
    todoId: 7,
    toggleShowAllTodos: false,
    toggleShowSearchResults: false,
    todos: [
        { id: 1, title: "Thing to do", description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et', dueDate: 'Jul 19, 2021', complete: false, listId: 0 },
        { id: 2, title: "Homework", description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab', dueDate: '', complete: false, listId: 2 },
        { id: 3, title: "Haircut", description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born', dueDate: 'Dec 21, 2021', complete: false, listId: 0 },
        { id: 4, title: "Call Place", description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot', dueDate: 'Jan 24, 2021', complete: false, listId: 1 },
        { id: 5, title: "Something else", description: 'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, et', dueDate: 'Mar 7, 2020', complete: false, listId: 1 },
        { id: 6, title: "Get this done", description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated', dueDate: '', complete: true, listId: 0 },
    ],
    user: {
        id: 1,
        username: 'Test'
    }
}

//reducer handles the actions sent by dispatchers to modify and return the state
const todos = (state = initialState, action) => {

    let index;
    let newState;

    switch (action.type) {
        case 'TOGGLE_SHOWALL_TODOS':
            newState = update(state, {
                toggleShowAllTodos: { $set: !state.toggleShowAllTodos }
            })
            return {
                ...newState
            }
        case 'TOGGLE_SHOW_SEARCH_RESULTS':
            newState = update(state, {
                toggleShowSearchResults: { $set: action.payload }
            })
            return {
                ...newState
            }
    }
    return state;
}

export default todos;