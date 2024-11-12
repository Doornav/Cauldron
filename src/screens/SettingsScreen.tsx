import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../assets/constants/colors';

const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}


      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://yourimageurl.com/avatar.jpg' }} // Replace with your avatar URL
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <FontAwesome5 name="edit" size={16} color="white" />
        </TouchableOpacity>
        <Text style={styles.profileName}>Pranav</Text>
        <Text style={styles.profileEmail}>pranavpre@gmail.com | 206-660-0161</Text>
      </View>

      {/* Settings Options */}
      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.settingItem}>
          <FontAwesome name="user-o" size={20} color="black" />
          <Text style={styles.settingText}>Edit Linked Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <FontAwesome name="user-o" size={20} color="black" />
          <Text style={styles.settingText}>Edit profile information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="notifications" size={20} color="black" />
          <Text style={styles.settingText}>Notifications</Text>
          <Text style={styles.settingOption}>ON</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.settingItem}>
          <FontAwesome5 name="lock" size={20} color="black" />
          <Text style={styles.settingText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="brightness-6" size={20} color="black" />
          <Text style={styles.settingText}>Theme</Text>
          <Text style={styles.settingOption}>Light mode</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.settingItem}>
          <FontAwesome name="envelope-o" size={20} color="black" />
          <Text style={styles.settingText}>Contact us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <FontAwesome name="lock" size={20} color="black" />
          <Text style={styles.settingText}>Privacy policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
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
    color: "white",
    fontSize: 30,
    marginTop: 10,
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
    paddingVertical: 10,
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
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  settingOption: {
    fontFamily: 'Merriweather Sans',
    fontSize: 16,
    color: colors.tertiary,
  },
});

export default SettingsScreen;
