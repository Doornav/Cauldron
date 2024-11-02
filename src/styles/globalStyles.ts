import { StyleSheet } from 'react-native';
import colors from '../assets/constants/colors';


const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 50,
    width: 320,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Merriweather Bold',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Merriweather Sans',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: colors.primary,  // Red color similar to the one in the image
    borderRadius: 20,  // Rounded edges
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 320,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',  // White text
    fontSize: 17,
    fontFamily: 'Merriweather Bold'
  },
  secondaryButton: {
    fontSize: 17,
    color: colors.textSecondary,
    fontFamily: 'Merriweather Sans',
  }
});

export default globalStyles;
