import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements'
import { useDispatch } from 'react-redux';
import { COMPLETE_TODO, MARK_TODO_PENDING } from '../redux/actions/TodoActions';

export default function TodoRow({ todo }) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const dispatchAction = (action) => {
    switch (action) {
      case 'complete':
        todo.dueDate = '';
        dispatch({ type: COMPLETE_TODO, payload: todo });
        break;
      case 'pending':
        dispatch({ type: MARK_TODO_PENDING, payload: todo });
        break;
    }
  };

  const dueDateGetTime = todo.dueDate && new Date(todo.dueDate);
  const nowGetTime = new Date();

  return (
    /* 1. Navigate to the route with params */
    <TouchableOpacity style={[styles.rectButton]}
      onPress={() => navigation.navigate('TodoScreen', { todo: todo, name: todo.title })}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
          center
          checkedIcon='check-circle'
          uncheckedIcon={todo.dueDate ? (dueDateGetTime > nowGetTime ? 'circle-o' : 'frown-o') : 'circle-o'}
          checked={todo.complete}
          onPress={() => dispatchAction(todo.complete ? 'pending' : 'complete')}
        />
        <View>
          <Text style={styles.fromText}> {todo.title}</Text>
        </View>
      </View>

      {!todo.dueDate || (
        <Text style={styles.dateText}>
          Due: {todo.dueDate}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: '#fff',
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
