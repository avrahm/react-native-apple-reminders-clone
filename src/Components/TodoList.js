import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Constants from "expo-constants";
import TodoRow from "./TodoRow";
import SwipeableRow from "./SwipeableRow";

export default function ToDoList(props) {

    const renderItem = ({ item }) => {
        return (
            <SwipeableRow action='deleteTodo' id={item.id}>
                <TodoRow todo={item} />
            </SwipeableRow>
        )
    };
    return (
        <FlatList
            data={props.todoData}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={item => item.id.toString()}
        />
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
