import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function AddTodoForm(props) {
  const [newTodo, setNewTodo] = useState("");

  return (
    <View style={styles.todoForm}>
      <TextInput
        type="text"
        style={{ width: 200, borderWidth: 1 }}
        onChangeText={(e) => setNewTodo(e)}
        value={newTodo}
      />
      <Button
        title="Add"
        onPress={() => {
          props.submitTodo(newTodo);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  todoForm: {
    flexDirection: "row",
    marginLeft: 30,
  }
});
