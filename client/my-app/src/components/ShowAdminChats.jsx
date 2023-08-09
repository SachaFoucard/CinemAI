import { View, Text,StyleSheet,TouchableOpacity,TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import ShowChatLog from './ShowChatLog'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ShowAdminChats({mail,navigation}) {
    
   console.log("This is cureent mail", mail);
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('ChatWithUser',{CurrentMail:mail})}>

            <Text >{mail}</Text>
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
       
      },
      box:{
        color: "white",
        borderRadius: 10,

      },
   
})
