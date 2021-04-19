// https://www.digitalocean.com/community/tutorials/redux-reselect
// https://medium.com/@parkerdan/react-reselect-and-redux-b34017f8194c
// https://stackoverflow.com/questions/60187910/reselect-redux-with-react-hooks
// https://react-redux.js.org/next/api/hooks#useselector-examples
// https://github.com/reduxjs/reselect#accessing-react-props-in-selectors
// https://github.com/toomuchdesign/re-reselect
// https://www.youtube.com/watch?v=frT3to2ACCw&feature=share
// https://www.npmjs.com/package/reselect
// understanding reselect

import { formatDateWithDay } from '../../assets/utils/formatDate';
// import { createSelector } from 'reselect';

export const starterList = {
    list: {
        id: 0, title: 'Inbox', icon: 'mail-outline', color: 'gray', listHidden: true,
    },
    data: [],
    showCompletedTasks: false,
};

export const getAllLists = (state = { starterList }) => {
    if (state === undefined) return [];
    return state.map(eaList => eaList.list);
};

export const getList = (state = starterList, listId) => {
    if (listId === undefined) return state;
    return state.map(eaList => eaList.list).filter(eaList => eaList.id === listId)[0];
};

export const getListIndex = (state = starterList, listId) => {
    if (listId === undefined) return state;
    return state.map(eaList => eaList.list).findIndex(eaListId => eaListId.id === listId);
};

export const getTodosByList = (state = starterList, listId) => {
    if (state === undefined) return 0;
    if (listId === undefined) return state;
    const listIndex = getListIndex(state, listId);
    return state[listIndex].data;
};

export const getAllTodosWithoutList = (state = starterList) => {
    if (state === undefined) return 0;
    const data = [];
    state.map(eaList => {
        if (eaList.data.length > 0) {
            eaList.data.map(eaTodo => {
                data.push(eaTodo);
            });
        }
    });
    return data;
    // return state;
};

export const getShowCompletedTasksStatusByList = (state = starterList, listId) => {
    if (listId === undefined) return state;
    return state[getListIndex(state, listId)].showCompletedTasks;
};

export const getCompleteTodos = (state = starterList) => state.filter(todo => !todo.complete);

export const getDueTodayTodos = (state = starterList) => {
    if (state === undefined) return 0;
    const data = getAllTodosWithoutList(state);
    return data.filter(eaTodo => eaTodo.dueDate === formatDateWithDay(new Date()));
};

export const inboxTodos = (state = starterList) => state.filter(todo => todo.listId === 0);

export const searchTodos = (state = starterList, searchText) => {
    if (searchText === undefined) return state;
    return state.filter(eachTodo => (
        eachTodo.title.toLowerCase().includes(searchText.toLowerCase())
    ));
};

export const getSearchTodos = (state = starterList, searchTerm) => {
    if (searchTerm === '') return state;
    return state.reduce((result, sectionData) => {
        if (!result || !sectionData) return state;
        const { list, data } = sectionData;
        const filteredData = data.filter(element => element.title.toLowerCase().includes(searchTerm.toLowerCase())).filter(element => !element.complete);
        if (filteredData.length !== 0) {
            result.push({
                list,
                data: filteredData,
            });
        }
        return result;
    }, []);
};

export const getCompletedTodosFromAllTodos = (state = starterList) => state.reduce((result, sectionData) => {
    if (!result || !sectionData) return state;
    const { list, data } = sectionData;
    const completeData = data.filter(element => !element.complete);
    if (completeData.length !== 0) {
        result.push({
            list,
            data: completeData,
        });
    }
    return result;
}, []);
