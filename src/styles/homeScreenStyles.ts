import { Dimensions, StyleSheet } from 'react-native';
import colors from '../assets/constants/colors';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const homeScreenStyles = StyleSheet.create({
  headerWrapper: {
    paddingLeft: 15,
  },
  balanceCard:{
    alignSelf: 'center',
    width: screenWidth + 20 ,
    height: 210, 
    alignItems: 'flex-start',
    padding: 40,
    paddingBlock: 30,
   
  },
  cardText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Merriweather Sans',
    fontWeight: '100',
    textAlign: 'center',
  },
  cardTitle:{
    fontSize: 30,
    color: 'black',
    fontFamily: 'Merriweather Bold',
    textAlign: 'center',
  },
  flatList: {
    alignSelf: 'center',
  },
  accountCard: {
    width: screenWidth / 2 - 15,
    height: 150,
    backgroundColor: colors.secondary,
    marginBottom: 10,
    borderRadius: 10,
    marginInline: 5,
    padding: 10
    
  },
  titleCard:{
    backgroundColor: colors.secondary,
    height: 20,
  },
  institutionLogo: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  institutionName: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Merriweather Sans',
    marginVertical: 5,

    color: 'white'
  },
  accountName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  accountBalance: {
    fontSize: 20,
    color: '#B0B0B0',
    marginTop: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  goalTitle: {
    color: 'white',
    fontFamily: "Merriweather Sans",
    fontSize: 20
  },
  goalDetails: {
    color: 'green',
    fontFamily: "Merriweather Sans",
    fontSize: 24
  },
  goalAmount: {
    color: 'white',
    fontFamily: "Merriweather Sans",
    fontSize: 24
  },
  goalDate: {
    color: 'white',
    fontFamily: "Merriweather Sans",
    fontSize: 16
  },
sectionHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBlock: 5,
  
},

sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
  paddingLeft: 15,
  paddingVertical: 10,
},
seeAll: {
  fontSize: 14,
  color: '#FFC107',
  paddingRight: 15,
},




});

  export default homeScreenStyles;