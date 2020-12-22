import React from "react";
import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import Todo from "../Components/Todo";


export default function ToDoList(props) {
    
    const renderItem = ({ item }) => (
        <Todo todo={item} />
    );
    // console.log(todos);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={props.todos}
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
