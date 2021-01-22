import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Button, Switch } from 'react-native';
import { useDispatch } from 'react-redux';
import ButtonComponent from '../Components/ButtonComponent';

export default function TodoScreen({ route, navigation }) {
    /* 2. Get the param from the route passed through navigation */
    const { todo } = route.params;

    //use state to edit the todo object received from params
    const [editableTodo, updateEditableTodo] = useState(todo);

    const [dueDateEnabled, toggleDueDateEnabled] = useState(todo.dueDate && true)

    const dispatch = useDispatch();

    const deleteTodo = (todo) => {
        dispatch({ type: "DELETE_TODO", payload: todo });
        navigation.goBack();
    }

    const completeTodo = (todo) => {
        dispatch({ type: "COMPLETE_TODO", payload: todo });
        navigation.goBack();
    }

    const markPendingTodo = (todo) => {
        dispatch({ type: "MARK_PENDING_TODO", payload: todo });
        navigation.goBack();
    }

    const updateTodo = (todo) => {
        dispatch({ type: "UPDATE_TODO", payload: todo });
        navigation.goBack();
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <Button title='Done' onPress={() =>
                    updateTodo(editableTodo)} />,
        });
    }, [editableTodo])

    return (
        <View style={styles.container}>
            <View style={styles.cardView}>
                <TextInput style={styles.paragraph}
                    value={editableTodo.title}
                    onChangeText={(e) => updateEditableTodo({
                        ...editableTodo,
                        title: e
                    })}
                    placeholder={'Title'}
                />
            </View>
            <View style={styles.cardView}>
                <TextInput
                    multiline={true}
                    numberOfLines={5}
                    value={editableTodo.description}
                    onChangeText={(e) => updateEditableTodo({
                        ...editableTodo,
                        description: e
                    })}
                    placeholder={'Description'}
                    onFocus={() => { }}
                />
            </View>
            <View style={[styles.cardView,
            { justifyContent: 'space-between', alignItems: 'center' }]}>
                <ButtonComponent icon='calendar' disable={true} />
                <TextInput style={[styles.paragraph]}
                    value={editableTodo.dueDate}
                    onChangeText={(e) => updateEditableTodo({
                        ...editableTodo,
                        dueDate: e
                    })}
                />
                <Switch onValueChange={() => { toggleDueDateEnabled(!dueDateEnabled) }} value={dueDateEnabled} />
            </View>
            <View style={styles.cardView}>
                <ButtonComponent
                    icon='trash'
                    onPress={() => deleteTodo(editableTodo)}
                    color='red'
                />
                {!todo.complete ? (
                    <ButtonComponent
                        icon='checkmark'
                        color='black'
                        onPress={() => completeTodo(editableTodo)}
                    />
                ) : (
                        <ButtonComponent
                            icon='checkmark'
                            color='green'
                            onPress={() => markPendingTodo(editableTodo)}
                        />
                    )}

            </View>
        </View>
    );
}

// TodoScreen.propTypes = {
//     title: PropTypes.string.isRequired,
//     dueDate: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired
// }

// TodoScreen.defaultProp = {
//     title: 'Title',
//     description: 'Update description',
//     dueDate: 'Set a date'
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 8,
    },
    paragraph: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cardView: {
        flexDirection: "row",
        borderWidth: 1,
        textAlign: "left",
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 15,
        margin: 3,
    }
});

