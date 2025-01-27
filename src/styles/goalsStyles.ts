import { StyleSheet } from "react-native";
import colors from "../assets/constants/colors";

const goalsStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    accountBalance: {
  
    },
    accountButton: {
  
    },
    accountButtonText: {
  
    },
    scrollView: {
      width: '95%',
      alignSelf: 'center'
    },
    goalCard: {
      flexDirection: 'row',
      marginBlock: 10,
    },
    goalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Merriweather Sans',
      color: 'white'
    },
    goalSubtitle: {
      fontSize: 16,
      color: 'white',
      fontFamily: 'Merriweather Sans',

    },
    removeButton: {
      color: 'red',
      fontSize: 14,
      fontWeight: 'bold',
    },
    addButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 50,
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: 10,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 89,
      alignItems: 'center',
  
    },
    subtitle:{
        color: 'white',
        fontFamily: 'Merriweather Sans',
        fontSize: 16
    },
    modalContent: {
      width: '95%',
      padding: 20,
      backgroundColor: colors.secondary,
      borderRadius: 8,
      shadowColor: '#000',
      
      shadowOpacity: 0.55,
      shadowRadius: 4,
      elevation: 5,
    },
    allocatedAccount:{
        marginBlock: 10,
        backgroundColor: colors.tertiary,
        flexDirection: 'row',
        height: 30,
        borderRadius: 10,
        paddingLeft: 10,
        paddingTop: 4,
        
    },
    addAccountButtonText: {
        color: 'white',
        fontFamily: 'Merriweather Sans',
        fontSize: 16
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Merriweather Sans',
      color: 'white',
      marginBottom: 15,
    },
    dropdownLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Merriweather Sans',
        color: 'white',
        marginBottom: 15,
    },
    emptyText:{
        color: 'white',
        fontFamily: 'Merriweather Sans',
        fontSize: 16
    },
    okButton: {
        backgroundColor: colors.tertiary,
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 100,
    },
    closeButton: {
        backgroundColor: colors.background,
        borderRadius: 10,
        height: 40,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    closeButtonText: {
        fontFamily: 'Merriweather Sans',
        fontSize: 16,
        color: 'white'
    },
    okButtonText: {
        fontFamily: 'Merriweather Sans',
        fontSize: 16,
    },
    dropdown: {
        color: 'white'
    },
    addAccountButton:{
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 10,
        marginBlock: 20
    },
    accountName: {
        color: 'black',
        fontFamily: 'Merriweather Sans',
        fontSize: 16,
    },
    percentageAllocated:{
        color: 'black',
        fontFamily: 'Merriweather Sans',
        fontSize: 16
    },
    input: {
      backgroundColor: colors.background,
      borderRadius: 15,
      marginBottom: 15,
      paddingHorizontal: 15,
      paddingVertical: 10,
      color: 'white'
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  });
  
  export default goalsStyles;