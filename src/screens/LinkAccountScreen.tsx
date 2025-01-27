
import React, { useState, useEffect, useCallback, } from 'react';
import { Alert, View, Text, Image, TouchableOpacity } from 'react-native';
import { create, open, dismissLink, LinkSuccess, LinkExit, LinkIOSPresentationStyle, LinkLogLevel } from 'react-native-plaid-link-sdk';
import colors from '../assets/constants/colors';
import globalStyles from '../styles/globalStyles';
import { useAuth } from '../auth/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { linkTokenRequest, exchangeLinkTokenRequest } from '../services/plaidService';

type LinkAccountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LinkAccountScreen'>;

interface Props {
  navigation: LinkAccountScreenNavigationProp;
}

const LinkAccountScreen: React.FC<Props> = ({ navigation }) => {
  const [linkToken, setLinkToken] = useState(null);
  const {user, token} = useAuth();

  const createLinkToken = useCallback(async () => {
    setLinkToken(await linkTokenRequest(token));    
  }, []);

  useEffect(() => {
    createLinkToken();
  }, [createLinkToken]);

  useEffect(() => {
    if (linkToken) {
      create({
        token: linkToken,
        noLoadingState: false,
      });
    }
  }, [linkToken]);

  
  const handleSuccess = useCallback(
    async (success: LinkSuccess) => {

      const institutionName = success.metadata.institution?.name || null;

      const data = {
        token: token,
        public_token: success.publicToken,
        institution_name: institutionName,
      };

      const access_token = await exchangeLinkTokenRequest(data, token);
      console.log("ACCESS_TOKEN: " + access_token);
      navigation.navigate("MainApp");
    },
    [navigation, user]
  );

  const handleExit = useCallback((linkExit: LinkExit) => {
    dismissLink();
  }, []);

  const handleOpenLink = useCallback(() => {
    if (!linkToken) {
      Alert.alert('Error', 'Link token is not available. Please try again later.');
      return;
    }

    open({
      onSuccess: handleSuccess,
      onExit: handleExit,
      iOSPresentationStyle: LinkIOSPresentationStyle.MODAL,
      logLevel: LinkLogLevel.ERROR,
    });
  }, [handleSuccess, handleExit, linkToken]);

  return (
    <View style={[globalStyles.container, {alignItems: 'center'}]}>
    <Image
        style={{}}
        source={require('../assets/images/Security.png')}
      />
    <Text style={globalStyles.title}>Link your financials</Text>

    <Text style={globalStyles.description}>Calypso uses Plaid to access your financials information across different institutions.</Text>
    <View style={[globalStyles.card, {marginTop: -20, marginBottom: 10}]}>
      <Image
        style={{height: 80, width: 150,}}
       source={require('../assets/images/plaidWhite.png')}
      /> 
    </View>
    <Text style={globalStyles.description}>You will never be asked to provide, share, or distribute additional information</Text>
    
    <TouchableOpacity onPress={handleOpenLink} style={[globalStyles.button, {marginTop: -10, marginBottom: 30}]}>
    <Text style={globalStyles.buttonText}>Connect accounts</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
      <Text style={globalStyles.tertiaryButton}>Skip for now</Text>
    </TouchableOpacity>
  </View>
  );
};

export default LinkAccountScreen;
