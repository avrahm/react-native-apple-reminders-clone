import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
// import Constants from "expo-constants";

import AddTodoForm from "../Components/AddToDoForm";
import ToDoList from "../Components/TodoList";

export default function ToDoScreen() {
  //useSelector is a hooks method instead of mapStateToProps
  //Allows a functional component to hook into the state
  const todos = useSelector(state => state.todos.todos);
  const pendingTodos = todos.filter(todos => todos.complete === false);

  const toggleShowAllTodos = useSelector(state => state.todos.toggleShowAllTodos)

  return (
    <View style={styles.container}>
      <AddTodoForm />
      <ToDoList todos={!toggleShowAllTodos ? pendingTodos : todos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    // margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
