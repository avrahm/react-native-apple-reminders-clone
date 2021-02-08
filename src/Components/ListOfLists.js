import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export default function ListOfLists(props) {

    const navigation = useNavigation();
    let lists = useSelector(state => state.lists.lists);

    let showHiddenLists = !props.showHiddenLists ? false : true;
    if (!showHiddenLists) lists = lists.filter(list => !list.hidden);

    return (
        <View style={{ width: '100%' }}>
            {
                lists.map((item, i) => (
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