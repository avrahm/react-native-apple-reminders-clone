import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { completeTodos, searchTodos, todosByListId } from '../redux/selectors/TodoSelectors';
import ToDoList from './TodoList';

export default function SearchBarComponent() {

    const [searchBarText, setsearchBarText] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (searchBarText != '') {
            dispatch({ type: 'TOGGLE_SHOW_SEARCH_RESULTS', payload: true })
        } else {
            dispatch({ type: 'TOGGLE_SHOW_SEARCH_RESULTS', payload: false })
        }
    }, [searchBarText])

    const toggleShowSearchResults = useSelector(state => state.todos.toggleShowSearchResults)

    let getTodos = completeTodos(useSelector(state => state.todos.todos));
    let todoData = searchTodos(getTodos, searchBarText);
    return (
        <View>
            <SearchBar
                lightTheme={true}
                placeholder='Search'
                onChangeText={(e) => setsearchBarText(e)}
                value={searchBarText}
            />
            {toggleShowSearchResults && (
                <ToDoList todoData={todoData} />
            )}
        </View>
    )
}
