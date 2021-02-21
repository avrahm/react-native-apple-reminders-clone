import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from './ButtonComponent';

export default function EditListOptions(props) {

    const navigation = useNavigation()
    const toggleShowAllFlag = useSelector(state => state.todos.toggleShowAllTodos);
    const dispatch = useDispatch()
    const toggleShowAllTodos = () => {
        dispatch({ type: 'TOGGLE_SHOWALL_TODOS' });
        navigation.goBack();
    }
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
                    { listId: props.list, editList: true }
                )}>
                    <ButtonComponent text='Edit List' icon='create' />
                </TouchableOpacity>
                <Text>Edit List</Text>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10
            }}>
                <TouchableOpacity onPress={() => toggleShowAllTodos()}>
                    <ButtonComponent text={!toggleShowAllFlag ? 'Show All' : 'Hide'} icon={!toggleShowAllFlag ? 'eye' : 'eye-off'} />
                </TouchableOpacity>
                <Text>{!toggleShowAllFlag ? 'Show All' : 'Hide'}</Text>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10
            }}>
                <TouchableOpacity onPress={()=>alert('handle delete')} >
                    <ButtonComponent text='Delete List' icon='trash' />
                </TouchableOpacity>
                <Text>Delete List</Text>
            </View>
        </View>
    )
}
