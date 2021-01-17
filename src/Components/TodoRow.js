import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

export default function Todo({ todo }) {
  const navigation = useNavigation();

  return (
    /* 1. Navigate to the route with params */
    <TouchableOpacity style={styles.rectButton}
      onPress={() => navigation.navigate('Todo', { todo: todo })}>

      <Text style={styles.fromText}> {todo.title}</Text>
      <Text numberOfLines={2} style={styles.messageText}>
        {todo.description}
      </Text>
      <Text style={styles.dateText}>
        Due: {todo.dueDate}
      </Text>
    </TouchableOpacity>
  );
}

Todo.PropTypes = {
  title: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});
