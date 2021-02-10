import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default function DeleteListConfirmation(props) {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: 20,
        }}>
            <TouchableOpacity onPress={() => props.deleteTasksAssignedToList(false, props.list.id)}>
                <Text>Save Tasks</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.deleteTasksAssignedToList(true, props.list.id)}>
                <Text>Delete Tasks</Text>
            </TouchableOpacity>
        </View>
    )
}
