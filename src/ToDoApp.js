import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';

/*SCREENS*/
import TodoListScreen from './Screens/TodoListScreen';
import HomeScreen from './Screens/HomeScreen';
import TodoScreen from './Screens/TodoScreen';
import AddListScreen from './Screens/AddListScreen';
import ModalListScreen from './Screens/ModalListScreen';
import ProfileScreen from './Screens/ProfileScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';

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

                        if (route.name === 'ProfileStack') {
                            iconName = focused
                                ? 'person-circle'
                                : 'person-circle-outline';
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
                <Tab.Screen
                    options={{
                        tabBarLabel: "Profile"
                        // , tabBarBadge: profile.length
                    }}
                    name="ProfileStack"
                    component={ProfileStack} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function HomeStack({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    title: 'Home'
                }}
            />

            <Stack.Screen
                name="AddListScreen"
                component={AddListScreen}
                options={() => ({
                    title: 'Name & Appearance',
                    label: 'Back'
                })}
            />

            <Stack.Screen
                name="TodoListScreen"
                component={TodoListScreen}
                options={({ route }) => ({
                    title: route.params.title,

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
                options={({ route }) => ({
                    title: route.params.title,
                    label: 'Back',
                })} />
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen"
                component={ProfileScreen}
                options={() => ({
                    title: 'Profile',
                })} />
            <Stack.Screen name="LoginScreen"
                component={LoginScreen}
                options={() => ({
                    title: 'Login',
                })} />
            <Stack.Screen name="SignUpScreen"
                component={SignUpScreen}
                options={() => ({
                    title: 'Sign Up',
                })} />
        </Stack.Navigator>
    )
}