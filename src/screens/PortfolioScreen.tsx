import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../assets/constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { getAccounts } from '../services/plaidService';
import { useAuth } from '../auth/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

interface Account {
  id: string;
  name: string;
}

type PortfolioScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PortfolioScreen'>;

interface Props {
  navigation: PortfolioScreenNavigationProp;
}

interface Account {
  accountId: string;
  institutionName: string;
  accountType: string;
  balance: number;
}

const PortfolioScreen: React.FC<Props> = () => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
    const { token } = useAuth();


    const fetchAccountDetails = async () => {
        try {
          console.log("TOKEN:", token);
          const response = await getAccounts(token);
          console.log("Fetched response:", response);
    
          // Verify response has the expected data structure
          if (response && Array.isArray(response.accounts)) {
            console.log("Accounts data:", response.accounts);
            setAccounts(response.accounts); // Set accounts array
          } else {
            console.warn("Accounts data is not an array or is undefined:", response.accounts);
            setAccounts([]); // Fallback to an empty array
          }
        } catch (error) {
          console.error("Error fetching accounts:", error);
          setAccounts([]); // Empty array on error
        }
      };


      useFocusEffect(
        useCallback(() => {
          fetchAccountDetails();
        }, [])
      );

  
 
  const handleAccountPress = (account: Account) => {
    setSelectedAccount(account);
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={fetchAccountDetails}>
           <Text style={styles.title}>Portfolio</Text> 
        </TouchableOpacity>
      

      {/* Linked Accounts Scrollable List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {accounts.map((account) => (
          <TouchableOpacity
            key={account.institutionName}
            style={[styles.accountButton, selectedAccount?.id === account.id && styles.selectedAccountButton]}
            onPress={() => handleAccountPress(account)}
          >
            <Text style={styles.accountButtonText}>{account.institutionName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Account Details Card */}
      {selectedAccount && (
        <View style={styles.accountDetailsCard}>
          <Text style={styles.accountDetailsTitle}>{selectedAccount.institutionName}</Text>
          <Text style={styles.accountDetailsInfo}>Account Number: {selectedAccount.accountId}</Text>
          <Text style={styles.accountDetailsInfo}>Balance: {selectedAccount.balance}</Text>
          <Text style={styles.accountDetailsInfo}>Today's Gain: $2202.42</Text>
          <Text style={styles.accountDetailsInfo}>Overall Loss: $5200.11</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: colors.background,

  },
  title: {
    fontFamily: 'Merriweather Bold',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 40,
  },
  accountButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedAccountButton: {
    backgroundColor: '#FFB300',
  },
  accountButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  accountDetailsCard: {
    backgroundColor: colors.secondary,
    height: 590,
    padding: 20,
    marginInline: 10,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  accountDetailsTitle: {
    fontFamily: "Merriweather Bold",
    color: "white",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountDetailsInfo: {
    fontFamily: "Merriweather Bold",
    color: "white",
    fontSize: 16,

    marginBottom: 5,
  },
});

export default PortfolioScreen;
