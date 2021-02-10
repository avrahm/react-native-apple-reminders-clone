import React from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import TodoRow from "./TodoRow";
import SwipeableRow from "./SwipeableRow";
import { completeTodos, dueTodayTodos, selectTodosByList } from '../redux/selectors/TodoSelectors';

export default function ToDoList(props) {
    //useSelector is a hooks method instead of mapStateToProps
    //Allows a functional component to hook into the state
    const toggleShowAllTodos = useSelector(state => state.todos.toggleShowAllTodos);

    let todos = useSelector(state => state.todos.todos);

    let todoData = selectTodosByList(todos, props.listId);
    if (props.listType === 'today') {
        todoData = dueTodayTodos(todos)
    }
    if (!toggleShowAllTodos) {
        todoData = completeTodos(todoData);
    }

    const renderItem = ({ item }) => {
        return (
            <SwipeableRow action='deleteTodo' id={item.id}>
                <TodoRow todo={item} />
            </SwipeableRow>
        )
    };
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={todoData}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#ecf0f1",
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    separator: {
        backgroundColor: 'rgb(200, 199, 204)',
        height: StyleSheet.hairlineWidth,
    },
});
