import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function TodoScreen({ route }) {
    /* 2. Get the param from the route passed through navigation */
    const { todo } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>{todo.title}</Text>
            <Text>{todo.dueDate}</Text>
            <Text>{todo.description}</Text>
        </View>
    );
}

TodoScreen.PropTypes = {
    title: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
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
});

