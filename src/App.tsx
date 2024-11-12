
import { Link, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './auth/AuthContext';
import { RootStackParamList } from './types/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from './assets/constants/colors';
import { Text } from 'react-native-svg';
//Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';
import LinkAccountScreen from './screens/LinkAccountScreen';
import SettingsScreen from './screens/SettingsScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import MarketScreen from './screens/MarketScreen';

//Icons
import HomeIcon from './assets/icons/home.svg';
import HomeIconActive from './assets/icons/home_active.svg';
import AccountsIcon from './assets/icons/pie-chart.svg';
import AccountsIconActive from './assets/icons/pie-chart_active.svg';
import SettingsIcon from './assets/icons/settings.svg';
import SettingsIconActive from './assets/icons/settings_active.svg';
import MarketIcon from './assets/icons/bar-chart.svg';
import MarketIconActive from './assets/icons/bar-chart_active.svg';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();



// Create Bottom Tabs Navigator
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        headerShown: false,
        tabBarStyle: {backgroundColor: '#262932'} // Global styling for labels
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const IconComponent = focused ? HomeIconActive : HomeIcon;
            return <IconComponent width={size} height={size} />;
          },
          tabBarLabel: ({ focused, color }) => (
            <Text>Home</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const IconComponent = focused ? MarketIconActive : MarketIcon;
            return <IconComponent width={size} height={size} />;
          },
          tabBarLabel: ({ focused, color }) => (
            <Text>Market</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const IconComponent = focused ? AccountsIconActive : AccountsIcon;
            return <IconComponent width={size} height={size} />;
          },
          tabBarLabel: ({ focused, color }) => (
            <Text>Accounts</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const IconComponent = focused ? SettingsIconActive : SettingsIcon;
            return <IconComponent width={size} height={size} />;
          },
          tabBarLabel: ({ focused, color }) => (
            <Text>Settings</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WelcomeScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
          <Stack.Screen name="MainApp" component={BottomTabs} />
          {/* Remove HomeScreen and LinkAccountScreen from here */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};




export default App;
