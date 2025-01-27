// src/contexts/AuthContext.tsx
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { loginRequest, signupRequest, updateName, updatePassword } from '../services/authService';
import { getAccounts } from '../services/plaidService';
import { Account } from '../types/accountTypes';
import { Goal } from '../types/goalsTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  user: any;
  token: string;
  accounts: Account[];
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  setAccounts: (accounts: Account[]) => void;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, password: string, name: string) => Promise<string | null>;
  logout: () => void;
  fetchAccounts: () => Promise<void>;
  handleUpdateName: (newName: string) => Promise<void>;
  handleUpdatePassword: (password: string, newPassword: string) => Promise<void>;
  handleGoalMetrics: () => void;
}


const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([]); // State for accounts and balances
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [goals, setGoals] = useState<Goal[]>([]);


  

  
  const handleGoalMetrics = ()  => {
    console.log("GOAL M");
    // Result object to store goal metrics
    const goalMetrics: { [goalTitle: string]: number } = {};
  
    goals.forEach((goal) => {
      // Calculate the total allocated amount for each goal
      const totalAllocated = goal.allocatedAccounts.reduce((total, allocatedAccount) => {
        // Find the matching account
        const matchingAccount = accounts.find(
          (account) => account.accountId === allocatedAccount.accountId
        );
  
        if (matchingAccount) {
          // Add the allocated portion of the balance to the total
          const allocatedAmount =
            (allocatedAccount.percentageAllocated / 100) * matchingAccount.balance;

          allocatedAccount.allocatedAmount = allocatedAmount;
          return total + allocatedAmount;
        }
  
        return total; // If no matching account, return current total
      }, 0);
  
      goal.currentAmount = totalAllocated;
      console.log(goal.title, goal.currentAmount);
    });
  

  };
  

  // Storage key
const STORAGE_KEY = 'userGoals';

  // Load goals when the app opens
  useEffect(() => {
    const initializeGoals = async () => {
      const storedGoals = await loadGoalsFromStorage();
      setGoals(storedGoals);
    };

    initializeGoals();
  }, []);

// Function to save goals to AsyncStorage
const saveGoalsToStorage = async (goals: Goal[]) => {
  try {
    const serializedGoals = JSON.stringify(goals);
    await AsyncStorage.setItem(STORAGE_KEY, serializedGoals);
    console.log('Goals saved successfully');
  } catch (error) {
    console.error('Error saving goals:', error);
  }
};

const loadGoalsFromStorage = async (): Promise<Goal[]> => {
  try {
    const serializedGoals = await AsyncStorage.getItem(STORAGE_KEY);
    if (serializedGoals) {
      const parsedGoals = JSON.parse(serializedGoals) as Goal[]; // Deserialize and cast to type
      return parsedGoals;
    }
    return [];
  } catch (error) {
    console.error('Error loading goals:', error);
    return [];
  }
};

// Save goals whenever they update
useEffect(() => {
  saveGoalsToStorage(goals);
}, [goals]);
  


  const fetchAccounts = async (token: string, setAccounts: (accounts: Account[]) => void) => {
    if (!token) {
      console.error('Token is missing. Cannot fetch accounts.');
      return;
    }
  
    try {
      const response = await getAccounts(token); // Fetch account and institution data from API
  
      // Map institution data to each account
      const mappedAccounts: Account[] = response.data.flatMap(({ institution, accounts }) =>
        accounts.map((account) => ({
          ...account,
          institution, // Attach institution data to each account
        }))
      );
  
      // Update accounts in context state
      setAccounts(mappedAccounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginRequest({ email, password });
      if (response.token) {
        setToken(response.token);
        setUser(response.user); // Assuming `response.user` contains user data
        if (response.accountsData && Array.isArray(response.accountsData) && response.accountsData.length > 0) {
          const mappedAccounts: Account[] = response.accountsData.flatMap(({ institution, accounts }) =>
            accounts.map((account) => ({
              ...account,
              institution, // Attach institution data to each account
            }))
          );
          setAccounts(mappedAccounts);
        } else {
          console.warn('No accounts data available or accountsData is not an array.');
          setAccounts([]); // Set to an empty array if no accounts data is available
        }
        
       
        return response.token;
      } else {
        throw new Error('Login failed: Invalid response');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };



  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await signupRequest({ email, password, name });
      if (response.token) {
        setToken(response.token);
        setUser(response.user); // Assuming `response.user` contains user data
        return response.token;
      } else {
        throw new Error('Signup failed: Invalid response');
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  
  const logout = () => {
    setToken(null);
    setUser(null);
    setAccounts([]);
    setGoals([]);

  };

  const handleUpdateName =async (newName: string) => {
    try {
      const response = await updateName(newName, token);
      user.lastNameChange = response.lastNameChange;
      user.name = response.name;
    } catch (error) {
      console.error('update name error:', error);
      throw error;
    }
  }

  const handleUpdatePassword =async (password: string, newPassword: string) => {
    try {
      const response = await updatePassword(password, newPassword, token);
      
      user.lastPasswordChange = response.lastPasswordChange;
    } catch (error) {
      console.error('update password error:', error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        accounts,
        goals,
        setAccounts,
        login,
        signup,
        logout,
        fetchAccounts,
        handleUpdateName,
        handleUpdatePassword,
        setGoals,
        handleGoalMetrics
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
