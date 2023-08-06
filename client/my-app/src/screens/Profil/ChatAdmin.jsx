import { View, Text,ScrollView,StyleSheet,TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'

export default function ChatAdmin() {

    const {GetChatForUser,mail,chat,SetChat} = useContext(UserContext)
  

   
    useEffect(() => { GetChatForUser(mail)}, [])
  
    console.log(chat, "its here");

  return (
    <ScrollView style={styles.container}>
        <Text>ya</Text>


        <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Type your message here" />
        </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#181A21',
        padding: 20,
      },
      scrollView: {
        flex: 1,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
      input: {
        flex: 1,
        height: 40,
      },
})