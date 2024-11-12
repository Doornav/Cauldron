import { Dimensions, StyleSheet } from 'react-native';
import colors from '../assets/constants/colors';
const screenHeight = Dimensions.get('window').height;


const welcomeScreenStyles = StyleSheet.create({
  welcomeCard:{
    paddingTop:30,
    height: screenHeight * 0.5,
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomContainer:{
    padding: 20,
    alignItems: 'center',
    
  },
  card:{
    alignSelf: 'center',
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    width: '90%',
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    shadowColor: '#000', // Color of the shadow
    shadowOpacity: 0.25, // Opacity of the shadow (0 to 1)
    shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Merriweather Sans',
    textAlign: 'center',
  },
  scrollContent: {
    paddingBlock: 30,
  },
  accountCard: {
    marginBlock: 10,
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  accountCardText:{
    fontSize: 16,
    fontFamily: 'Merriweather Sans',
    textAlign: 'center',
  }


});

  export default welcomeScreenStyles;