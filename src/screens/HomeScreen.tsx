import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/homeScreenStyles';
import { useEffect, useState } from 'react';
import { getAccounts } from '../services/plaidService';

import AccountCard from '../components/accountCard';
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}


interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
}

const coins: Coin[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', price: '$45,898.16', change: '24.55%' },
  { id: '2', name: 'Ethereum', symbol: 'ETH', price: '$5,898.16', change: '2.55%' },
  { id: '3', name: 'Bitcoin', symbol: 'BTC', price: '$45,898.16', change: '24.55%' },
  { id: '4', name: 'Ethereum', symbol: 'ETH', price: '$5,898.16', change: '2.55%' },
  // Add more coins as needed
];

interface Account {
  id: string;
  name: string;
  balance: string;
}

const accounts: Account[] = [
  { id: '1', name: 'Checking Account', balance: '$2,500.00' },
  { id: '2', name: 'Savings Account', balance: '$10,000.00' },
  { id: '3', name: 'Investment Account', balance: '$15,300.00' },
  { id: '4', name: 'Credit Card', balance: '-$500.00' },
  { id: '5', name: 'Credit Card', balance: '-$500.00' },
  // Add more accounts as needed
];


const HomeScreen: React.FC<Props> = ({ navigation }) => {
  

  const { user, token, logout } = useAuth(); // Access the user and logout function from AuthContext





  return (
    <View style={[globalStyles.container, {paddingTop: 60}]}>

      <View style={styles.headerWrapper}>
        <Text style={[globalStyles.title, {fontSize: 25}]}>Hello Pranav</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        
        <ImageBackground
          source={require('../assets/images/Balance.png')}
          style={[styles.balanceCard]}
        >
          <Text style={[styles.cardText, { marginBottom: 10,}]}>Total assets</Text>
          <Text style={[styles.cardTitle, { marginBottom: 50,}]}>$1,000,000</Text>
          <Text style={styles.cardText}>$1,816  Today's Profit</Text>
        </ImageBackground>


        {/* Top Coins Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Coins</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Scroll for Coins */}
        <FlatList
          style={styles.flatList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={coins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.coinCard}>
            
              <Text style={styles.coinName}>{item.name}</Text>
              <Text style={styles.coinPrice}>{item.price}</Text>
              <Text style={[styles.coinChange, { color: item.change.startsWith('-') ? 'red' : 'green' }]}>
                {item.change}
              </Text>
              <View style={styles.chartContainer}>
              
              </View>
            </View>
          )}
        />

        {/* Linked Bank Accounts in 2-Column Grid */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Linked Accounts</Text>
      </View>

      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        nestedScrollEnabled
        contentContainerStyle= {{justifyContent: 'space-evenly', paddingInline: 10}}
        style={{alignSelf: 'center', marginLeft: -5}}
        renderItem={({ item }) => (
        
          <View style={styles.accountCard}>
            <Text style={styles.accountName}>{item.name}</Text>
            <Text style={styles.accountBalance}>{item.balance}</Text>
          </View>
        )}
        columnWrapperStyle={styles.row}
      />

      </ScrollView>
    </View>
  );
};

export default HomeScreen;
