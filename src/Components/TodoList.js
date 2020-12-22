import React from "react";
import { useSelector } from 'react-redux';
import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import Todo from "../Components/Todo";


export default function ToDoList() {
    //useSelector is a hooks method instead of mapStateToProps
    //Allows a functional component to hook into the state
    const todos = useSelector(state => state.todos);
    const renderItem = ({ item }) => (
        <Todo todo={item} />
    );
    // console.log(todos);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={todos}
                renderItem={renderItem}
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
});
