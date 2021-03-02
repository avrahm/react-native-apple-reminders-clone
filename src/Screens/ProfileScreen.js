import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native';

import ButtonComponent from '../Components/ButtonComponent'

export default function ProfileScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleSignUp = async () => {
        alert('signup')
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
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

            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                <ButtonComponent text='Login' onPress={() => alert('login')} />
                <ButtonComponent text='Sign Up' onPress={() => handleSignUp()} />
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