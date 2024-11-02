// src/screens/SignupScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../auth/AuthContext';
import { handleFirebaseError } from '../utils/firebaseErrorHandler';

import globalStyles from '../styles/globalStyles';
import styles from '../styles/signupScreenStyles';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignupScreen'>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firebaseError, setFirebaseError] = useState('');


  const handleSignup = async () => {
    try {
      await signup(email, password, phoneNumber);
      console.log('User signed up successfully');
      // Redirect to login or main screen after successful signup
      navigation.navigate('VerifyEmailScreen');
    } catch (error: any) {
      console.log(error.message);
      handleFirebaseError(error, {setFirebaseError});
    }
  };

  return (
    <View style={globalStyles.container}>
    <Text style={globalStyles.title}>Sign Up</Text>
    {firebaseError ? <Text style={globalStyles.description}>{firebaseError}</Text> : null}
    <TextInput
      style={globalStyles.input}
      placeholder="Name"
      value={name}
      onChangeText={setName}
    />
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

    <TextInput
      style={globalStyles.input}
      placeholder="Phone Number"
      value={phoneNumber}
      onChangeText={setPhoneNumber}
      secureTextEntry
    />

    <TouchableOpacity onPress={handleSignup} style={globalStyles.button}>
      <Text style={globalStyles.buttonText}>
        Signup
      </Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
      <Text style={globalStyles.secondaryButton}>
        Already have an account? Log In
      </Text>
    </TouchableOpacity>

    </View>
  );
};



export default SignupScreen;
