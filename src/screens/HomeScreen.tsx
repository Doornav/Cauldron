import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, FlatList, Image, Dimensions } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/homeScreenStyles';
import CustomCard from '../components/CustomCard';
import { PieChart } from 'react-native-gifted-charts';
import colors from '../assets/constants/colors';

const screenWidth = Dimensions.get('window').width;

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, accounts, goals,} = useAuth(); // Access accounts from AuthContext


  const mapGoalDataForGiftedPieChart = (goal: Goal) => {
    const allocatedAmounts = goal.allocatedAccounts.map((account) => ({
      value: account.allocatedAmount,
      label: account.accountName,
    }));
  
    // Calculate the remaining amount
    const remainingAmount = goal.targetAmount - goal.currentAmount;
  
    // Add the remaining amount as a segment if it's greater than 0
    if (remainingAmount > 0) {
      allocatedAmounts.push({
        value: remainingAmount,
        label: "Remaining Amount",
        color: 'gray'
      });
    }
  
    return allocatedAmounts;
  };

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };
  



  return (
    <View style={[globalStyles.container, { paddingTop: 60 }]}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Text style={[globalStyles.title, { fontSize: 25 }]}>
          Hello {user?.name || 'User'}
        </Text>
      </View>

      <ScrollView>
        {/* Balance Card */}
        <ImageBackground
          source={require('../assets/images/Balance.png')}
          style={[styles.balanceCard]}
        >
          <Text style={[styles.cardText, { marginBottom: 10 }]}>Total assets</Text>
          <Text style={[styles.cardTitle, { marginBottom: 35 }]}>
            ${accounts.reduce((total, account) => total + account.balance, 0).toLocaleString()}
          </Text>
          <Text style={[styles.cardText, {marginBottom: 10}]}>$1,816 Today's Profit</Text>
          <Text style={styles.cardText}>Month of November: +$300</Text>
        </ImageBackground>


        {/* Goals ?Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Goals</Text>
          <Text style={styles.seeAll} onPress={() =>navigation.navigate("PortfolioScreen")}>See All</Text>
        </View>

        <FlatList
          scrollEnabled={false}
          data={goals}
          keyExtractor={(goal) => goal.createdDate} // Use title as the unique key
          numColumns={1} // Display two cards per row
          nestedScrollEnabled
          contentContainerStyle={{ justifyContent: 'space-evenly', padding: 10 }}
          style={{ alignSelf: 'center' , marginTop: -15}}
          renderItem={({ item }) => {
            return (
              <View style={{ marginTop: 15 }}>
                <CustomCard
                  primaryColor={"#FFAA33"} // Replace with any desired color or dynamic logic
                  height={170}
                  width={screenWidth - 20} // Adjust width for spacing
                >
                  <View style={{flexDirection:'row',}}>

                  
                  <View style={{ padding: 15 }}>
                    {/* Goal Title */}
                    <Text style={styles.goalTitle}>{item.title}</Text>
         
                    <Text style={styles.goalDate}>Started {item.createdDate?.split("T")[0]}</Text>
                    
                    <View style={{flexDirection:'row', paddingTop: 65}}> 
                      {/* Current Amount */}
                      <Text style={styles.goalAmount}>
                      ${item.currentAmount}/
                      </Text>
                      {/* Goal Amount */}
                      <Text style={styles.goalAmount}>
                        ${item.targetAmount}
                      </Text>
                    </View>

                   
                    
                  </View>

                  <View style={{alignContent: 'center', marginLeft: 0, marginTop: 10}}>

                  <PieChart
                    data={mapGoalDataForGiftedPieChart(item)} // Data for the chart
                    donut // Enable donut style
                    showText // Display text inside the chart
                    textColor="white" // Text color
                    textSize={14} // Text size
                    radius={80} // Outer radius
                    
                    innerRadius={65} // Inner radius (to make it a donut)
                    innerCircleColor={colors.secondary}
                    centerLabelComponent={() => {
                      // Render the legend inside the transparent center
                      return (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                          {renderDot(colors.tertiary)} 
                          <Text>Plaid Savings</Text>
                        </View>
                      );
                    }}
                  />
                  </View>
                  </View>
                </CustomCard>
              </View>
            );
          }}
          
        />


        {/* Linked Accounts Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Linked Accounts</Text>
          <Text style={styles.seeAll} onPress={() =>navigation.navigate("PortfolioScreen")}>See All</Text>
        </View>

   

        <FlatList
          scrollEnabled={false}
          data={accounts}
          keyExtractor={(item) => item.accountId} // Assuming accounts have an accountId
          numColumns={2}
          nestedScrollEnabled
          contentContainerStyle={{ justifyContent: 'space-evenly', paddingInline: 10 }}
          style={{ alignSelf: 'center', marginLeft: -5  }}
          renderItem={({ item }) => {
            // Handle institution data as an array
            const institution = Array.isArray(item.institution) ? item.institution[0] : item.institution;

            return (
              <View style={{margin: 5}}>
                <CustomCard
                  primaryColor={institution.primary_color}
                  height={150}
                  width={screenWidth / 2 - 15}
                >
                  <View style={{padding: 10}}>
                <View style={{flexDirection: 'row', marginBottom: 10 }}>
                {/* Institution Logo */}
                {institution?.logo && (
                  <Image
                    source={{ uri: `data:image/png;base64,${institution.logo}` }}
                    style={styles.institutionLogo}
                  />
                )}

                {/* Institution Name */}
                <Text
                  style={styles.institutionName}
                  onPress={() => console.log(institution)}
                >
                  {institution?.name || 'Unknown Institution'}
                </Text>
                </View>
                {/* Account Details */}
                <Text style={styles.accountName}>{item.accountName}</Text>
                <Text style={styles.accountBalance}>${item.balance.toLocaleString()}</Text>
                </View>
                </CustomCard>
                </View>
              
            );
          }}
          columnWrapperStyle={styles.row}
        />

      </ScrollView>
    </View>
  );
};

export default HomeScreen;
