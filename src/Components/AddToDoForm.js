import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View, TextInput } from "react-native";

import { useDispatch } from "react-redux";
import { formatDate } from "../assets/utils/formatDate";
import ButtonComponent from "./ButtonComponent";

export default function AddTodoForm(props) {

  //useState allows to hook into React State  
  //returns a stateful value and a function to update it
  //const [state, setState] = useState(initialState);

  const [showAddTodoForm, toggleAddTodoForm] = useState(false);

  let setDueDate;

  if (showAddTodoForm) {
    setDueDate = formatDate(new Date())
    setDueDate = props.listType === "today" ? setDueDate : "";
    // console.log(setDueDate);
  }

  useEffect(() => {
    setNewTodo({
      ...newTodo,
      dueDate: setDueDate
    })
  }, [showAddTodoForm])

  const [newTodo, setNewTodo] = useState({
    title: '',
    listId: props.listId || 0,
    dueDate: setDueDate || ''
  });



  //useDispatch allows functional components to access the dispatch method 
  const dispatch = useDispatch();

  //to use the dispatch method, simply dispatch the action  type and payload
  const addTodo = (todo) => {
    if (newTodo.title != '') {
      toggleAddTodoForm(false);
      setNewTodo({ title: '', listId: props.listId || 0 });
      dispatch({ type: "ADD_TODO", payload: todo });
      Keyboard.dismiss
    } else {
      Keyboard.dismiss
    }
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
            onChangeText={(e) => setNewTodo({
              ...newTodo,
              title: e
            })}
            autoFocus={true}
            value={props.listId}
            onSubmitEditing={() => addTodo(newTodo)}
          />
          <ButtonComponent
            text="Add"
            color='white'
            onPress={() => addTodo(newTodo)}
            disable={newTodo.title === '' && true}
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
