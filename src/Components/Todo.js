import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Todo(props) {
  return (
    <View style={styles.todo}>
      <Button title="Delete" onPress={(i) => props.deleteTodo(props.index)} />
      <Text style={styles.todo}>
        {props.todo}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    alignItems: "center",
    flexDirection: "row",
    fontSize: 20,
  },
});
