/* eslint-disable default-case */
import update from 'immutability-helper';
import { formatDateWithDay, formatDateWithTime } from '../../assets/utils/formatDate';
import { getListIndex, getTodosByList, starterList } from '../selectors/TodoSelectors';
// immutability-helper
// https://reactjs.org/docs/update.html

import * as t from '../actions/TodoActions';

const testDueTodayDate = formatDateWithDay(new Date());
const now = formatDateWithTime(new Date());

// create the initial state of the app
const initialState = {
    todoId: 15,
    listId: 3,
    lastUpdatedAt: '',
    toggleShowAllTodos: false,
    toggleShowSearchResults: false,
    todoLists: [
        {
            list: {
                id: 0, title: 'Inbox', icon: 'mail-outline', color: 'gray', listHidden: true,
            },
            data: [
                // { id: 1, title: "Thing to do", description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et', dueDate: testDueTodayDate, complete: false, listId: 0 },
                // { id: 2, title: "Homework", description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab', dueDate: '', complete: false, listId: 0 },
                // { id: 11, title: "Get this done", description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated', dueDate: '', complete: true, listId: 0 },
            ],
            showCompletedTasks: false,
        },
        //  {
        //     list: { id: 1, title: 'Groceries', icon: 'basket-outline', color: 'green', listHidden: false },
        //     data: [
        //         { id: 3, title: "Haircut", description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born', dueDate: testDueTodayDate, complete: false, listId: 1 },
        //         { id: 4, title: "Call Place", description: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot', dueDate: '', complete: false, listId: 1 },
        //     ],
        //     showCompletedTasks: false
        // }, {
        //     list: { id: 2, title: 'Travel', icon: 'airplane', color: 'blue', listHidden: false },
        //     data: [
        //         { id: 5, title: "Something else", description: 'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, et', dueDate: testDueTodayDate, complete: false, listId: 2 },
        //         { id: 6, title: "Get this done", description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated', dueDate: '', complete: true, listId: 2 },
        //         { id: 7, title: "Something else", description: 'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, et', dueDate: 'Mar 7, 2020', complete: false, listId: 2 },
        //         // { id: 8, title: "Get this done", description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated', dueDate: '', complete: true, listId: 2 },
        //         // { id: 9, title: "Something else", description: 'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, et', dueDate: '', complete: true, listId: 2 },
        //         // { id: 10, title: "Get this done", description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated', dueDate: '', complete: false, listId: 2 },
        //     ],
        //     showCompletedTasks: false
        // }
    ],
};

