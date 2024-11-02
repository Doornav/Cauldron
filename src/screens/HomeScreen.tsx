import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';



type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}


const HomeScreen: React.FC<Props> = ({ navigation }) => {

  const { user, logout } = useAuth(); // Access the user and logout function from AuthContext

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('WelcomeScreen');
    } catch (error) {
      console.log("Logout failed: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.emailText}>Logged in as: {user?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emailText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
