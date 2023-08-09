import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ShowChatLog from './ShowChatLog';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ShowAdminChats({ mail, navigation }) {
  const { RemoveChat } = useContext(UserContext);

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('ChatWithUser', { CurrentMail: mail })}>
        <Text style={styles.mailText}>{mail}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => RemoveChat(mail)}>
        <Ionicons style={styles.icon} name="close-outline" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 100,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  box: {
    backgroundColor: 'red',
    borderRadius: 4,
    paddingHorizontal:78,
    paddingVertical: 6,
  },
  mailText: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    color: 'white',
    fontSize: 24,
  },
  button:{
    backgroundColor:"blue"
  }
});
