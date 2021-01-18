import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ButtonComponent from '../Components/ButtonComponent';

export default function TodoScreen({ route, navigation }) {
    /* 2. Get the param from the route passed through navigation */
    const { todo } = route.params;

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


    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>{todo.title}</Text>
            <Text>{todo.dueDate}</Text>
            <Text>{todo.description}</Text>
            <View style={styles.horizontalRow}>
                <ButtonComponent
                    icon='trash'
                    onPress={() => deleteTodo(todo)}
                    color='red'
                />
                {!todo.complete ? (
                    <ButtonComponent
                        icon='checkmark'
                        color='black'
                        onPress={() => completeTodo(todo)}
                    />
                ) : (
                        <ButtonComponent
                            icon='checkmark'
                            color='green'
                            onPress={() => markPendingTodo(todo)}
                        />
                    )}

            </View>
        </View>
    );
}

TodoScreen.propTypes = {
    title: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

TodoScreen.defaultProp = {
    title: 'Title',
    description: 'Update description',
    dueDate: 'Set a date'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    horizontalRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
});

