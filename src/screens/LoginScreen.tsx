// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../auth/AuthContext';
import { handleFirebaseError } from '../utils/firebaseErrorHandler';

//styles
import styles from '../styles/loginScreenStyles';
import globalStyles from '../styles/globalStyles';


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {

    const { checkEmailVerification, login } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firebaseError, setFirebaseError] = useState('');

    const handleLogin = async () => {

        try {
            await login(email, password); // Use Firebase login
            const isVerified = await checkEmailVerification();
            if (isVerified) {
                navigation.navigate('HomeScreen');
            } else {
                navigation.navigate('VerifyEmailScreen');
            }
            
        
        } catch (error: any) {
            
            handleFirebaseError(error, {setFirebaseError});

        }
    };


    return (
        <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Login</Text>
        {firebaseError ? <Text style={globalStyles.description}>{firebaseError}</Text> : null}
        <TextInput
            style={globalStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={globalStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin} style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>
                Login
            </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={globalStyles.secondaryButton}>
                Don't have an account? Sign up
            </Text>
        </TouchableOpacity>

        </View>

    );
};



export default LoginScreen;
