import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity, Text, View, Prompt } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getShowCompletedTasksStatusByList } from '../redux/selectors/TodoSelectors';
import ButtonComponent from './ButtonComponent';

export default function EditListOptions(props) {

    const navigation = useNavigation()
    const getState = useSelector(state => state.todoLists.todoLists);
    const dispatch = useDispatch()
    const toggleShowAllTodos = () => {
        dispatch({ type: 'TOGGLE_SHOWALL_TODOS', payload: props.listId });
        navigation.goBack();
    }
    let toggleShowAllFlag = getShowCompletedTasksStatusByList(getState, props.listId)
    // const navigateToConfirmDeleteModal = () => {
    //     navigation.navigate('ModalListScreen', {
    //         showConfirmDeleteListOptions: true,
    //         // deleteTasksAssignedToList: deleteTasksAssignedToList,
    //         list: props,
    //         title: `Manage Tasks`
    //     })
    // }
    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            margin: 50,
        }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('AddListScreen',
                    { listId: props.listId, editList: true }
                )}>
                    <ButtonComponent text='Edit List' icon='create' />
                </TouchableOpacity>
                <Text>Name & Appearace</Text>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10
            }}>
                <TouchableOpacity onPress={() => toggleShowAllTodos()}>
                    <ButtonComponent text={!toggleShowAllFlag ? 'Show Completed' : 'Hide Completed'} icon={!toggleShowAllFlag ? 'eye' : 'eye-off'} />
                </TouchableOpacity>
                <Text>{!toggleShowAllFlag ? 'Show Completed' : 'Hide Completed'}</Text>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10
            }}>
                <TouchableOpacity onPress={() => alert('handle delete')} >
                    <ButtonComponent text='Delete List' icon='trash' />
                </TouchableOpacity>
                <Text>Delete List</Text>
            </View>
        </View>
    )
}
