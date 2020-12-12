import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

export default function Todo(props) {

  const dispatch = useDispatch();

  const deleteTodo = (index) => {
    dispatch({ type: 'DELETE_TODO', payload: index })
  }

  return (
    <View style={styles.todo}>
      <Button title="Delete" onPress={() => deleteTodo(props.index)} />
      <Text style={styles.todo}>
        {props.todo}
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
