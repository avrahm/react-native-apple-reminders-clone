import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function Todo(props) {
  return (
    <View style={styles.rectButton}>
      <Text style={styles.fromText}> {props.todo.title}</Text>
      <Text numberOfLines={2} style={styles.messageText}>
        Description
    </Text>
      <Text style={styles.dateText}>
        Due: Jan 1, 2021
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});
