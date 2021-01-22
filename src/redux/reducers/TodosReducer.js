import update from 'immutability-helper';
//immutability-helper
//https://reactjs.org/docs/update.html

//create the initial state of the app
const initialState = {
    todoId: 7,
    toggleShowAllTodos: false,
    todos: [
        { id: 1, title: "Todo 1", description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et', dueDate: 'Jul 19, 2021', complete: false },
        { id: 2, title: "Todo 2", description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab', dueDate: 'Jan 1, 2021', complete: false },
        { id: 3, title: "Todo 3", description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born', dueDate: 'Dec 21, 2021', complete: false },
        { id: 4, title: "Todo 4", description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot', dueDate: 'Feb 3, 2021', complete: false },
        { id: 5, title: "Todo 5", description: 'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, et', dueDate: 'Mar 7, 2021', complete: true },
        { id: 6, title: "Todo 6", description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated', dueDate: 'Jun 5, 2021', complete: true },
    ],
    user: {
        id: 1,
        username: 'Test'
    }
}

//reducer handles the actions sent by dispatchers to modify and return the state
const todos = (state = initialState, action) => {

    // console.log(state);
    let index;
    let newState;

    switch (action.type) {
        case 'ADD_TODO':
            let newTodo = {
                id: state.todoId++,
                title: action.payload,
                description: '',
                dueDate: '',
                complete: false
            }

            return {
                ...state,
                todos: [...state.todos, newTodo]
            }
        case 'DELETE_TODO':

            // findIndex takes a callback function to execute on each array until the function returns true
            //returns The index of the first element in the array that passes the test. Otherwise, -1.
            //for my use case I'm iterating over all the todos and if the todo.id equals the payload return the index
            index = state.todos.findIndex((todo) => todo.id == action.payload.id);

            //immutability helper allows to create copies of the state and mutate the data with the update() method
            //The $-prefixed keys are called commands. The data structure they are “mutating” is called the target.
            const newTodos = update(state, { todos: { $splice: [[index, 1]] } })

            return {
                ...state,
                ...newTodos
            }
        case 'COMPLETE_TODO':
            index = state.todos.findIndex((todo) => todo.id == action.payload.id);

            newState = update(state, {
                todos: {
                    [index]: {
                        complete: { $set: true }
                    }
                }
            });

            return {
                ...newState,
            }
        case 'MARK_PENDING_TODO':
            index = state.todos.findIndex((todo) => todo.id == action.payload.id);

            newState = update(state, {
                todos: {
                    [index]: {
                        complete: { $set: false }
                    }
                }
            });

            return {
                ...newState,
            }
        case 'TOGGLE_SHOWALL_TODOS':
            newState = update(state, {
                toggleShowAllTodos: { $set: !state.toggleShowAllTodos }
            })
            return {
                ...newState
            }
        case 'UPDATE_TODO':
            index = state.todos.findIndex((todo) => todo.id == action.payload.id);

            newState = update(state, {
                todos: { [index]: { $merge: action.payload } }
            })
            return {
                ...newState
            }

    }
    return state;
}

export default todos;