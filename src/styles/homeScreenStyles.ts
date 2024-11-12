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
    marginInline: 5
   
  },
  accountCardText:{
    fontSize: 16,
    fontFamily: 'Merriweather Sans',
    textAlign: 'center',
  },
  titleCard:{
    backgroundColor: colors.secondary,
    height: 20,
  },

  accountName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  accountBalance: {
    fontSize: 14,
    color: '#B0B0B0',
    marginTop: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
sectionHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBlock: 10,
  
},

sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
  paddingLeft: 15,
},
seeAll: {
  fontSize: 14,
  color: '#FFC107',
  paddingRight: 15,
},
coinCard: {
  backgroundColor: '#282C34',
  borderRadius: 10,
  padding: 15,
  width: 150,
  marginRight: 10,
  alignItems: 'center',
},
coinName: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginTop: 5,
},
coinPrice: {
  fontSize: 16,
  color: '#FFFFFF',
  marginVertical: 5,
},
coinChange: {
  fontSize: 14,
  fontWeight: 'bold',
},
chartContainer: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
},
chartImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
},
newsCard: {
  backgroundColor: '#282C34',
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center',
  padding: 15,
  marginTop: 20,
},
newsImage: {
  width: 50,
  height: 50,
  borderRadius: 10,
  marginRight: 10,
},
newsText: {
  fontSize: 14,
  color: '#FFFFFF',
  flex: 1,
},




});

  export default homeScreenStyles;