// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../auth/AuthContext';


//styles
import styles from '../styles/loginScreenStyles';
import globalStyles from '../styles/globalStyles';


type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {

    const { login , user, token } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firebaseError, setFirebaseError] = useState('');

    const handleLogin = async () => {
        try {
            const token = await login(email, password);
            console.log("ASDFASFSAFS"+token)
            if(token) {
                navigation.navigate("MainApp");
            }
            
        } catch (error: any) {
            console.log(error);
        }
    };

    
    return (
<View style={[globalStyles.container, {alignItems: 'center', paddingTop: 100,}]}>
    <Text style={globalStyles.title}>Log in</Text>
    {firebaseError ? <Text style={globalStyles.description}>{firebaseError}</Text> : null}


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


    <TouchableOpacity onPress={handleLogin} style={[globalStyles.button, {marginTop: 40, marginBottom: 5,}]}>
      <Text style={globalStyles.buttonText}>
        Log in
      </Text>
    </TouchableOpacity>


    <TouchableOpacity style={{marginTop: 40}} onPress={() => navigation.navigate('SignupScreen')}>
      <Text style={[globalStyles.secondaryButton]}>
        New to Cauldron?
        <Text style={[globalStyles.tertiaryButton]}> Create an account </Text>
      </Text>
      
    </TouchableOpacity>

    </View>
    );
};



export default LoginScreen;
