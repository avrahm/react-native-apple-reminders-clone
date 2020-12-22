import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToDoScreen from './Screens/ToDoScreen';
import CompleteToDoScreen from './Screens/CompleteToDoScreen';

//Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function ToDoApp() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Pending Todos" component={ToDoScreen} />
                <Tab.Screen name="Complete" component={CompleteToDoScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}