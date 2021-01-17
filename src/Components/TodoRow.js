import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Todo(props) {
  const navigation = useNavigation();
  return (
    /* 1. Navigate to the route with params */
    <TouchableOpacity style={styles.rectButton}
      onPress={() => navigation.navigate('Todo', { todo: props.todo })}>
      <Text style={styles.fromText}> {props.todo.title}</Text>
      <Text numberOfLines={2} style={styles.messageText}>
        {props.todo.description}
    </Text>
      <Text style={styles.dateText}>
        Due: {props.todo.dueDate}
      </Text>
    </TouchableOpacity>
  );
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
