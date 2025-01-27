import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/welcomeScreenStyles';
import globalStyles from '../styles/globalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../auth/AuthContext';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WelcomeScreen'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, token, accounts } = useAuth();
  useEffect(()=> {  
    console.log("USER", user);
    console.log("TOKEN", token);
    console.log("ACCOUNTS" , accounts);
  });
  return (
    <View style={globalStyles.container}>
    <View style={styles.welcomeCard}>
    <Image
        // style={styles.tinyLogo}
        source={require('../assets/images/7.png')}
      />
    </View>

    <View style={styles.bottomContainer}>

      <Text style={globalStyles.title}>Welcome to Cauldron</Text>

      <Text style={[globalStyles.description, {marginBottom: 70,}]}>Cauldron is a mobile investment solution that allows you to monitor and share your financial assets across multiple different institutions</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={[globalStyles.button, {marginBottom: 20}]}>
        <Text style={globalStyles.buttonText}>Create account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={globalStyles.secondaryButton}>Login</Text>
      </TouchableOpacity>

    </View>
    

    </View>
  );
};



export default WelcomeScreen;
