import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import { Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

/*SCREENS*/
import TodoListScreen from './Screens/TodoListScreen';
import HomeScreen from './Screens/HomeScreen';
import TodoScreen from './Screens/TodoScreen';
import AddListScreen from './Screens/AddListScreen';
import ModalListScreen from './Screens/ModalListScreen';

//Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

//Create Stack Navigator
const Stack = createStackNavigator();

export default function ToDoApp() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                //screenOptions allow to customize the appearance of the tab navigator
                //deconstuct the screenOptions routes to change the tabBarIcon dynamically by the route.name 
                screenOptions={({ route }) => ({
                    //tabBarIcon 
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'PendingTodos') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === 'HomeStack') {
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
                    options={{ tabBarLabel: "Lists" }}
                    name="HomeStack"
                    component={HomeStack} />
                {/* <Tab.Screen
                    options={{
                        tabBarLabel: "Pending Todos", tabBarBadge: pendingTodos.length
                    }}
                    name="PendingTodos"
                    component={PendingStack} /> */}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function HomeStack() {
    const toggleShowAllFlag = useSelector(state => state.todos.toggleShowAllTodos);
    const dispatch = useDispatch()
    const toggleShowAllTodos = () => {
        dispatch({ type: 'TOGGLE_SHOWALL_TODOS' });
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="AddListScreen"
                component={AddListScreen}
                options={() => ({
                    title: 'Create New List',
                    label: 'Back'
                })}
            />

            <Stack.Screen
                name="TodoListScreen"
                component={TodoListScreen}
                options={({ route }) => ({
                    title: route.params.title,
                    headerRight: () => (
                        <Button
                            title={!toggleShowAllFlag ? 'Show All' : 'Hide'}
                            onPress={() => toggleShowAllTodos()}
                        />
                    )
                })}
            />

            <Stack.Screen
                name="TodoScreen"
                component={TodoScreen}
                options={() => ({
                    title: 'Details',
                    label: 'Back',
                })}
            />

            <Stack.Screen name="ModalListScreen"
                component={ModalListScreen}
                options={() => ({
                    title: 'Change List',
                    label: 'Back',
                })} />
        </Stack.Navigator>
    )
}