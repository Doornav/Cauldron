import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/welcomeScreenStyles';
import globalStyles from '../styles/globalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WelcomeScreen'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {

 
  return (
    <View style={globalStyles.container}>

    <Text style={globalStyles.title}>Welcome to Cauldron</Text>

    <Text style={globalStyles.description}>Cauldron is a mobile investment solution that allows you to monitor and share your financial assets across multiple different institutions</Text>

    <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={globalStyles.button}>
      <Text style={globalStyles.buttonText}>Create account</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
      <Text style={globalStyles.secondaryButton}>Login</Text>
    </TouchableOpacity>

    </View>
  );
};



export default WelcomeScreen;
