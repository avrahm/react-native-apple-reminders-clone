import React from "react";
import { StyleSheet, View, FlatList, Text, SectionList } from "react-native";
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
        <View>
            {(props.listType === "all" || props.listType == "searchResults") ? (
                <SectionList
                    sections={props.todoData.filter(list => list.data.length > 0)}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    keyExtractor={item => item.id.toString()}
                    renderSectionHeader={({ section: { list } }) => (
                        <Text style={styles.header}>{list.title}</Text>
                    )}
                />
            ) : (
                    <FlatList
                        data={props.todoData}
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        keyExtractor={item => item.id.toString()}
                    />
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ecf0f1",
        // padding: 8,
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
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
});
