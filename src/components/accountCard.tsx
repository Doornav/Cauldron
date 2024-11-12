import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../assets/constants/colors';
import globalStyles from '../styles/globalStyles';

interface Account {
  accountId: string;
  institutionName: string;
  accountType: string;
  balance: number;
}
interface BankAccountSelectorProps {
  accounts: Account[];
}

const AccountCard: React.FC<BankAccountSelectorProps> = ({ accounts }) => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 365,
    alignItems: "flex-start",
    backgroundColor: colors.secondary,
    borderRadius: 10,  // Rounded edges
    width: '100%',
    padding: 20,
    
  },

  title:{
    fontFamily: "Merriweather Sans",
    color: "white",
    fontSize: 20,
  }

});

export default AccountCard;
