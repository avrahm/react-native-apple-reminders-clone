import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const ButtonComponent = ({
    text, onPress, icon, color, disable
}) => (
    <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disable}
    >
        {icon ?
            (
                <Ionicons name={icon} size={18} color={color} />
            ) : (
                <View>
                    <Text> {text} </Text>
                </View>
            )}
    </TouchableOpacity>
);

export default ButtonComponent;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 4,
        backgroundColor: '#fff',
        height: 40,
        fontSize: 24,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    }
})

