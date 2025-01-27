import { StyleSheet } from 'react-native';
import colors from '../assets/constants/colors';


const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  input: {
    height: 50,
    fontSize: 16,
    width: 330,
    backgroundColor: colors.secondary,
    color: "white",
    borderRadius: 15,
    paddingInline: 20,
    marginBottom: 15,
  },
  text: {
    fontFamily: 'Merriweather Sans',
    fontSize: 14,
    color: '#A7AEBF',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Merriweather Bold',
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Merriweather Sans',
    textAlign: 'center',
    color: colors.textPrimary,
    marginBottom: 32,
    lineHeight: 30,
  },
  button: {
    backgroundColor: colors.tertiary,  // Red color similar to the one in the image
    borderRadius: 50,  // Rounded edges
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 320,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Color of the shadow
    shadowOpacity: 0.25, // Opacity of the shadow (0 to 1)
    shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
    shadowRadius: 4,
  },
  buttonText: {
    color: 'black',  // White text
    fontSize: 17,
    fontFamily: 'Merriweather Bold'
  },
  secondaryButton: {
    fontSize: 17,
    color: colors.textSecondary,
    fontFamily: 'Merriweather Sans',
  },
  tertiaryButton: {
    fontSize: 17,
    color: colors.tertiary,
    fontFamily: 'Merriweather Sans',
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 50,  // Rounded edges
    width: '90%',
  }
});

export default globalStyles;
