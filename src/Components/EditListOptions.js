/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getShowCompletedTasksStatusByList } from '../redux/selectors/TodoSelectors';
import ButtonComponent from './ButtonComponent';
import { toggleShowAllTodos } from '../redux/actions/TodoActions';

export default function EditListOptions(props) {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const getState = useSelector(state => state.todoState.todoLists);
    const getShowCompleteFlag = getShowCompletedTasksStatusByList(getState, props.listId);

    const handleToggleShowAllTodos = () => {

        dispatch(toggleShowAllTodos(props.listId));
        navigation.goBack();

    };
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
        }}
            >
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10,
            }}
            >
                <TouchableOpacity onPress={() => handleToggleShowAllTodos()}>
                    <ButtonComponent text={!getShowCompleteFlag ? 'Show Completed' : 'Hide Completed'} icon={!getShowCompleteFlag ? 'eye' : 'eye-off'} />
                </TouchableOpacity>
                <Text>{!getShowCompleteFlag ? 'Show Completed' : 'Hide Completed'}</Text>
            </View>
            {props.allowToModifyList && (
                <View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 10,
                    }}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate('AddListScreen',
                            { listId: props.listId, editList: true })}
                        >
                            <ButtonComponent text="Edit List" icon="create" />
                        </TouchableOpacity>
                        <Text>Name & Appearace</Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 10,
                    }}
                    >
                        <TouchableOpacity onPress={() => alert('handle delete')}>
                            <ButtonComponent text="Delete List" icon="trash" />
                        </TouchableOpacity>
                        <Text>Delete List</Text>
                    </View>
                </View>
            )}
        </View>
    );

}
