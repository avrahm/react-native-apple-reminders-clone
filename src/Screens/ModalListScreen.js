import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListOfLists from '../Components/ListOfLists';

export default function ModalListScreen({ route}, props) {

    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ListOfLists
                showHiddenLists={true}
                handleOnPress={route.params.handleOnPress}
                // currentList={props.listId || 0}
            />
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </View>
    )
}