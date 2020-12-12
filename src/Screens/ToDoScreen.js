import React from "react";

import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import AddTodoForm from "../Components/AddToDoForm";
import ToDoList from "../Components/TodoList"

export default function ToDoScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        My First Todo Mobile App
          </Text>
      <AddTodoForm />
      <ToDoList />
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
