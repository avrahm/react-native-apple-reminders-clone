import React from 'react'
import { useSelector } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SwipeableRow from './SwipeableRow';
import { getAllLists } from '../redux/selectors/TodoSelectors';

//in react navigation 5 passing a function through params results in the yellow box warning of non-serializable values. this is due to warning to prevent issues with deep linking or state persistence
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export default function ListOfLists(props) {

    const navigation = useNavigation();
    const state = useSelector(state => state.todoLists.todoLists);
    let lists = getAllLists(state);

    let showHiddenLists = !props.showHiddenLists ? false : true;
    if (!showHiddenLists) lists = lists.filter(list => !list.listHidden);

    return (
        <View style={{ width: '100%' }}>
            {
                lists.map((item, i) => (
                    <SwipeableRow key={i}
                        action='deleteList'
                        id={item.id}>
                        <ListItem key={i} bottomDivider
                            onPress={() => props.handleOnPress({
                                listId: item.id,
                                title: item.title
                            })}
                        >
                            <View style={[styles.listIcon, { backgroundColor: item.color }]}>
                                <Text>
                                    {item.icon &&
                                        <Ionicons name={item.icon} size={20} color={'white'} />
                                    }
                                </Text>
                            </View>
                            <ListItem.Content>
                                <ListItem.Title>
                                    <Text>{item.title}</Text>
                                </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </SwipeableRow>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    listIcon: {
        height: 30,
        width: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})