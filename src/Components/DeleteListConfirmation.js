import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import ButtonComponent from './ButtonComponent';

export default function DeleteListConfirmation(props) {

    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            margin: 50,
        }}
        // eslint-disable-next-line indent
              >
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10,
            }}
            >
                <TouchableOpacity onPress={() => props.deleteTasksAssignedToList(false, props.listId)}>
                    <ButtonComponent text="Save All" icon="save" />
                </TouchableOpacity>
                <Text>Save All Tasks</Text>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10,
            }}
            >
                <TouchableOpacity onPress={() => props.deleteTasksAssignedToList(true, props.listId)}>
                    <ButtonComponent text="Delete All" icon="trash" />
                </TouchableOpacity>
                <Text>Delete All Tasks</Text>
            </View>
        </View>
    );

}
