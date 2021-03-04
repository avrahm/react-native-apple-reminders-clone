import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native';

import ButtonComponent from '../Components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { signUpFirebase } from '../firebase/functions/signup';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUpScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.userState.isLoggedIn);

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const signupDetails = {
        fullName,
        email,
        password
    }

    useEffect(() => {
        //when a user signs up. take them back to the profile screen
        if (isLoggedIn) navigation.goBack()
    }, [isLoggedIn])

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        dispatch(signUpFirebase(signupDetails))
    }
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <TextInput style={styles.TextInput}
                placeholder='fullName'
                onChangeText={(fullName => { setFullName(fullName) })}
            />
            <TextInput style={styles.TextInput}
                placeholder='name@example.com'
                keyboardType='email-address'
                onChangeText={(email => { setEmail(email) })}
            />

            <TextInput style={styles.TextInput}
                placeholder='password'
                keyboardType='visible-password'
                onChangeText={(password => { setPassword(password) })}
                secureTextEntry />
            <TextInput style={styles.TextInput}
                placeholder='confirm password'
                keyboardType='visible-password'
                onChangeText={(confirmPassword => { setConfirmPassword(confirmPassword) })}
                secureTextEntry />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                <ButtonComponent text='Login Screen' onPress={() => navigation.goBack()} />
                <ButtonComponent text='Sign Up' onPress={() => onRegisterPress()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    TextInput: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        width: 300,
        margin: 10,
    }
})