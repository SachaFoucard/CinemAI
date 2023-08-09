import { View, Text,StyleSheet,TouchableOpacity,TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import ShowChatLog from './ShowChatLog'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ShowAdminChats({mail,navigation}) {
    const {RemoveChat} = useContext(UserContext)
   console.log("This is cureent mail", mail);
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('ChatWithUser',{CurrentMail:mail})}>

            <Text style={styles.mailText} >{mail}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => RemoveChat(mail)}>

        <Ionicons style={styles.icon} name="close-outline" />
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
        flexDirection:"row"
       
      },
      box:{
        color: "white",
        backgroundColor: 'red', // Set the background color to red
        borderRadius: 2,
        width:75,
        alignItems:"center",

      },
      mailText:{
        color:"white",
      },
      icon:{
        color:"white",
       fontSize: 50
      }
   
})
