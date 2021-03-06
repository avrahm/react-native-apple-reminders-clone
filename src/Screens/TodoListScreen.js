import React, { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import {
    getCompletedTodosFromAllTodos, getCompleteTodos, getDueTodayTodos, getShowCompletedTasksStatusByList, getTodosByList, searchTodos,
} from '../redux/selectors/TodoSelectors';
import AddTodoForm from '../Components/AddToDoForm';
import ToDoList from '../Components/TodoList';

export default function ToDoScreen({ route, navigation }, props) {

    const { listId } = route.params;
    const { listType } = route.params;

    // setParams/setOptions etc. should only be called in useEffect/useLayoutEffect/componentDidMount/componentDidUpdate etc. Not during render or in constructor.
    // https://github.com/react-navigation/react-navigation/issues/8621
    useEffect(() => {

        if (listType == 'all' || listType == 'today') {

            navigation.setOptions({
                headerRight: '',
            });

        } else if (listId == 0) {

            navigation.setOptions({
                headerRight: () => (
                    <Button
                        title="Menu"
                        onPress={() => navigation.navigate('ModalListScreen',
              {
                showEditListOptionsMenu: true,
                allowToModifyList: false,
                listId: route.params.listId,
                title: 'List Menu',
              })}
                    />
                ),
            });

        } else {

            navigation.setOptions({
                headerRight: () => (
                    <Button
                        title="Menu"
                        onPress={() => navigation.navigate('ModalListScreen',
              {
                showEditListOptionsMenu: true,
                allowToModifyList: true,
                listId: route.params.listId,
                title: 'List Menu',
              })}
                    />
                ),
            });

        }

    }, [listType]);

    // useSelector is a hooks method instead of mapStateToProps
    // Allows a functional component to hook into the state

    const getAllTodos = useSelector(state => state.todoState.todoLists);
    let showCompletedTasksStatus;
    let todoData;

    switch (listType) {
    case 'today':
        todoData = getDueTodayTodos(getAllTodos);
        break;
    case 'all':
        todoData = getCompletedTodosFromAllTodos(getAllTodos);
        break;
    default:
        showCompletedTasksStatus = getShowCompletedTasksStatusByList(getAllTodos, listId);
        todoData = getTodosByList(getAllTodos, listId);
        break;
    }
    if (!showCompletedTasksStatus && (listType != 'all' || listType != 'today')) {

        todoData = getCompleteTodos(todoData);

    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <ToDoList todoData={todoData} listType={listType} />
            </View>
            <AddTodoForm listId={listId} listType={listType} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
