import { StyleSheet } from 'react-native';
import colors from '../assets/constants/colors';

const portfolioStyles = StyleSheet.create({
    centerLabel: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    centerValue: {
      fontSize: 16,
      color: 'gray',
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
      maxHeight: 40,
    },
    accountButton: {
      backgroundColor: colors.secondary,
      paddingVertical: 10,
      paddingHorizontal: 15,
    
     
    },
    selectedAccountButton: {
        backgroundColor: colors.tertiary,
        shadowColor: 'black',
        
      },
    accountButtonText: {
      fontFamily: 'Merriweather Sans',
      fontSize: 14,
      color: 'white',
      fontWeight: 'bold',
    },
    accountDetailsCard: {
      backgroundColor: colors.secondary,
      height: 290,
      margin: 10,
      
      borderRadius: 10,
    },
    fullWidthCard: {
  
      height: 290,
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16,
      color: 'gray',
    },
    tabText: {
      fontSize: 16,
      color: 'gray',
    },
    activeTab: {
      borderBottomColor: colors.primary,
      color: colors.primary,
      fontWeight: 'bold',
      borderBottomWidth: 2,
      paddingBottom: 4
    },
    activeTabText: {

      color: colors.primary,
      fontWeight: 'bold',
    },
    tabTitle:{
      color: 'white',
      fontFamily: 'Merriweather Sans',
      fontSize: 20,
    },
    tabSubTitle:{
      color: 'gray',
      fontFamily: 'Merriweather Sans',
      fontSize: 15,
    },
    tabContent: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center', // Align arrow and text vertically
      marginVertical: 5, // Add spacing between rows
    },
    rowText: {
      marginLeft: 8, // Add spacing between the arrow and the text
    },
    tabBalance: {
      color: "white",
      marginTop: 10,
      fontFamily: 'Merriweather Sans',
      fontSize: 26,
    },
    tabIncome: {
      color: "white",
      marginTop: 20,
      fontFamily: 'Merriweather Sans',
      fontSize: 18,
    },
    tabExpenses: {
      color: "white",
      marginTop: 10,
      fontFamily: 'Merriweather Sans',
      fontSize: 18,
    },
    tabContentText: {
      fontSize: 16,
      color: 'white',
    },
    bottomSection: {
      flex: 1,
    },
    historyTitle: {
      marginTop: -10,
      color: 'white',
      fontFamily: 'Merriweather Sans',
      fontSize: 16,
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
    text: {
      fontSize: 20,
      color: 'black',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background, // Background similar to your image
        padding: 15,
        marginHorizontal: 5,

      },
      iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
      },
      icon: {
        fontSize: 18,
        color: 'white', // Placeholder for actual icon colors
      },
      textContainer: {
        flex: 2,
      },
      listItemTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
      },
      listItemSubtitle: {
        fontSize: 12,
        color: 'gray',
      },
      valueContainer: {
        alignItems: 'flex-end',
      },
      listItemValue: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
      },
      listItemSubValue: {
        fontSize: 12,
        color: 'gray',
      },
  });

  export default portfolioStyles;