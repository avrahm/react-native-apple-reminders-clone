

//https://www.digitalocean.com/community/tutorials/redux-reselect
//https://medium.com/@parkerdan/react-reselect-and-redux-b34017f8194c
//https://stackoverflow.com/questions/60187910/reselect-redux-with-react-hooks
//https://react-redux.js.org/next/api/hooks#useselector-examples
//https://github.com/reduxjs/reselect#accessing-react-props-in-selectors
//https://github.com/toomuchdesign/re-reselect
// https://www.youtube.com/watch?v=frT3to2ACCw&feature=share
//understanding reselect

import { createSelector } from 'reselect';

const getVisibilityFilter = state => state.visibilityFilter
const getTodos = state => state.todos

export const getVisibleTodos = createSelector(
    [getVisibilityFilter, getTodos],
    (visibilityFilter, todos) => {
        switch (visibilityFilter) {
            case 'SHOW_ALL':
                return todos
            case 'SHOW_COMPLETED':
                return todos.filter(t => t.complete)
            case 'SHOW_ACTIVE':
                return todos.filter(t => !t.complete)
        }
    }
)

export const selectTodosByList = (state, listId) => {
    if (listId === undefined) return state
    return state.filter(todo => todo.listId === listId)
}

export const completeTodos = (state) => {
    return state.filter(todo => !todo.complete);
}

export const dueTodayTodos = (state) => {
    return state.filter(todo => new Date(todo.dueDate).getDate() == new Date().getDate());
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