import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

export default function AddTodoForm(props) {
  const [newTodo, setNewTodo] = useState("");

  //use dispatch allows functional components to access the dispatch method 
  const dispatch = useDispatch();

  //to use the dispatch method, simply dispatch the type and payload
  const addTodo = (todo) => dispatch({ type: "ADD_TODO", payload: todo })

  return (
    <View style={styles.todoForm}>
      <TextInput
        type="text"
        style={{ width: 200, borderWidth: 1 }}
        onChangeText={(e) => setNewTodo(e)}
        value={newTodo}
      />
      <Button
        title="Add"
        onPress={() => {
          addTodo(newTodo);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  todoForm: {
    flexDirection: "row",
    marginLeft: 30,
  }
});
