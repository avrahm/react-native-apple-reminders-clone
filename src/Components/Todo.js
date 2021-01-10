import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function Todo(props) {

  //useDispatch is a hook method to create access to the dispatches available within a functional component instead of using mapDispatchToProps and a class component
  const dispatch = useDispatch();

  const deleteTodo = (todo) => {
    dispatch({ type: 'DELETE_TODO', payload: todo })
  }

  const completeTodo = (todo) => {
    dispatch({ type: 'COMPLETE_TODO', payload: todo });
  }

  const markPendingTodo = (todo) => {
    dispatch({ type: 'MARK_PENDING_TODO', payload: todo });
  }

  return (
    <View style={styles.todo}>
      <Button title="Delete" onPress={() => deleteTodo(props.todo)} />
      <Text>
        {props.todo.title}
      </Text>
      {!props.todo.complete ?
        (
          <Button title="Complete" onPress={() => completeTodo(props.todo)} />
        ) :
        (
          <Button title="Mark Pending" onPress={() => markPendingTodo(props.todo)} />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    alignItems: "center",
    flexDirection: "row",
    fontSize: 25,
    justifyContent: "space-around",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10
  },

});
