import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native'
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';

export default function AddListScreen({ navigation, route }) {

    let currentListId = useSelector(state => state.lists.listId);
    let listToUpdate = {
        title: '',
        icon: '',
        color: 'gray',
        id: ++currentListId
    };
    let listAction = 'add';
    if (route.params) {
        let getCurrentLists = useSelector(state => state.lists.lists)
        listToUpdate = getCurrentLists.filter(lists => {
            return lists.id === route.params.listId
        })[0];
        if (route.params.editList) listAction = 'update';
    }

    //use state to edit the todo object received from params
    const [editableList, updateEditableList] = useState({
        title: listToUpdate.title ?? '',
        icon: listToUpdate.icon ?? '',
        color: listToUpdate.color ?? 'gray',
        id: listToUpdate.id ?? ++currentListId
    });

    const dispatch = useDispatch();

    const dispatchAction = (action, payload) => {
        if (editableList.title != '') {
            switch (action) {
                case 'add':
                    dispatch({ type: 'ADD_LIST', payload: payload })
                case 'update':
                    dispatch({ type: 'UPDATE_LIST', payload: payload })
            }
            navigation.navigate('HomeScreen');
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <Button
                    title='Done'
                    disabled={editableList.title == '' && true}
                    onPress={() => dispatchAction(listAction, editableList)} />,
        });
    }, [editableList])

    const colorOptions = ['red', 'green', 'blue', 'orange', 'gray'];

    const iconOptions = ['barbell', 'baseball-outline', 'airplane', 'basket-outline']

    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
            <View style={{ height: 100, width: 100, backgroundColor: editableList.color, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    {editableList.icon && <Ionicons name={editableList.icon} size={60} />}
                </Text>
            </View>
            <View style={{ padding: 20, width: '80%' }}>
                <Input
                    placeholder='Title'
                    defaultValue={editableList.title}
                    onChangeText={(e) => updateEditableList({ ...editableList, title: e })}
                    style={{ textAlign: 'center', padding: 10 }}
                    autoFocus={true}
                    onSubmitEditing={() => dispatchAction(listAction, editableList)}
                />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 15 }}>
                {colorOptions.map((eachColor, index) => (
                    <TouchableOpacity
                        onPress={() => updateEditableList({ ...editableList, color: eachColor })}
                        key={index}
                        style={{ width: 40, height: 40, backgroundColor: eachColor, borderRadius: 50, margin: 5 }}
                    >

                    </TouchableOpacity>
                ))}
                {iconOptions.map((eachIcon, index) => (
                    <TouchableOpacity
                        onPress={() => updateEditableList({ ...editableList, icon: eachIcon })}
                        key={index}
                        style={{ width: 40, height: 40, backgroundColor: 'gray', borderRadius: 50, margin: 5, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Ionicons name={eachIcon} size={24} color='white' />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}
