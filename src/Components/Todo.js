import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

export default function Todo(props) {

  //useDispatch is a hook method to create access to the dispatches available within a functional component instead of using mapDispatchToProps and a class component
  const dispatch = useDispatch();

  const deleteTodo = (index) => {
    // console.log(props.todo)

    dispatch({ type: 'DELETE_TODO', payload: index })
  }

  return (
    <View style={styles.todo}>
      <Button title="Delete" onPress={() => deleteTodo(props.todo.id)} />
      <Text style={styles.todo}>
        {props.todo.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    alignItems: "center",
    flexDirection: "row",
    fontSize: 20,
  },
});
