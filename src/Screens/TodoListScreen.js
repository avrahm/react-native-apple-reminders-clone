import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import AddTodoForm from "../Components/AddToDoForm";
import ToDoList from "../Components/TodoList";

import { completeTodos, dueTodayTodos, searchTodos, selectTodosByList } from '../redux/selectors/TodoSelectors';

export default function ToDoScreen({ route }, props) {

  const listId = route.params.listId;
  const listType = route.params.listType;
  //useSelector is a hooks method instead of mapStateToProps
  //Allows a functional component to hook into the state
  const toggleShowAllTodos = useSelector(state => state.todos.toggleShowAllTodos);
  const toggleShowSearchResults = useSelector(state => state.todos.toggleShowSearchResults)
  let getTodos = useSelector(state => state.todos.todos);

  let todoData = selectTodosByList(getTodos, listId);
  if (listType === 'today') {
    todoData = dueTodayTodos(getTodos)
    console.log('todo', todoData);
  }
  if (!toggleShowAllTodos) {
    todoData = completeTodos(todoData);
  }
  return (
    <View style={styles.container}>
      <AddTodoForm listId={listId} listType={listType} />
      <ToDoList todoData={todoData} />
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
