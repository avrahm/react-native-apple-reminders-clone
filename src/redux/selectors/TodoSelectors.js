

//https://www.digitalocean.com/community/tutorials/redux-reselect
//https://medium.com/@parkerdan/react-reselect-and-redux-b34017f8194c
//https://stackoverflow.com/questions/60187910/reselect-redux-with-react-hooks
//https://react-redux.js.org/next/api/hooks#useselector-examples
//https://github.com/reduxjs/reselect#accessing-react-props-in-selectors
//https://github.com/toomuchdesign/re-reselect
// https://www.youtube.com/watch?v=frT3to2ACCw&feature=share
//understanding reselect

import { formatDateWithDay, formatDateWithoutDay } from "../../assets/utils/formatDate"

// import { createSelector } from 'reselect';

// const getVisibilityFilter = state => state.visibilityFilter
// const getTodos = state => state.todos

// export const getVisibleTodos = createSelector(
//     [getVisibilityFilter, getTodos],
//     (visibilityFilter, todos) => {
//         switch (visibilityFilter) {
//             case 'SHOW_ALL':
//                 return todos
//             case 'SHOW_COMPLETED':
//                 return todos.filter(t => t.complete)
//             case 'SHOW_ACTIVE':
//                 return todos.filter(t => !t.complete)
//         }
//     }
// )

const getListIndex = (state, listId) => {
    return state.map(eaList => eaList.list).findIndex(eaListId => eaListId.id === listId)
}

export const getTodosByList = (state, listId) => {
    let listIndex = getListIndex(state, listId)

    if (listId === undefined) return state
    return state[listIndex].data;
}

export const getAllTodosWithoutList = (state) => {
    let allData = []
    state.map(eaList => {
        if (eaList.data) {
            eaList.data.map(eaTodo => {
                allData.push(eaTodo)
            })
        }
    })
    return allData;
}

export const getCompleteTodos = (state) => {

    return state.filter(todo => !todo.complete);
}

export const getDueTodayTodos = (state) => {
    const data = getAllTodosWithoutList(state);

    const todosDueTodayData = data.filter(eaTodo => eaTodo.dueDate == formatDateWithDay(new Date()));

    return todosDueTodayData;
}

export const inboxTodos = (state) => {
    return state.filter(todo => todo.listId === 0);
}

export const searchTodos = (state, searchText) => {
    return state.filter(eachTodo => {
        return (
            eachTodo.title.toLowerCase().includes(searchText.toLowerCase())
        );
    })
}

export const todosByListId = (state) => {
    return state.reduce((acc, value) => {
        // Group initialization
        if (!acc[value.listId]) {
            acc[value.listId] = [];
        }

        // Grouping
        acc[value.listId].push(value);

        return acc;
    }, {});
}