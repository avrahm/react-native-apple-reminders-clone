import React from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import Todo from "../Components/Todo";

import Swipeout from 'react-native-swipeout';
import { useDispatch } from "react-redux";

export default function ToDoList(props) {

    //useDispatch is a hook method to create access to the dispatches available within a functional component instead of using mapDispatchToProps and a class component
    const dispatch = useDispatch();

    const deleteTodo = (todo) => {
        dispatch({ type: 'DELETE_TODO', payload: todo })
    }

    const completeTodo = (todo) => {
        dispatch({ type: 'COMPLETE_TODO', payload: todo });
    }

    const markPendingTodo = (todo) => {
        dispatch({ type: 'MARK_PENDING_TODO', payload: todo });
    }

    const renderItem = ({ item }) => {
        let swipeoutBtns = [
            {
                text: 'Complete',
                onPress: () => completeTodo(item),
                backgroundColor: 'green',
            },
            {
                text: 'Delete',
                onPress: () => deleteTodo(item),
                backgroundColor: 'red',
            }
        ]

        if (item.complete) {
            swipeoutBtns.splice(0, 1, {
                text: 'Set Pending',
                onPress: () => markPendingTodo(item),
                backgroundColor: 'blue'
            })
        }
        return (

            <Swipeout right={swipeoutBtns}>
                <Todo todo={item} />
            </Swipeout>
        )
    };
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={props.todos}
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
