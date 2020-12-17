import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

export default function AddTodoForm() {

  const [showAddTodoForm, toggleAddTodoForm] = useState(false);

  const [newTodo, setNewTodo] = useState("");

  //use dispatch allows functional components to access the dispatch method 
  const dispatch = useDispatch();

  //to use the dispatch method, simply dispatch the action  type and payload
  const addTodo = (todo) => {
    toggleAddTodoForm(false);
    setNewTodo(" ");
    dispatch({ type: "ADD_TODO", payload: todo });
  }

  return (
    <View>
      <Button
        title="Add Todo"
        onPress={() => {
          toggleAddTodoForm(!showAddTodoForm);
        }}
      />
      { showAddTodoForm && (
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
        </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  todoForm: {
    flexDirection: "row",
    marginLeft: 30,
  }
});
