import React from "react";
import { SectionList, StyleSheet, Text, View, ScrollView, Platform, } from "react-native";
import { useSelector } from "react-redux";

import AddTodoForm from "../Components/AddToDoForm";
import SwipeableRow from "../Components/SwipeableRow";
import ToDoList from "../Components/TodoList";
import TodoRow from "../Components/TodoRow";

import { getCompleteTodos, getDueTodayTodos, getTodosByList, searchTodos } from '../redux/selectors/TodoSelectors';

export default function ToDoScreen({ route }, props) {

  const listId = route.params.listId;
  const listType = route.params.listType;

  //useSelector is a hooks method instead of mapStateToProps
  //Allows a functional component to hook into the state
  // const toggleShowAllTodos = useSelector(state => state.todos.toggleShowAllTodos);
  let getTodos = useSelector(state => state.todos.todos);
  let getAllTodos = useSelector(state => state.todoLists.todoLists);
  let todoData;

  switch (listType) {
    case 'today':
      todoData = getDueTodayTodos(getAllTodos)
      break;
    case 'all':
      todoData = getAllTodos
      // console.log(getAllTodos)
      break;
    default:
      todoData = getTodosByList(getAllTodos, listId)
      break;
  }
  // if (!toggleShowAllTodos) {
    // todoData = getCompleteTodos(todoData);
  // }

  return (
    <View style={styles.container}>
      <ToDoList todoData={todoData} listType={listType} />
      <AddTodoForm listId={listId} listType={listType} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
