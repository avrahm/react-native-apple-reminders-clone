//https://www.digitalocean.com/community/tutorials/redux-reselect
//https://medium.com/@parkerdan/react-reselect-and-redux-b34017f8194c
//https://stackoverflow.com/questions/60187910/reselect-redux-with-react-hooks
//https://react-redux.js.org/next/api/hooks#useselector-examples
//https://github.com/reduxjs/reselect#accessing-react-props-in-selectors
//https://github.com/toomuchdesign/re-reselect
//https://www.youtube.com/watch?v=frT3to2ACCw&feature=share
//understanding reselect

import { formatDateWithDay } from "../../assets/utils/formatDate"

// import { createSelector } from 'reselect';

// const getVisibilityFilter = state => state.visibilityFilter

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

export const getAllLists = (state) => {
    return state.map(eaList => eaList.list)
}

export const getList = (state, listId) => {
    if (listId == undefined) return state
    return state.map(eaList => eaList.list).filter(eaList => eaList.id === listId)[0]
}

export const getListIndex = (state, listId) => {
    if (listId == undefined) return state
    return state.map(eaList => eaList.list).findIndex(eaListId => eaListId.id === listId)
}

export const getTodosByList = (state, listId) => {
    if (listId == undefined) return state
    let listIndex = getListIndex(state, listId)
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

export const getShowCompletedTasksStatusByList = (state, listId) => {
    if (listId == undefined) return state
    return state[getListIndex(state, listId)].showCompletedTasks
}

export const getCompleteTodos = (state) => {
    return state.filter(todo => !todo.complete);
}

export const getDueTodayTodos = (state) => {
    const data = getAllTodosWithoutList(state);
    return data.filter(eaTodo => eaTodo.dueDate == formatDateWithDay(new Date()));
}

export const inboxTodos = (state) => {
    return state.filter(todo => todo.listId === 0);
}

export const searchTodos = (state, searchText) => {
    if (searchText == undefined) return state
    return state.filter(eachTodo => {
        return (
            eachTodo.title.toLowerCase().includes(searchText.toLowerCase())
        );
    })
}

export const getSearchTodos = (state, searchTerm) => {
    if (searchTerm === '') return state
    return state.reduce((result, sectionData) => {
        if (!result || !sectionData) return state
        const { list, data } = sectionData;
        const filteredData = data.filter(element => { return element.title.toLowerCase().includes(searchTerm.toLowerCase()) }
        ).filter(element => !element.complete);
        if (filteredData.length !== 0) {
            result.push({
                list,
                data: filteredData
            });
        }
        return result;
    }, [])
}

export const getCompletedTodosFromAllTodos = (state) => {
    return state.reduce((result, sectionData) => {
        if (!result || !sectionData) return state
        const { list, data } = sectionData;
        const completeData = data.filter(element => !element.complete);
        if (completeData.length !== 0) {
            result.push({
                list,
                data: completeData
            });
        }
        return result;
    }, [])
}

export const starterList = {
    list: { id: 0, title: 'Inbox', icon: 'mail-outline', color: 'gray', listHidden: true },
    data: [],
    showCompletedTasks: false
}