import React from 'react'
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListOfLists from '../Components/ListOfLists';
import DeleteListConfirmation from '../Components/DeleteListConfirmation';
import EditListOptions from '../Components/EditListOptions';

export default function ModalListScreen({ route }) {

    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {route.params.showLists && (
                <ListOfLists
                    showHiddenLists={true}
                    handleOnPress={route.params.handleOnPress}
                />
            )}
            {route.params.showConfirmDeleteListOptions && (
                <DeleteListConfirmation
                    listId={route.params.listId}
                    deleteTasksAssignedToList={route.params.deleteTasksAssignedToList}
                />
            )}
            {route.params.showEditListOptionsMenu && (
                <EditListOptions
                    allowToModifyList={route.params.allowToModifyList}
                    listId={route.params.listId}
                />
            )}
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </View>
    )
}