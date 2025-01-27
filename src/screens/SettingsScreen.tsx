import React, { useState} from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, TextInput, Alert  } from 'react-native';
import colors from '../assets/constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../auth/AuthContext';
import { writeFile, DocumentDirectoryPath } from 'react-native-fs';
import Papa from 'papaparse';


//Icons
import LinkIcon from '../assets/icons/settingsIcons/Link.svg';
import SunIcon from '../assets/icons/settingsIcons/Sun.svg';
import BellIcon from '../assets/icons/settingsIcons/Bell.svg';
import LockIcon from '../assets/icons/settingsIcons/Lock.svg';
import MoonIcon from '../assets/icons/settingsIcons/Moon.svg';
import MailIcon from '../assets/icons/settingsIcons/Mail.svg';
import InfoIcon from '../assets/icons/settingsIcons/Info.svg';
import LogoutIcon from '../assets/icons/settingsIcons/Log_Out.svg';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SettingsScreen'>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [visibleModal, setVisibleModal] = useState<string | null>(null); // Tracks which modal is visible
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [RepeatPassword, setRepeatPassword] = useState('');
  const { accounts, user, logout, handleUpdateName, handleUpdatePassword } = useAuth(); // Assuming you have a logout function in AuthContext


  const handleLogout = () => {
    logout(); // Call the logout function
    setVisibleModal(null); // Close the modal
    navigation.navigate("WelcomeScreen");
  };

  
  const downloadUserInfoAsCSV = async (userData: object[]) => {
    try {
      // Convert JSON to CSV
      const csv = Papa.unparse(userData);

      // Add a timestamp to the filename
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15); // e.g., "202411272115"
      const fileName = `UserInfo_${timestamp}.csv`;
      const filePath = `${DocumentDirectoryPath}/${fileName}`;

      // Write the CSV file to the device
      await writeFile(filePath, csv, 'utf8');

      console.log('CSV file saved successfully:', filePath);
      return filePath; // Return the file path if needed
    } catch (error) {
      console.error('Error generating or saving CSV:', error);
    }
  };

  const handleDownload = async () => {

    const filePath = await downloadUserInfoAsCSV(accounts);
    if (filePath) {
      console.log('File saved at:', filePath);
      // Optionally display a success message to the user
    }
  };



  const handleChangeName = () => {
    console.log("a")
    if(name == user.name && newName != '') {
      console.log("asdfasdf")
      handleUpdateName(newName);
    }
  };

  const handleChangePassword = () => {
    
    if(newPassword == RepeatPassword) {
      
      handleUpdatePassword(password, newPassword);
    } else {
      console.log("entered passwords don't match");
    }
  };

  const canChangeName = (): boolean => {
    if (!user.lastNameChange) {
      // If lastNameChange is null, user has never changed their name, so they can change it
      return true;
    }
  
    const lastChangeDate = new Date(user.lastNameChange);
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    const currentDate = new Date();
  
    // Check if the difference between now and the last change is more than a week
    return currentDate.getTime() - lastChangeDate.getTime() > oneWeekInMs;
  };

  const canChangePassword = (): boolean => {
    if (!user.lastPasswordChange) {
      // If lastNameChange is null, user has never changed their name, so they can change it
      return true;
    }
  
    const lastChangeDate = new Date(user.lastPasswordChange);
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    const currentDate = new Date();
  
    // Check if the difference between now and the last change is more than a week
    return currentDate.getTime() - lastChangeDate.getTime() > oneWeekInMs;
  };


  const icons = {
    linkedAccounts: LinkIcon,
    profile: SunIcon,
    notifications: BellIcon,
    security: LockIcon,
    theme: MoonIcon,
    contact: MailIcon,
    privacy: InfoIcon,
    logout: LogoutIcon
  };

  const renderModalContent = () => {
    switch (visibleModal) {
      case 'download':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Dowload CSV?</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setVisibleModal(null)} // Close the modal
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, {backgroundColor: colors.tertiary}]}
                onPress={handleDownload} // Logout and close the modal
              >
                <Text style={[styles.modalButtonText, {color: 'black'}]}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'link':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Linked Accounts</Text>
            <Text style={styles.modalMessage}>
              You can link or unlink accounts here.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setVisibleModal(null)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        );
      case 'linkedAccounts':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Linked Accounts</Text>
            <Text style={styles.modalMessage}>
              You can link or unlink accounts here.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setVisibleModal(null)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        );
      case 'password':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Name</Text>
            
            <Text style={[styles.modalMessage, {alignSelf: 'flex-start', marginLeft: -40, marginBottom: 0}]}>CurrentPassword:</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.modalInput}
              placeholder="Enter your current password"
              placeholderTextColor={'#494D58'}
              value={password}
              onChangeText={setPassword}
            />
            <Text style={[styles.modalMessage, {alignSelf: 'flex-start', marginLeft: -40, marginBottom: 0}]}>New Password:</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.modalInput}
              placeholder="Enter your new password"
              placeholderTextColor={'#494D58'}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Text style={[styles.modalMessage, {alignSelf: 'flex-start', marginLeft: -40, marginBottom: 0}]}>Repeat New Password:</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.modalInput}
              placeholder="Enter your new password again"
              placeholderTextColor={'#494D58'}
              value={RepeatPassword}
              onChangeText={setRepeatPassword}
            />
            <TouchableOpacity
                style={[styles.modalButton]}
                onPress={handleChangePassword} // Logout and close the modal
              >
                <Text style={styles.modalButtonText}>Logout</Text>
              </TouchableOpacity>
          </View>
        );
      case 'name':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Name</Text>
            
            <Text style={[styles.modalMessage, {alignSelf: 'flex-start', marginLeft: -40, marginBottom: 0}]}>Name:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your current name"
              placeholderTextColor={'#494D58'}
              value={name}
              onChangeText={setName}
            />
            <Text style={[styles.modalMessage, {alignSelf: 'flex-start', marginLeft: -40, marginBottom: 0}]}>New Name:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your current name"
              placeholderTextColor={'#494D58'}
              value={newName}
              onChangeText={setNewName}
            />
            <TouchableOpacity
                style={[styles.modalButton]}
                onPress={handleChangeName} // Logout and close the modal
              >
                <Text style={styles.modalButtonText}>Logout</Text>
              </TouchableOpacity>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Account Info</Text>
            <View style={[styles.modalActions]}>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={() => {
                  if(canChangeName()){
                    setVisibleModal('name');
                  } else {
                    Alert.alert(
                      'Name Change Restricted',
                      `You can only change your name once every week. Last change was on ${user.lastNameChange.split('T')[0]}.`
                    );
                  }
                  }
                } // Close the modal
              >
              <Text style={styles.modalButtonText}>Name</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={() => {
                  if(canChangePassword()){
                    setVisibleModal('password');
                  } else {
                    Alert.alert(
                      'Password Change Restricted',
                      `You can only change your name once every week. Last change was on ${user.lastPasswordChange.split('T')[0]}.`
                    );
                  }
                  }
                }
              >
                <Text style={styles.modalButtonText}>Password</Text>
              </TouchableOpacity>
             
            </View>
          </View>
        );
      case 'notifications':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <Text style={styles.modalMessage}>
              Customize your notification preferences.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setVisibleModal(null)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        );
      case 'logout':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out of your account?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setVisibleModal(null)} // Close the modal
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout} // Logout and close the modal
              >
                <Text style={styles.modalButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.editIcon}>
      
        </TouchableOpacity>
        <Text style={styles.profileName}>Pranav</Text>
        <Text style={styles.profileEmail}>pranavpre@gmail.com | 206-660-0161</Text>
      </View>

      {/* Settings Options */}
      <View style={styles.settingsSection}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('LinkAccountScreen')}
        >
          <icons.linkedAccounts width={24} height={24} />
          <Text style={styles.settingText}>Edit Linked Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => setVisibleModal('profile')}>
          <icons.profile width={24} height={24} />
          <Text style={styles.settingText}>Edit profile information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <icons.notifications width={24} height={24} />
          <Text style={styles.settingText}>Notifications</Text>
          <Text style={styles.settingOption}>ON</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.settingItem} onPress={() => setVisibleModal('download')}>
          <icons.security width={24} height={24} />
          <Text style={styles.settingText}>Download user information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <icons.theme width={24} height={24} />
          <Text style={styles.settingText}>Theme</Text>
          <Text style={styles.settingOption}>Light mode</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.settingItem}>
          <icons.contact width={24} height={24} />
          <Text style={styles.settingText}>Contact us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <icons.privacy width={24} height={24} />
          <Text style={styles.settingText}>Privacy policy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <TouchableOpacity style={[styles.settingItem, {borderBottomWidth: 0,}]} onPress={() => setVisibleModal('logout')}>
          <icons.logout width={24} height={24} />
          <Text style={styles.settingText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!visibleModal} // Show modal if visibleModal is set
        onRequestClose={() => setVisibleModal(null)} // Close modal on back press
      >
        <TouchableWithoutFeedback onPress={() => setVisibleModal(null)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              {/* Stops the propagation of touch events inside the modal */}
              <KeyboardAvoidingView
                style={styles.modalContent}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                {renderModalContent()}
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.background,
    paddingTop: 110,
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    position: 'absolute',
    right: 120,
    top: 70,
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 4,
  },
  profileName: {
    fontFamily: 'Merriweather Bold',
    color: 'white',
    fontSize: 30,
    marginTop: 10,
  },
  modalInput: {
    backgroundColor: colors.background,
    width: '150%',
    height: 40,
    borderRadius: 15,
    marginVertical: 10,
    paddingLeft: 10,
    color: "white"
  },
  profileEmail: {
    fontFamily: 'Merriweather Sans',
    fontSize: 14,
    color: colors.textTertiary,
    marginTop: 5,
  },
  settingsSection: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  settingText: {
    fontFamily: 'Merriweather Sans',
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  settingOption: {
    fontFamily: 'Merriweather Sans',
    fontSize: 16,
    color: colors.tertiary,
  },
  icon: {
    width: 24, // Adjust width
    height: 24, // Adjust height
    marginRight: 10, // Space between icon and text
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "white"
  },
  modalMessage: {
    fontSize: 16,
    color: "white",
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  cancelButton: {
    backgroundColor: colors.background,
  },
  confirmButton: {
    backgroundColor: '#f44336',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
