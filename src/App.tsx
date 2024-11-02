import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './auth/AuthContext';
import { RootStackParamList } from './types/navigation';


//Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';

const Stack = createStackNavigator<RootStackParamList>();
const App = () => {


  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}



export default App;
