import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getSearchTodos } from '../redux/selectors/TodoSelectors';
import { toggleShowSearchResults } from '../redux/actions/TodoActions'
import ToDoList from './TodoList';

export default function SearchBarComponent() {

    const dispatch = useDispatch();

    const [searchBarText, setsearchBarText] = useState('');
    const getToggleShowSearchResults = useSelector(state => state.todoLists.toggleShowSearchResults)
    const getAllTodos = useSelector(state => state.todoLists.todoLists);

    useEffect(() => {
        dispatch(toggleShowSearchResults(searchBarText != '' ? true : false))
    }, [searchBarText])

    let todoData = getSearchTodos(getAllTodos, searchBarText);

    return (
        <View>
            <SearchBar
                lightTheme={true}
                placeholder='Search'
                onChangeText={(e) => setsearchBarText(e)}
                value={searchBarText}
            />
            {getToggleShowSearchResults && (
                <ToDoList todoData={todoData} listType='searchResults' />
            )}
        </View>
    )
}