import React from "react";
import { StyleSheet, View } from "react-native";

import AddTodoForm from "../Components/AddToDoForm";
import ToDoList from "../Components/TodoList";

export default function ToDoScreen({ route }) {

  const listId = route.params.listId;
  const listType = route.params.listType;

  return (
    <View style={styles.container}>
      <AddTodoForm listId={listId} listType={listType} />
      <ToDoList listId={listId} listType={listType} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
