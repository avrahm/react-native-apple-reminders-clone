import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Animated, Text, View, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch, useSelector } from "react-redux";
import { selectTodosByList } from '../redux/selectors/TodoSelectors';

export default function SwipeableRow({ children, ...props }) {

    let todo = children.props.todo;

    const navigation = useNavigation()

    //useDispatch is a hook method to create access to the dispatches available within a functional component instead of using mapDispatchToProps and a class component
    const dispatch = useDispatch();

    const navigateToConfirmDeleteModal = () => {
        navigation.navigate('ModalListScreen', {
            showConfirmDeleteListOptions: true,
            deleteTasksAssignedToList: deleteTasksAssignedToList,
            list: props
        })
    }

    const confirmedDeleteList = (list) => {
        dispatch({ type: 'DELETE_LIST', payload: props });
        navigation.navigate('HomeScreen')
    }

    const getTodos = useSelector(state => state.todos.todos);

    const deleteTasksAssignedToList = (decisionToDelete, list) => {
        const todosFromList = selectTodosByList(getTodos, list)
        todosFromList.map(eachTodo => {
            if (decisionToDelete) {
                dispatch({ type: 'DELETE_TODO', payload: eachTodo })
            } else if (!decisionToDelete) {
                eachTodo.listId = 0
                dispatch({ type: 'UPDATE_TODO', payload: eachTodo })
            }
        })
        confirmedDeleteList()
    }


    const renderRightAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const dispatchAction = (action) => {
            close();
            switch (action) {
                case 'deleteTodo':
                    dispatch({ type: 'DELETE_TODO', payload: todo });
                    break;
                case 'deleteList':
                    navigateToConfirmDeleteModal()
                    break;
            }
        };
        return (
            <Animated.View style={{
                flex: 1, transform: [{ translateX: trans }]
            }}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={() => dispatchAction(props.action)}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = (progress) => {
        return (
            <View
                style={{
                    width: 68,
                    flexDirection: 'row',
                }}>
                {renderRightAction('Delete', '#dd2c00', 68, progress)}
            </View>
        );
    };
    let _swipeableRow;
    const swipeableRowRef = ref => {
        _swipeableRow = ref
    };
    const close = () => {
        _swipeableRow.close();
    };
    return (
        <Swipeable
            ref={swipeableRowRef}
            renderRightActions={renderRightActions}>
            {children}
        </Swipeable>
    )
};

const styles = StyleSheet.create({
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});