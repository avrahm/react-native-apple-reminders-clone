import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements'
import { useDispatch } from 'react-redux';

export default function TodoRow({ todo }) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const dispatchAction = (action) => {
    switch (action) {
      case 'complete':
        dueDate = '';
        dispatch({ type: 'COMPLETE_TODO', payload: todo });
        break;
      case 'pending':
        dispatch({ type: 'MARK_PENDING_TODO', payload: todo });
        break;
    }
  };

  let dueDate = todo.dueDate;
  const dueDateGetTime = new Date(dueDate).getTime()
  const nowGetTime = new Date().getTime()

  return (
    /* 1. Navigate to the route with params */
    <TouchableOpacity style={[styles.rectButton]}
      onPress={() => navigation.navigate('TodoScreen', { todo: todo, name: todo.title })}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
          center
          checkedIcon='check-circle'
          uncheckedIcon={dueDate ? (dueDateGetTime > nowGetTime ? 'circle-o' : 'frown-o') : 'circle-o'}
          checked={todo.complete}
          onPress={() => dispatchAction(todo.complete ? 'pending' : 'complete')}
        />
        <View>
          <Text style={styles.fromText}> {todo.title}</Text>
        </View>
      </View>

      {/* <Text numberOfLines={2} style={styles.messageText}>
        {todo.description}
      </Text> */}
      {!todo.dueDate || (
        <Text style={styles.dateText}>
        Due: {todo.dueDate}
      </Text>
      )}
    </TouchableOpacity>
  );
}

// TodoRow.propTypes = {
//   title: PropTypes.string.isRequired,
//   dueDate: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired
// }

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
