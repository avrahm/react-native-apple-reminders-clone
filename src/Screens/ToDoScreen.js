import React, { useState } from "react";

import { Button, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import AddTodoForm from "../Components/AddToDoForm";
import ToDoList from "../Components/TodoList"
import { useDispatch, useSelector } from "react-redux";


export default function ToDoScreen () {

 const [showAddTodoForm, toggleAddTodoForm] = useState(false);

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.paragraph}>
          My First Todo Mobile App
          </Text>
        <Button
          title="Add Todo"
          onPress={() => {
            toggleAddTodoForm(!showAddTodoForm);
          }}
        />
        {showAddTodoForm && (
          <AddTodoForm />
        )}
        <ToDoList />
      </ScrollView>
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
