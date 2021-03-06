/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Animated, Text, View, StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { getTodosByList } from '../redux/selectors/TodoSelectors';
import { addTodo, deleteList, deleteTodo } from '../redux/actions/TodoActions';

export default function SwipeableRow({ children, ...props }) {

    const { todo } = children.props;

    const navigation = useNavigation();

    // useDispatch is a hook method to create access to the dispatches available within a functional component instead of using mapDispatchToProps and a class component
    const dispatch = useDispatch();

    const navigateToConfirmDeleteModal = () => {

        navigation.navigate('ModalListScreen', {
            showConfirmDeleteListOptions: true,
            deleteTasksAssignedToList,
            listId: props.id,
            title: 'Manage Tasks',
        });

    };

    const confirmedDeleteList = (list = props) => {

        dispatch(deleteList(list));
        navigation.navigate('HomeScreen');

    };

    const getAllTodos = useSelector(state => state.todoState.todoLists);

    const deleteTasksAssignedToList = (decisionToDeleteTodos, listId) => {

        const todosFromList = getTodosByList(getAllTodos, listId);
        if (todosFromList.length !== 0) {

            todosFromList.forEach(eachTodo => {

                if (decisionToDeleteTodos) {

                    dispatch(deleteTodo(eachTodo));

                } else if (!decisionToDeleteTodos) {

                    eachTodo.listId = 0;
                    dispatch(addTodo(eachTodo));

                }

            });

        }
        confirmedDeleteList();

    };

    const renderRightAction = (text, color, x, progress) => {

        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const dispatchAction = action => {

            close();
            switch (action) {

            case 'deleteTodo':
                dispatch(deleteTodo(todo));
                break;
            case 'deleteList':
                navigateToConfirmDeleteModal();
                break;
            default:
                break;

            }

        };
        return (
            <Animated.View style={{
                flex: 1, transform: [{ translateX: trans }],
            }}
                >
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={() => dispatchAction(props.action)}
                >
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );

    };

    const renderRightActions = progress => (
        <View
            style={{
                width: 68,
                flexDirection: 'row',
            }}
            >
            {renderRightAction('Delete', '#dd2c00', 68, progress)}
        </View>
    );
    let _swipeableRow;
    const swipeableRowRef = ref => {

        _swipeableRow = ref;

    };
    const close = () => {

        _swipeableRow.close();

    };
    return (
        <Swipeable
            ref={swipeableRowRef}
            renderRightActions={renderRightActions}
            >
            {children}
        </Swipeable>
    );

}

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
