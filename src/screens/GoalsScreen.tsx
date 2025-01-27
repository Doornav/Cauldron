import React, { useEffect, useState,  } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert
  
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../auth/AuthContext'; // Access accounts from AuthContext
import globalStyles from '../styles/globalStyles';
import styles from '../styles/goalsStyles';
import colors from '../assets/constants/colors';
import CustomCard from '../components/CustomCard';
import { AllocatedAccount } from '../types/goalsTypes';
import { Goal } from '../types/goalsTypes';
const screenWidth = Dimensions.get('window').width;



const currentDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long', // e.g., "Monday"
  month: 'long',   // e.g., "November"
  day: 'numeric',  // e.g., "27"
  year: 'numeric', // e.g., "2024"
});

const GoalsScreen: React.FC = () => {
  const { accounts, user, setGoals, goals, handleGoalMetrics } = useAuth(); // Fetch accounts and balances from AuthContext
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [goalName, setGoalName] = useState(''); // Temporary state for goal name
  const [targetAmount, setTargetAmount] = useState<number>(0); // Temporary state for goal target amount
  const [accountModalVisible, setAccountModalVisible] = useState(false); // Account selection modal visibilit
  const [allocatedAccounts, setAllocatedAccounts] = useState<AllocatedAccount[]>([]);
  const [totalAllocated, setTotalAllocated] = useState<number>(0);




const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null); // Selected account
const [allocationPercentage, setAllocationPercentage] = useState<number>(0); // Allocation percentage

const handleAllocationChange = (accountId: string | null, percentage: number) => {
  if (percentage > 0 && accountId) {
    const account = accounts.find((acc) => acc.accountId === accountId);
    if (account) {
      setAllocatedAccounts((prev) => [
        ...prev,
        { accountId: account.accountId, accountName: account.accountName, percentageAllocated: percentage  },
      ]);

      setTotalAllocated(totalAllocated + ((account?.balance  || 0) * (percentage / 100)));
      console.log("ALLOCATION: ", JSON.stringify(allocatedAccounts, null, 2));
    }

    setSelectedAccountId(null); // Reset selection
    setAllocationPercentage(0); // Reset percentage
  }
};

const removeGoal = (goalToRemove: Goal) => {
  setGoals((prevGoals) =>
    prevGoals.filter((goal) => goal.createdDate !== goalToRemove.createdDate)
  );
};

