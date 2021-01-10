import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PendingToDoScreen from './Screens/PendingToDoScreen';
import CompleteToDoScreen from './Screens/CompleteToDoScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

//Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function ToDoApp() {

    const todos = useSelector(state => state.todos);
    const pendingTodos = todos.filter(todos => todos.complete === false);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'PendingTodos') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === 'CompletedTodos') {
                            iconName = focused ? 'ios-list' : 'ios-list';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen
                    options={{ tabBarLabel: "Pending Todos", tabBarBadge: pendingTodos.length }}
                    name="PendingTodos"
                    component={PendingToDoScreen} />
                <Tab.Screen
                    options={{ tabBarLabel: "Completed Todos" }}
                    name="CompletedTodos"
                    component={CompleteToDoScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}