import update from 'immutability-helper';
import { formatDateWithDay } from '../../assets/utils/formatDate';
import { getListIndex, getTodosByList } from '../selectors/TodoSelectors';
//immutability-helper
//https://reactjs.org/docs/update.html

let testDueTodayDate = formatDateWithDay(new Date())

//create the initial state of the app
const initialState = {
    todoId: 15,
    toggleShowAllTodos: false,
    toggleShowSearchResults: false,
    todoLists: [
        {
            list: { id: 0, title: 'Inbox', icon: 'mail-outline', color: 'gray', listHidden: true, showAllTodos: false },
            data: [
                { id: 1, title: "Thing to do", description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et', dueDate: testDueTodayDate, complete: false, listId: 0 },
                // { id: 2, title: "Homework", description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab', dueDate: '', complete: false, listId: 0 },
                // { id: 11, title: "Get this done", description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated', dueDate: '', complete: true, listId: 0 },
            ],
            showAllTodos: false
        }, {
            list: { id: 1, title: 'Groceries', icon: 'basket-outline', color: 'green', listHidden: false, showAllTodos: false },
            data: [
                { id: 3, title: "Haircut", description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born', dueDate: testDueTodayDate, complete: false, listId: 1 },
                // { id: 4, title: "Call Place", description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot', dueDate: '', complete: false, listId: 1 },
            ],
            showAllTodos: false
        }, {
            list: { id: 2, title: 'Travel', icon: 'airplane', color: 'blue', listHidden: false, showAllTodos: false },
            data: [
                { id: 5, title: "Something else", description: 'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, et', dueDate: testDueTodayDate, complete: false, listId: 2 },
                { id: 6, title: "Get this done", description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated', dueDate: '', complete: true, listId: 2 },
                { id: 7, title: "Something else", description: 'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, et', dueDate: 'Mar 7, 2020', complete: false, listId: 2 },
                // { id: 8, title: "Get this done", description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated', dueDate: '', complete: true, listId: 2 },
                // { id: 9, title: "Something else", description: 'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, et', dueDate: '', complete: true, listId: 2 },
                // { id: 10, title: "Get this done", description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated', dueDate: '', complete: false, listId: 2 },
            ],
            showAllTodos: false
        }
    ],
}

//reducer handles the actions sent by dispatchers to modify and return the state
const todoLists = (state = initialState, action) => {

    let todoIndex;
    let newState;
    let listIndex;
    let list;
    let todoData;

    switch (action.type) {
        case 'LIST_ADD_TODO':
            listIndex = state.todoLists.map(eaList => eaList.list).findIndex(eaListc => eaListc.id === action.payload.listId)
            let newTodo = {
                id: state.todoId++,
                title: action.payload.title,
                description: '',
                dueDate: action.payload.dueDate || '',
                // listId: action.payload.listId || 0,
                complete: false
            }
            newState = update(state, {
                todoLists: {
                    [listIndex]: {
                        data: {
                            $push: [newTodo]
                        }
                    }
                }
            });

            return {
                ...newState
            }

        case 'LIST_UPDATE_TODO':

            console.log('payload listId', action);
            listIndex = getListIndex(state.todoLists, action.payload.listId)
            console.log('listIndex', listIndex);
            todoData = getTodosByList(state.todoLists, action.payload.listId)
            console.log('todoData', todoData);
            todoIndex = todoData.findIndex((todo) => todo.id == action.payload.id);
            console.log('todoIndex', todoIndex);

            newState = update(state, {
                todoLists: {
                    [listIndex]: {
                        data: {
                            [todoIndex]: {
                                $set:
                                    action.payload
                            }
                        }
                    }
                }
            })

            console.log({ ...newState });
            return {
                ...newState
            }
        case 'LIST_DELETE_TODO':

            listIndex = getListIndex(state.todoLists, action.payload.listId)
            todoData = getTodosByList(state.todoLists, action.payload.listId)
            todoIndex = todoData.findIndex((todo) => todo.id == action.payload.id);

            newState = update(state, {
                todoLists: {
                    [listIndex]: {
                        data: {
                            $splice:
                                [[todoIndex, 1]]
                        }
                    }
                }
            })



            return {
                ...newState
            }
    }
    return state;
}

export default todoLists;