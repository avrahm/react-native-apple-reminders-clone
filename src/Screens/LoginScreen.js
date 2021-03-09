import React, { useState } from 'react';
import {
    Text, View, TextInput, StyleSheet, Button,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { loginFirebase } from '../firebase/functions/login';
import ButtonComponent from '../Components/ButtonComponent';

// https://www.freecodecamp.org/news/react-native-firebase-tutorial/
export default function LoginScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLoginPress = () => {
        const login = dispatch(loginFirebase(email, password));
        // if (!login) //do something
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.TextInput}
                placeholder="name@example.com"
                keyboardType="email-address"
                onChangeText={(emailOnChange => setEmail(emailOnChange))}
            />

            <TextInput
                style={styles.TextInput}
                placeholder="password"
                keyboardType="visible-password"
                onChangeText={(passwordOnChange => setPassword(passwordOnChange))}
                secureTextEntry
            />

            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <ButtonComponent text="Login" onPress={() => onLoginPress()} />
                <Text>Need an Account?</Text>
                <Text><Button title="Sign Up" onPress={() => navigation.navigate('SignUpScreen')} /></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    TextInput: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        width: 300,
        margin: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
