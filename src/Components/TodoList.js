import React from "react";
import { connect } from 'react-redux';

import { Button, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import AddTodoForm from "../Components/AddToDoForm";
import Todo from "../Components/Todo";


class ToDoList extends React.Component {
    //with the state being stored with redux setting state is not necessary

    // state = {
    //   todos: ["Todo 1", "Todo 2", "Todo 3", "Todo 4", "Todo 5"],
    //   toggleAddTodoForm: false,
    // }

    // toggleAddTodoForm = () => {
    //   this.setState({
    //     toggleAddTodoForm: !this.state.toggleAddTodoForm,
    //   });
    // };

    // submitTodo = (value) => {
    //   this.setState({
    //     todos: [...this.props.todos, value],
    //   });
    // };

    //   deleteTodo = (key) => {
    //     const removeTodo = this.props.todos.splice(key, 1);

    //     this.setState({
    //       todos: [...this.props.todos],
    //     });
    //   };

    showTodos = () => {
        return this.props.todos.map((todo, index) => {
            return (
                <Todo
                    todo={todo}
                    key={index}
                    index={index}
                //   deleteTodo={this.deleteTodo}
                />
            );
        });
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.showTodos()}
            </ScrollView>
        );
    }
}

//gets the necessary state from the store and allows the component to use the state as props
function mapStateToProps(state) {
    return {
        todos: state.todos
    }
}


function mapDispatchToProps(dispatch) {
    return {
        addTodo: todo =>
            dispatch({ type: "ADD_TODO", payload: todo }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);

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
