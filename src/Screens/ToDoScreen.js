import React from "react";
import { Button, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import AddTodoForm from "../Components/AddToDoForm";
import Todo from "../Components/Todo";

export default class ToDoScreen extends React.Component {
  state = {
    todos: ["Todo 1", "Todo 2", "Todo 3", "Todo 4", "Todo 5"],
    toggleAddTodoForm: false,
  };

  toggleAddTodoForm = () => {
    this.setState({
      toggleAddTodoForm: !this.state.toggleAddTodoForm,
    });
  };

  submitTodo = (value) => {
    this.setState({
      todos: [...this.state.todos, value],
    });
  };

  deleteTodo = (key) => {
    const removeTodo = this.state.todos.splice(key, 1);

    this.setState({
      todos: [...this.state.todos],
    });
  };

  showTodos = () => {
    return this.state.todos.map((todo, index) => {
      return (
        <Todo
          todo={todo}
          key={index}
          index={index}
          deleteTodo={this.deleteTodo}
        />
      );
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.paragraph}>My First Todo Mobile App</Text>
        <Button
          title="Add Todo"
          onPress={() => {
            this.toggleAddTodoForm();
          }}
        />
        {this.state.toggleAddTodoForm && (
          <AddTodoForm submitTodo={this.submitTodo} />
        )}
        {this.showTodos()}
      </ScrollView>
    );
  }
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
