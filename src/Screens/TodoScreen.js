import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet, TextInput, Button, Switch, ScrollView, Text, TouchableOpacity
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import ButtonComponent from '../Components/ButtonComponent';

export default function TodoScreen({ route, navigation }) {
    /* 2. Get the param from the route passed through navigation */
    const { todo } = route.params;

    //use state to edit the todo object received from params
    const [editableTodo, updateEditableTodo] = useState(todo);

    const [dueDateEnabled, toggleDueDateEnabled] = useState(todo.dueDate && true || null)

    const [viewCalendar, toggleViewCalendar] = useState(false);

    const dispatch = useDispatch();

    const deleteTodo = (todo) => {
        dispatch({ type: "DELETE_TODO", payload: todo });
        navigation.goBack();
    }

    const completeTodo = (todo) => {
        dispatch({ type: "COMPLETE_TODO", payload: todo });
        navigation.goBack();
    }

    const markPendingTodo = (todo) => {
        dispatch({ type: "MARK_PENDING_TODO", payload: todo });
        navigation.goBack();
    }

    const updateTodo = (todo) => {
        dispatch({ type: "UPDATE_TODO", payload: todo });
        navigation.goBack();
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <Button title='Done' onPress={() =>
                    updateTodo(editableTodo)} />,
        });
    }, [editableTodo])

    const formatDate = (date) => {
        return format(new Date(date), "ccc LLL d yyyy").toString()
    }

    const onDateChange = (date) => {
        // const formatDate = format(new Date(date), "ccc LLL d yyyy")
        const newDate = formatDate(date)
        updateEditableTodo({
            ...editableTodo,
            dueDate: newDate
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.cardView}>
                <TextInput style={styles.paragraph}
                    value={editableTodo.title}
                    onChangeText={(e) => updateEditableTodo({
                        ...editableTodo,
                        title: e
                    })}
                    placeholder={'Title'}
                />
            </View>
            <View style={styles.cardView}>
                <TextInput
                    multiline={true}
                    numberOfLines={5}
                    value={editableTodo.description}
                    onChangeText={(e) => updateEditableTodo({
                        ...editableTodo,
                        description: e
                    })}
                    placeholder={'Description'}
                    onFocus={() => { }}
                />
            </View>
            <View style={[styles.cardView,
            { justifyContent: 'space-between', alignItems: 'center' }]}>
                <TouchableOpacity onPress={() => toggleViewCalendar(!viewCalendar)}
                    disabled={!dueDateEnabled && true}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ButtonComponent icon='calendar' disable={true} />
                        <View>
                            <Text>Date</Text>
                            {dueDateEnabled && (
                                <Text style={[styles.paragraph]}>
                                    {editableTodo.dueDate ? formatDate(editableTodo.dueDate) : formatDate(new Date())}
                                </Text>)}
                        </View>
                    </View>
                </TouchableOpacity>
                <Switch onValueChange={() => {
                    toggleDueDateEnabled(!dueDateEnabled);
                    toggleViewCalendar(!viewCalendar && false)
                }}
                    value={dueDateEnabled} />
            </View>
            {viewCalendar && (
                <CalendarPicker
                    onDateChange={onDateChange}
                    initialDate={editableTodo.dueDate.toString() || new Date()}
                    selectedStartDate={editableTodo.dueDate.toString() || new Date()}
                    restrictMonthNavigation={true}
                    minDate={new Date()}
                    dayShape={'square'}
                />
            )}
            <View style={styles.cardView}>
                <ButtonComponent
                    icon='trash'
                    onPress={() => deleteTodo(editableTodo)}
                    color='red'
                />
                {!todo.complete ? (
                    <ButtonComponent
                        icon='checkmark'
                        color='black'
                        onPress={() => completeTodo(editableTodo)}
                    />
                ) : (
                        <ButtonComponent
                            icon='checkmark'
                            color='green'
                            onPress={() => markPendingTodo(editableTodo)}
                        />
                    )}
            </View>
        </ScrollView>
    );
}

// TodoScreen.propTypes = {
//     title: PropTypes.string.isRequired,
//     dueDate: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired
// }

// TodoScreen.defaultProp = {
//     title: 'Title',
//     description: 'Update description',
//     dueDate: 'Set a date'
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 8,
    },
    paragraph: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cardView: {
        flexDirection: "row",
        borderWidth: 1,
        textAlign: "left",
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 15,
        margin: 3,
    }
});

