import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Button, Switch, ScrollView, Text, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../Components/ButtonComponent';
import { CheckBox } from 'react-native-elements';
import { formatDateWithDay } from '../assets/utils/formatDate';


import { useIsMount } from '../assets/utils/useIsMount';

export default function TodoScreen({ route, navigation }) {
    /* 2. Get the param from the route passed through navigation */
    const { todo } = route.params;

    //use state to edit the todo object received from params
    const [editableTodo, updateEditableTodo] = useState(todo);

    const [dueDateEnabled, toggleDueDateEnabled] = useState(todo.dueDate && true || null)

    const [viewCalendar, toggleViewCalendar] = useState(false);

    const dispatch = useDispatch();

    const dispatchAction = (action, payload) => {
        navigation.goBack();
        switch (action) {
            case 'delete':
                dispatch({ type: 'DELETE_TODO', payload: payload });
                break;
            case 'complete':
                dispatch({ type: 'COMPLETE_TODO', payload: payload });
                break;
            case 'pending':
                dispatch({ type: 'MARK_PENDING_TODO', payload: payload });
                break;
            case 'update':
                dispatch({ type: 'UPDATE_TODO', payload: payload });
                break;
        }
    };

    const disableSaveButton = (disable = true) => {
        navigation.setOptions({
            headerRight: () =>
                <Button title='Save' disabled={disable} onPress={() => dispatchAction('update', editableTodo)} />,
        });
    }

    const getList = useSelector(state => state.lists.lists).filter(list => list.id === editableTodo.listId)[0]

    const isMount = useIsMount();

    //useEffect should be used in place of componentWillMount and componentDidUpdate lifecycle methods
    //update the button when editableTodo changes
    useEffect(() => {
        //Do something on first render
        //return will render on second however useRef would be better suited to skip first render
        // return () => disableSaveButton(false)

        if (!isMount) {
            disableSaveButton(false)
        }
    }, [editableTodo])

    const onDateChange = (date) => {
        const newDate = formatDateWithDay(date)
        updateEditableTodo({
            ...editableTodo,
            dueDate: newDate
        })
    }

    const dueDateGetTime = editableTodo.dueDate && new Date(editableTodo.dueDate)
    const nowGetTime = new Date()

    const setDueDate = (dueDateEnabled) => {
        dueDateEnabled ? onDateChange(new Date()) : updateEditableTodo({ ...editableTodo, dueDate: '' })
    }

    const handleChangeList = ({ listId }) => {
        updateEditableTodo({ ...editableTodo, listId: listId })
        navigation.navigate('TodoScreen', { todo: todo, name: todo.title })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.cardView}>
                <CheckBox
                    center
                    checkedIcon='check-circle'
                    uncheckedIcon={editableTodo.dueDate ? (dueDateGetTime > nowGetTime ? 'circle-o' : 'frown-o') : 'circle-o'}
                    checked={editableTodo.complete}
                    onPress={() => dispatchAction(editableTodo.complete ? 'pending' : 'complete', editableTodo)}
                />
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
                    placeholder={'Notes'}
                // onFocus={() => { }}
                />
            </View>
            <View style={[styles.cardView, { justifyContent: 'space-between', alignItems: 'center' }]}>
                <TouchableOpacity onPress={() => toggleViewCalendar(!viewCalendar)}
                    disabled={!dueDateEnabled && true}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ButtonComponent icon='calendar' disable={true} />
                        <View>
                            <Text>Date</Text>
                            {dueDateEnabled && (
                                <Text style={[styles.paragraph]}>
                                    {editableTodo.dueDate ? formatDateWithDay(editableTodo.dueDate) : formatDateWithDay(new Date())}
                                </Text>)}
                        </View>
                    </View>
                </TouchableOpacity>
                <Switch onValueChange={() => {
                    toggleDueDateEnabled(!dueDateEnabled);
                    toggleViewCalendar(!viewCalendar && false);
                    setDueDate(!dueDateEnabled)
                }}
                    value={dueDateEnabled} />
            </View>
            <View>
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
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('ModalListScreen', {
                    showLists: true, handleOnPress: handleChangeList,
                    title: 'Move Task'
                })} >
                <View style={[styles.cardView, { alignItems: 'center', flexDirection: 'row' }]}>
                    {getList.icon ? (<ButtonComponent icon={getList.icon} color={getList.color} />) : (
                        <View style={styles.listIconBorder}>
                            <View style={[styles.listIcon, { backgroundColor: getList.color }]}></View>
                        </View>
                    )}
                    <Text style={styles.paragraph}>{getList.title}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.cardView}>
                <ButtonComponent
                    icon='trash'
                    onPress={() => dispatchAction('delete', editableTodo)}
                    color='red'
                />
                {!todo.complete ? (
                    <ButtonComponent
                        icon='checkmark'
                        color='black'
                        onPress={() => dispatchAction('complete', editableTodo)}
                    />
                ) : (
                        <ButtonComponent
                            icon='checkmark'
                            color='green'
                            onPress={() => dispatchAction('pending', editableTodo)}
                        />
                    )}
            </View>
        </ScrollView>
    );
}

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
    },
    listIcon: {
        height: 20,
        width: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listIconBorder: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderStyle: 'solid',
        padding: 5,
        borderRadius: 5,
        margin: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});