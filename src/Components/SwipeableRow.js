import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Animated, Text, View, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch } from "react-redux";

export default function SwipeableRow({ children }) {

    let todo = children.props.todo;

    //useDispatch is a hook method to create access to the dispatches available within a functional component instead of using mapDispatchToProps and a class component
    const dispatch = useDispatch();
    let swipeBtnToggle = todo.complete;
    useEffect(() => {
        swipeBtnToggle = todo.complete
    }, [todo.complete])

    const renderRightAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const dispatchAction = (action) => {

            close();
            switch (action) {
                case 'Delete':
                    dispatch({ type: 'DELETE_TODO', payload: todo });
                    break;
                case 'Complete':
                    dispatch({ type: 'COMPLETE_TODO', payload: todo });
                    break;
                case 'Pending':
                    dispatch({ type: 'MARK_PENDING_TODO', payload: todo });
                    break;
            }
        };
        return (
            <Animated.View style={{
                flex: 1, transform: [{ translateX: trans }]
            }}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={() => dispatchAction(text)}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = (progress) => {
        return (
            <View
                style={{
                    width: 128,
                    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
                }}>
                {renderRightAction('Pending', '#C8C7CD', 128, progress)}
                {renderRightAction('Complete', '#ffab00', 128, progress)}
                {renderRightAction('Delete', '#dd2c00', 64, progress)}
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