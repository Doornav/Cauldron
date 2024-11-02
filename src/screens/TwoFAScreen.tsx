import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type TwoFAScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TwoFAScreen'>;

interface Props {
  navigation: TwoFAScreenNavigationProp;
}

const TwoFAScreen: React.FC<Props> = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  //const { complete2FAVerification } = useAuth(); // Access the complete2FAVerification function from AuthContext

  const handleVerification = async () => {
    setLoading(true);
    try {
      // Call the complete2FAVerification function in AuthContext with the verification code
     // await complete2FAVerification(verificationCode);

      // If successful, navigate to the HomeScreen
      Alert.alert('Verification Successful', 'You are now logged in!');
      navigation.navigate('HomeScreen');
    } catch (error) {
      // If verification fails, show an error message
      Alert.alert('Verification Failed', 'Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Two-Factor Authentication</Text>
      <Text style={styles.instructions}>
        Please enter the verification code sent to your phone.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter verification code"
        keyboardType="number-pad"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Button title="Verify Code" onPress={handleVerification} disabled={loading} />
    </View>
  );
};

export default TwoFAScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