// reducer handles the actions sent by dispatchers to modify and return the state
const todoReducer = (state = initialState, action) => {
    let todoIndex;
    let newState;
    let listIndex;
    let newList;
    let newTodo;
    let todoData;
    let newListId;
    let newTodoId;

    switch (action.type) {
        case t.ADD_TODO:
            newTodoId = ++state.todoId;
            listIndex = state.todoLists.map(eaList => eaList.list).findIndex(eaListc => eaListc.id === action.payload.listId);
            newTodo = {
                id: action.payload.id || newTodoId,
                title: action.payload.title,
                description: action.payload.description || '',
                dueDate: action.payload.dueDate || '',
                listId: action.payload.listId || 0,
                complete: action.payload.complete || false,
            };
            newState = update(state, {
                lastUpdatedAt: { $set: new Date() },
                todoLists: {
                    [listIndex]: {
                        data: {
                            $push: [newTodo],
                        },
                    },
                },
            });

            return {
                ...newState,
            };
        case t.UPDATE_TODO:
            listIndex = getListIndex(state.todoLists, action.payload.listId);
            todoData = getTodosByList(state.todoLists, action.payload.listId);
            todoIndex = todoData.findIndex(todo => todo.id === action.payload.id);

            newState = update(state, {
                lastUpdatedAt: { $set: new Date() },
                todoLists: {
                    [listIndex]: {
                        data: {
                            [todoIndex]: {
                                $set: action.payload,
                            },
                        },
                    },
                },
            });
            return {
                ...newState,
            };
        case t.DELETE_TODO:

            listIndex = getListIndex(state.todoLists, action.payload.listId);
            todoData = getTodosByList(state.todoLists, action.payload.listId);
            todoIndex = todoData.findIndex(todo => todo.id === action.payload.id);

            newState = update(state, {
                lastUpdatedAt: { $set: new Date() },
                todoLists: {
                    [listIndex]: {
                        data: {
                            $splice:
                                [[todoIndex, 1]],
                        },
                    },
                },
            });

            return {
                ...newState,
            };
        case t.COMPLETE_TODO:
            listIndex = getListIndex(state.todoLists, action.payload.listId);
            todoData = getTodosByList(state.todoLists, action.payload.listId);
            todoIndex = todoData.findIndex(todo => todo.id === action.payload.id);

            newState = update(state, {
                lastUpdatedAt: { $set: new Date() },
                todoLists: {
                    [listIndex]: {
                        data: {
                            [todoIndex]: {
                                complete: { $set: true },
                                dueDate: { $set: '' },
                            },
                        },
                    },
                },
            });

            return {
                ...newState,
            };
        case t.MARK_TODO_PENDING:
            listIndex = getListIndex(state.todoLists, action.payload.listId);
            todoData = getTodosByList(state.todoLists, action.payload.listId);
            todoIndex = todoData.findIndex(todo => todo.id === action.payload.id);

            newState = update(state, {
                lastUpdatedAt: { $set: new Date() },
                todoLists: {
                    [listIndex]: {
                        data: {
                            [todoIndex]: {
                                complete: { $set: false },
                            },
                        },
                    },
                },
            });

            return {
                ...newState,
            };
        case t.ADD_LIST:
            ++state.listId;
            newList = {
                list: {
                    id: action.payload.id || state.listId,
                    title: action.payload.title,
                    icon: action.payload.icon,
                    color: action.payload.color,
                    listHidden: false,
                    showCompletedTasks: false,
                },
                data: [],
            };
            newState = update(state, {
                lastUpdatedAt: { $set: new Date() },
                todoLists: {
                    $push: [newList],
                },
            });
            return {
                ...newState,
            };
        case t.UPDATE_LIST:
            listIndex = getListIndex(state.todoLists, action.payload.id);
            newState = update(state, {
                lastUpdatedAt: { $set: new Date() },
                todoLists: {
                    [listIndex]: {
                        list: { $set: action.payload },
                    },
                },
            });
            return {
                ...newState,
            };
        case t.DELETE_LIST:
            listIndex = getListIndex(state.todoLists, action.payload.id);
            newState = update(state, {
                lastUpdatedAt: { $set: new Date() },
                todoLists: {
                    $splice: [[listIndex, 1]],
                },
            });
            return {
                ...newState,
            };
        case t.TOGGLE_SHOWALL_TODOS:
            listIndex = getListIndex(state.todoLists, action.payload);

            newState = update(state, {
                todoLists: {
                    [listIndex]: {
                        showCompletedTasks: {
                            $set: !state.todoLists[listIndex].showCompletedTasks,
                        },
                    },
                },
            });
            return {
                ...newState,
            };
        case t.TOGGLE_SHOW_SEARCH_RESULTS:
            newState = update(state, {
                toggleShowSearchResults: { $set: action.payload },
            });
            return {
                ...newState,
            };
        case t.GET_DATA:
            // console.log(...state.todoLists);
            return [...state.todoLists];
            // break;
        case t.LOAD_DATA:
            newState = update(state, {
                lastUpdatedAt: { $set: new Date() },
                $merge: { todoLists: action.payload.tasks },
            });
            return {
                ...newState,
            };
        case t.CLEAR_DATA:
            newState = update(state, {
                lastUpdatedAt: { $set: new Date() },
                $merge: {
                    todoLists: [starterList],
                },
            });
            return {
                ...newState,
            };
    }
    return state;
};

export default todoReducer;
