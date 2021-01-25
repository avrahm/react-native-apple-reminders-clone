import React from "react";

import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Button } from "react-native";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { ListItem, Icon, SearchBar } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

import ButtonComponent from '../Components/ButtonComponent';


export default function ListScreen({ navigation }) {

  const todos = useSelector(state => state.todos.todos).filter(todo => !todo.complete);
  const dueTodayTodos = todos.filter(todo => new Date(todo.dueDate).getDate() == new Date().getDate());
  const inboxTodos = todos.filter(todo => todo.listId === 0);

  const list = useSelector(state => state.lists.lists)

  return (
    <View style={styles.container}>
      {/* <SearchBar lightTheme={true} placeholder='Search' /> */}
      <ScrollView>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.cardView}>
              <View style={{ alignItems: 'center' }}>
                <ButtonComponent icon='mail-outline' />
                <Text>Inbox</Text>
              </View>
              <Text style={{ fontSize: 34 }}>{inboxTodos.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardView}>
              <View style={{ alignItems: 'center' }}>
                <ButtonComponent icon='calendar' />
                <Text>Today</Text>
              </View>
              <Text style={{ fontSize: 34 }}>{dueTodayTodos.length}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cardView} onPress={() => navigation.navigate('PendingTodoScreen')}>
            <View style={{ alignItems: 'center' }}>
              <ButtonComponent icon='archive-outline' />
              <Text>All</Text>
            </View>
            <Text style={{ fontSize: 34 }}>{todos.length}</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text style={{ fontSize: 24, padding: 8 }}>
            My Lists
        </Text>

          <Button title='Add new list' onPress={() => navigation.navigate('AddListScreen')} />
        </View>
        <View>
          {
            list.map((item, i) => (
              <ListItem key={i} bottomDivider>
                <Ionicons name={item.icon} size={24} color={'white'} style={{ backgroundColor: item.color, borderRadius: 50 }} />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))
          }
        </View>
      </ScrollView>
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
  cardView: {
    flexDirection: "row",
    borderWidth: 1,
    textAlign: "left",
    // alignItems:'center',
    justifyContent: 'space-between',
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    margin: 3,
    flex: 1
  }
});
