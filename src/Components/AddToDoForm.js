import React, { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import ButtonComponent from "./ButtonComponent";

export default function AddTodoForm() {

  //useState allows to hook into React State  
  //returns a stateful value and a function to update it
  //const [state, setState] = useState(initialState);

  const [showAddTodoForm, toggleAddTodoForm] = useState(false);

  const [newTodo, setNewTodo] = useState("");

  //useDispatch allows functional components to access the dispatch method 
  const dispatch = useDispatch();

  //to use the dispatch method, simply dispatch the action  type and payload
  const addTodo = (todo) => {
    toggleAddTodoForm(false);
    setNewTodo(" ");
    dispatch({ type: "ADD_TODO", payload: todo });
  }

  return (
    <View>
      {!showAddTodoForm && (
        <ButtonComponent
          text="Add Todo"
          color='white'
          onPress={() => toggleAddTodoForm(!showAddTodoForm)}
        />
      )}
      {showAddTodoForm && (
        <View style={styles.horizontalRow}>
          <ButtonComponent
            icon='close'
            color='red'
            onPress={() => toggleAddTodoForm(!showAddTodoForm)} />
          <TextInput
            type="text"
            style={styles.input}
            onChangeText={(e) => setNewTodo(e)}
            value={newTodo}
            onSubmitEditing={Keyboard.dismiss}
          />
          <ButtonComponent
            text="Add"
            color='white'
            onPress={() => addTodo(newTodo)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff",
    margin: 5,
  }
});
