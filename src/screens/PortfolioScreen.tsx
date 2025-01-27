import React, { useEffect, useState, } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../auth/AuthContext';
import { LineChart, PieChart } from 'react-native-gifted-charts';
import { RootStackParamList } from '../types/navigation';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/portfolioStyles'
import { Account, Transaction } from '../types/accountTypes';
import colors from '../assets/constants/colors';
import CustomCard from '../components/CustomCard';

//Icons
import RedArrowIcon from '../assets/icons/red_arrow.svg';

import GreenArrowIcon from '../assets/icons/green_arrow.svg';


type PortfolioScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PortfolioScreen'>;

const icons = {
  greenArrow : GreenArrowIcon,
  redArrow : RedArrowIcon
};

interface CategoryExpense {
  category: string;
  total: number;
}

interface Props {
  navigation: PortfolioScreenNavigationProp;
}


const PortfolioScreen: React.FC<Props> = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null); // State for selected account
  const { accounts, token } = useAuth();
  const [income, setIncome] = useState(Number);
  const [expenses, setExpenses] = useState(Number);
  const [categoryTotals, setCategoryTotals] = useState<CategoryExpense[]>([]); // State for category totals
  const [activeTab, setActiveTab] = useState('Tab 1');
  const [showPieChart, setShowPieChart] = useState<'income' | 'expenses' | null>(null);
  const [accountCardColor, setAccountCardColor] = useState<string>(colors.secondary); // Default color
  const [institutionColor, setInstitutionColor] = useState<string>(colors.secondary);

  const changeInstitutionColor = (newColor: string) => {
    setInstitutionColor(newColor);
  }

  const handleAccountSelection = (account: Account) => {
    setSelectedAccount(account); // Update selected account
    setInstitutionColor(account.institution[0].primary_color); // Update card color
    setTransactions(account.transactions);
  };


  const handleSetAccountCardColor = (account: Account) => {
    if (activeTab === 'Tab 1') {
      setAccountCardColor(account?.institution[0].primary_color);
    }
    else {
      setInstitutionColor(account?.institution[0].primary_color)
    }
  }



  const calculateIncomeAndExpenses = (account: Account | null) => {
    let income = 0;
    let expenses = 0;
  
    if(account){
      account.transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount; // Positive amounts are income
      } else {
        expenses += Math.abs(transaction.amount); // Negative amounts are expenses
      }
    });
    }
    // Iterate over transactions
    
  
    setIncome(income);
    setExpenses(expenses);
  };

    

  const addOpacityToColor = (hexColor: string, opacity: number): string => {
    // Remove the "#" if it exists
    const cleanHex = hexColor.replace('#', '');
  
    // Parse the RGB values from the hex string
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
  
    // Return the color in rgba() format
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  // Adjust the opacity of the institution color
  const fadedInstitutionColor = addOpacityToColor(institutionColor, 0.5);
  

   



  // Map balance history to data points for the graph
  const lineChartData = selectedAccount?.balanceHistory?.map((entry) => ({
    value: entry.balance,
    label: new Date(entry.timestamp).toLocaleDateString('en-US', {
      month: 'short', // Abbreviated month (e.g., Jan, Feb)
      day: 'numeric', // Numeric day (e.g., 1, 25)
    }), // Format as "Jan 1", "Feb 25", etc.
  })) || [];
  
  
 

  return (
    <View style={[globalStyles.container, {paddingTop: 60}]}>
        <TouchableOpacity onPress={() => console.log("TOKEN: ", token)}>
          <Text style={styles.title}>Portfolio</Text> 
        </TouchableOpacity>
        

      
   
      {/* Linked Accounts Scrollable List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.scrollContainer, {alignSelf: 'center'}]}>
        {accounts.map((account) => (
          <TouchableOpacity
            key={account.accountId}
            style={[
              styles.accountButton,
              selectedAccount?.accountId === account.accountId && styles.selectedAccountButton, // Highlight selected
            ]}
            onPress={() => { // Set selected account on press
              calculateIncomeAndExpenses(selectedAccount);
              handleAccountSelection(account);
              handleSetAccountCardColor(account);
            }}>
              
            <Text style={styles.accountButtonText}>{account.accountName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      

      
      <View style={{alignSelf: 'center', marginTop: 10}}>     
      <CustomCard
        primaryColor={accountCardColor}
        secondaryColor={colors.secondary}
        height={290}
        width={370}
        >
        


        <View style={{width: 370}}>
      {/* Top Section with Tabs */}
      <View style={{flex: 1,}}>
        <View style={{flexDirection: 'row', paddingBottom: 4, backgroundColor: colors.secondary, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'Tab 1' && styles.activeTab,
            ]}
            onPress={() => {setActiveTab('Tab 1'); setAccountCardColor(institutionColor)}}
            
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Tab 1' && styles.activeTabText,
              ]}
            >
              Summary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'Tab 2' && styles.activeTab,
            ]}
            onPress={() => {setActiveTab('Tab 2'); setAccountCardColor(colors.secondary)}}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Tab 2' && styles.activeTabText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Based on Active Tab */}
        {activeTab === 'Tab 1' ? (
         
          <View style={{padding: 20}}>
          <Text style={styles.tabTitle}>{selectedAccount?.accountName}</Text>
          <Text style={styles.tabSubTitle}>{selectedAccount?.institution[0].name}</Text>
          <Text style={styles.tabBalance}>${selectedAccount?.balance}</Text>
          <TouchableOpacity
            onPress={() => setShowPieChart('income')}
            style={styles.row}
          >
            <View style>
              <icons.greenArrow width={24} height={24} />
            </View>
            
            <Text style={[styles.tabIncome, styles.rowText]}>Monthly Income: {income}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowPieChart('expenses')}
            style={styles.row}
          >
            <icons.redArrow width={24} height={24} />
            <Text style={[styles.tabExpenses, styles.rowText]}>Monthly Expenses: {expenses}</Text>
          </TouchableOpacity>
    
          </View>
        ) : (
          <View style={styles.tabContent}>
            <Text style={styles.historyTitle}>{selectedAccount?.accountName}</Text>
            {lineChartData.length > 0 ? (
              <LineChart
              areaChart
              data={lineChartData}
              width={300}
              hideDataPoints
              spacing={100}
              color={institutionColor}
              thickness={2}
              startFillColor="rgba(20,105,81,0.3)"
              endFillColor="rgba(20,85,81,0.01)"
              startOpacity={0.9}
              endOpacity={0.2}
              initialSpacing={0}
              noOfSections={6}
              maxValue={((selectedAccount?.balance) + 50)}
              yAxisColor="white"
              yAxisThickness={0}
              rulesType="solid"
              rulesColor="gray"
              yAxisTextStyle={{color: 'gray'}}
              yAxisSide='right'
              xAxisColor="lightgray"
              />
            ) : (
              <Text>No balance history available.</Text>
            )}
          </View>
        )}
      </View>

      </View>
      </CustomCard>
      </View>
  

     

     {/* Bottom Section with Scrollable List */}
<View style={{ flex: 1 }}>
  {/* Check if an account is selected */}
  <Text style={{fontSize: 20, color: 'white', fontFamily: 'Merriweather Sans', marginTop: 15, marginLeft: 10}}>Transactions</Text>
  {selectedAccount ? (
    // ScrollView to display transactions
    <ScrollView showsVerticalScrollIndicator={false}>
      {transactions.map((transaction, index) => (
        <View key={transaction.transactionId || index} style={styles.listItem}>
          <View style={styles.textContainer}>
            <Text style={styles.listItemTitle}>{transaction.name}</Text>
            <Text style={styles.listItemSubtitle}>{transaction.date}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.listItemValue}>${transaction.amount.toFixed(2)}</Text>
            <Text style={styles.listItemSubValue}>
              {transaction.category}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  ) : (
    // Placeholder message when no account is selected
    <View style={{ alignSelf:"center" , alignItems: 'center', justifyContent: 'center', flex: 1 , width: 250}}>
      <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
        Please click on an account to see its details.
      </Text>
    </View>
  )}
</View>


      
        
    </View>
  );
};






export default PortfolioScreen;
