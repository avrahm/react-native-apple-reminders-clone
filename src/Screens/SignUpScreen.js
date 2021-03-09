import React, { useEffect, useState } from 'react';
import {
    Text, View, TextInput, StyleSheet, Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { signUpFirebase } from '../firebase/functions/signup';
import ButtonComponent from '../Components/ButtonComponent';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.userState.isLoggedIn);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signupDetails = {
        fullName,
        email,
        password,
    };

    useEffect(() => {
        // when a user signs up. take them back to the profile screen
        if (isLoggedIn) navigation.goBack();
    }, [isLoggedIn]);

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }
        const dispatchSignUp = dispatch(signUpFirebase(signupDetails));
        if (dispatchSignUp) {
            // handle successful signup
            console.log('SIGNED UP');
        } else {
            // handle failed signup
            console.log('FAILED');
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.TextInput}
                placeholder="fullName"
                onChangeText={(fullNameOnChange => setFullName(fullNameOnChange))}
            />
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
            <TextInput
                style={styles.TextInput}
                placeholder="confirm password"
                keyboardType="visible-password"
                onChangeText={(confirmPasswordOnChange => setConfirmPassword(confirmPasswordOnChange))}
                secureTextEntry
            />

            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <ButtonComponent text="Sign Up" onPress={() => onRegisterPress()} />
                <Text>Already have an account?</Text>
                <Text><Button title="Login" onPress={() => navigation.goBack()} /></Text>
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
