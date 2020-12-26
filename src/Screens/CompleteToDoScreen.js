import React from "react";

import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
// import AddTodoForm from "../Components/AddToDoForm";
import ToDoList from "../Components/TodoList"
import { useSelector } from "react-redux";

export default function CompleteToDoScreen() {
  //useSelector is a hooks method instead of mapStateToProps
  //Allows a functional component to hook into the state
  const todos = useSelector(state => state.todos);
  const completeTodos = todos.filter(todos => todos.complete === true);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Completed Todos
          </Text>
      <ToDoList todos={completeTodos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
