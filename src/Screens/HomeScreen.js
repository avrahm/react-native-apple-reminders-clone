import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Button, StatusBar } from "react-native";
import { getAllTodosWithoutList, getCompleteTodos, getDueTodayTodos, getTodosByList } from "../redux/selectors/TodoSelectors";

import ButtonComponent from '../Components/ButtonComponent';
import ListOfLists from "../Components/ListOfLists";
import SearchBarComponent from "../Components/SearchBarComponent";
import { persistUserFromFirebase } from "../firebase/functions/persistUser";
import { syncDataToFirebase } from "../firebase/functions/syncData";
import { getDataFromFirebase } from "../firebase/functions/getData";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const getAllTodos = useSelector(state => state.todoState.todoLists)
  const userInfo = useSelector(state => state.userState.userInfo);

  useEffect(() => {
    dispatch(persistUserFromFirebase());
    if (userInfo.id != '') {
      dispatch(getDataFromFirebase(userInfo.id))
    }
  }, []);

  if (userInfo.id != '') {
    useEffect(() => {
      dispatch(syncDataToFirebase(getAllTodos, userInfo.id))
    }, [getAllTodos]);
  }

  // useEffect(() => {
  //   const getAllTodos = useSelector(state => state.todoState.todoLists);
  // }, [todoState])
  
  const todos = getCompleteTodos(getAllTodosWithoutList(getAllTodos));
  const dueTodayTodosTotal = getDueTodayTodos(getAllTodos).length;
  const inboxTodosTotal = getCompleteTodos(getTodosByList(getAllTodos, 0)).length;

  const toggleShowSearchResults = useSelector(state => state.todoState.toggleShowSearchResults)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#000000" translucent={true} />
      <SearchBarComponent />
      {!toggleShowSearchResults && (
        <ScrollView>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.cardView}
                onPress={() => navigation.navigate('TodoListScreen', { listId: 0, title: 'Inbox' })}
              >
                <View style={{ alignItems: 'center' }}>
                  <ButtonComponent icon='mail-outline' />
                  <Text>Inbox</Text>
                </View>
                <Text style={{ fontSize: 34 }}>{inboxTodosTotal}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardView}
                onPress={() => navigation.navigate('TodoListScreen', { listType: 'today', title: 'Due Today' })}
              >
                <View style={{ alignItems: 'center' }}>
                  <ButtonComponent icon='calendar' />
                  <Text>Today</Text>
                </View>
                <Text style={{ fontSize: 34 }}>{dueTodayTodosTotal}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.cardView}
              onPress={() => navigation.navigate('TodoListScreen', { listType: 'all', title: 'All' })}
            >
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
            <ListOfLists
              showHiddenLists={false}
              handleOnPress={(list) => navigation.navigate('TodoListScreen', list)} />
          </View>
        </ScrollView>
      )}
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
