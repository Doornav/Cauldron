// src/screens/SignupScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../auth/AuthContext';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/signupScreenStyles';
import colors from '../assets/constants/colors';

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignupScreen'>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firebaseError, setFirebaseError] = useState('');


  const handleSignup = async () => {
    try {
      const token = await signup(email, password, name);
      console.log("SIGNUP TOKEN RESPONSE: "+ JSON.stringify(token));

      if(token) {
        navigation.navigate("MainApp");
      }
      
    } catch (error: any) {
      console.log(error);
    }
  };



  return (
    <View style={[globalStyles.container, {alignItems: 'center', paddingTop: 100,}]}>
    <Text style={globalStyles.title}>Sign Up</Text>
    {firebaseError ? <Text style={globalStyles.description}>{firebaseError}</Text> : null}

    <Text style={[globalStyles.text, {alignSelf: 'flex-start', marginLeft: 40, marginBottom: 5,}]}>Name</Text>
    <TextInput
      style={globalStyles.input}
      placeholder="Enter you display name"
      placeholderTextColor={'#494D58'}
      value={name}
      onChangeText={setName}
    />
    <Text style={[globalStyles.text, {alignSelf: 'flex-start', marginLeft: 40, marginBottom: 5,}]}>Email Address</Text>
    <TextInput
      style={globalStyles.input}
      placeholder="Enter your email address"
      placeholderTextColor={'#494D58'}
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
    />
    <Text style={[globalStyles.text, {alignSelf: 'flex-start', marginLeft: 40, marginBottom: 5,}]}>Password</Text>
    <TextInput
      style={globalStyles.input}
      placeholder="Enter your password"
      placeholderTextColor={'#494D58'}
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />


    <TouchableOpacity onPress={handleSignup} style={[globalStyles.button, {marginTop: 40, marginBottom: 5,}]}>
      <Text style={globalStyles.buttonText}>
        Sign up
      </Text>
    </TouchableOpacity>


    <TouchableOpacity style={{marginTop: 40}} onPress={() => navigation.navigate('LoginScreen')}>
      <Text style={[globalStyles.secondaryButton]}>
        Already have an account?
        <Text style={[globalStyles.tertiaryButton]}> Log In </Text>
      </Text>
      
    </TouchableOpacity>

    </View>
  );
};



export default SignupScreen;
