import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../auth/AuthContext';

type VerifyEmailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyEmailScreen'>;

interface Props {
  navigation: VerifyEmailScreenNavigationProp;
}

const VerifyEmailScreen: React.FC<Props> = ({ navigation }) => {
    const { user, sendVerificationEmail, checkEmailVerification } = useAuth();
    
    const handleSendVerificationEmail = async () => {
        try{
            await sendVerificationEmail();
            Alert.alert("Verification Email Sent", "Please check your inbox to verify your email.");

        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        }
    }

    const handleCheckEmailVerification = async () => {
        
        const isVerified = await checkEmailVerification();
        if (isVerified) {
            Alert.alert("Email Verified", "Your email has been verified!");
            navigation.navigate('HomeScreen'); // Navigate to HomeScreen if verified
          } else {
            Alert.alert("Email Not Verified", "Please check your inbox and verify your email.");
          }
    };


    return (
        <View style={globalStyles.container}>

        <Text style={globalStyles.title}>Verify your email</Text>

        <Text style={globalStyles.description}>We have sent a verification link to the email associated with your account. Please verify your email to continue.</Text>
            
        <TouchableOpacity onPress={handleSendVerificationEmail} style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>Send Verification Email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCheckEmailVerification} style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>Check if Email Verified</Text>
        </TouchableOpacity>

        </View>
    );
}

export default VerifyEmailScreen;


    
