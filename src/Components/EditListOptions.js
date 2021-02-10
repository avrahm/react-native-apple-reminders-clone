import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function EditListOptions(props) {

    const navigation = useNavigation()
    const toggleShowAllFlag = useSelector(state => state.todos.toggleShowAllTodos);
    const dispatch = useDispatch()
    const toggleShowAllTodos = () => {
        dispatch({ type: 'TOGGLE_SHOWALL_TODOS' });
        navigation.goBack();
    }

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: 20,
        }}>
            <TouchableOpacity onPress={() => navigation.navigate('AddListScreen',
                {
                    listId: props.list,
                    editList: true
                }
            )}>
                <Text>Edit List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleShowAllTodos()}>
                <Text>{!toggleShowAllFlag ? 'Show All' : 'Hide'}</Text>
            </TouchableOpacity>
        </View>
    )
}