const createNewGoal = () => {
  // Validate user input
  if (!goalName || !targetAmount || allocatedAccounts.length === 0) {
    Alert.alert('Error', 'Please enter all required information and allocate at least one account.');
    return;
  }


  if (targetAmount < totalAllocated) {
    Alert.alert('Error', 'The total allocation percentage cannot exceed the goal.');
    return;
  }

  // Create the new goal object
  const newGoal = {
    title: goalName,
    targetAmount: targetAmount,
    createdDate: new Date().toISOString(), // Record the creation date
    allocatedAccounts: allocatedAccounts

  };

  setGoals((prevGoals) => [...prevGoals, newGoal]);
  
  console.log("GOALS" , goals);
  // Clear input fields and close modal
  setGoalName('');
  setTargetAmount(0);
  setAllocatedAccounts([]);
  setAllocationPercentage(0);
  setTotalAllocated(0);
  setModalVisible(false);

  Alert.alert('Success', 'New goal created successfully!');
};



  return (
    <View style={globalStyles.container}>

      <View style={[globalStyles.container, { paddingTop: 60 }]}>
      {/* Header */}
      <View style={[{paddingLeft: 15}]}>
        <Text style={[globalStyles.title, { fontSize: 25 }]} onPress={handleGoalMetrics}>
          {user?.name || 'User'}'s Goals
        </Text>
        <Text style={[globalStyles.title, { fontSize: 20 }]}>
          {currentDate}
        </Text>
      </View>
      </View>
      {/* Goals List */}
      <ScrollView style={styles.scrollView}>
        {goals.map((goal) => (
          <View key={goal.createdDate} style={styles.goalCard}>
            <CustomCard
              height={120}
              width={screenWidth - 20}
              primaryColor={colors.tertiary}>

            <View>
            <View style={{margin: 10}}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <Text style={styles.goalSubtitle}>
                Target: ${goal.targetAmount}
              </Text>
              <Text style={styles.goalSubtitle}>
                Allocated: ${goal.currentAmount}
              </Text>
              <Text style={styles.goalSubtitle}>
                From Accounts: {goal.allocatedAccounts.map((acc) => acc.accountName).join(', ')}
              </Text>

            </View>
            <TouchableOpacity onPress={() => {removeGoal(goal)}}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
            </View>
            </CustomCard>
            
          </View>
        ))}
      </ScrollView>

      {/* Add Goal Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Goal</Text>
      </TouchableOpacity>

      {/* Modal for Adding Goal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Goal</Text>
            
            {/* Goal Name Input */}
            <TextInput
              style={styles.input}
              placeholder="Goal Name"
              value={goalName}
              onChangeText={setGoalName}
            />
            
            {/* Target Amount Input */}
            <TextInput
              style={styles.input}
              placeholder="Target Amount"
              value={targetAmount ? targetAmount.toString() : ''} // Display as a string
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (!isNaN(numericValue)) {
                  setTargetAmount(numericValue); // Set as a number
                } else if (text === '') {
                  setTargetAmount(0); // Handle empty input
                }
              }}
              keyboardType="numeric"
            />
            
            {/* List of Allocated Accounts */}
            <Text style={[styles.subtitle, {marginBottom: 10}]}>Allocated Accounts:</Text>
            <FlatList
              data={allocatedAccounts}
              keyExtractor={(item) => item.accountId}
              renderItem={({ item }) => (
                <View style={styles.allocatedAccount}>
                  <Text style={styles.accountName}>{item.accountName} - ${item.balance}:    </Text>
                  <Text style={styles.percentageAllocated}>
                    {item.percentageAllocated}%
                  </Text>
                </View>
              )}
              ListEmptyComponent={
                <Text style={[styles.emptyText, {color: 'lightgray'}]}>No accounts allocated yet.</Text>
              }
            />

            <Text style={[styles.emptyText, {marginTop: 10}]} >${totalAllocated} Total Allocated</Text>
            
            {/* Button to Add Account */}
            <TouchableOpacity
              style={styles.addAccountButton}
              onPress={() => setAccountModalVisible(true)}
            >
              <Text style={styles.addAccountButtonText}>+ Add Account</Text>
            </TouchableOpacity>
            
            {/* Action Buttons */}
            <View style={styles.modalActions}>
             
           
            {/* Close Button */}
            <TouchableOpacity  style={styles.closeButton}onPress={() => {setModalVisible(false); console.log("GOAL", goals)}}>
            <Text style = {styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>

               {/* Allocate Button */}
            <TouchableOpacity style={styles.okButton} onPress={() => {createNewGoal(); console.log("GOAL", goals)}}>
            <Text style = {styles.okButtonText}>Allocate</Text>
            </TouchableOpacity>
         
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Account Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={accountModalVisible}
        onRequestClose={() => setAccountModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Allocate Funds to a Goal</Text>

            {/* Dropdown Menu for Account Selection */}
            <View>
              <Text style={styles.dropdownLabel}>Select an Account</Text>
              <Picker
                selectedValue={selectedAccountId}
                onValueChange={(itemValue) => setSelectedAccountId(itemValue)} // Use `itemValue` directly
                style={styles.dropdown}
              >
                {accounts.map((account) => (
                  <Picker.Item
                    key={account.accountId}
                    color="white"
                    fontFamily="Merriweather Sans"
                    label={`${account.accountName} - $${account.balance.toLocaleString()}`}
                    value={account.accountId} // Pass `account.accountId` as the `value`
                  />
                ))}
              </Picker>
            </View>

            {/* Percentage Slider */}
            <Text style={styles.emptyText}>Allocation Percentage: {allocationPercentage}%</Text>
            <Slider
      
              minimumValue={0}
              maximumValue={100}
              step={1} // Adjust slider in increments of 1%
              value={allocationPercentage}
              onValueChange={(value) => setAllocationPercentage(value)}
              minimumTrackTintColor={colors.tertiary}
              maximumTrackTintColor={colors.background}
            />

            {/* Allocate Button */}
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>

              {/* Close Button */}
            <TouchableOpacity  style={styles.closeButton} onPress={() => {setAccountModalVisible(false)}}>
              <Text style = {styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.okButton} onPress={() => {handleAllocationChange(selectedAccountId, allocationPercentage);
                setAccountModalVisible(false);}}>
              <Text style = {styles.okButtonText}>Allocate</Text>
            </TouchableOpacity>
            </View>
           


          </View>
        </View>
      </Modal>

    </View>
  );
};




export default GoalsScreen;
