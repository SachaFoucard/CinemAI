import { View, Text,ScrollView,StyleSheet,TextInput,FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import ShowChatLog from '../../components/ShowChatLog'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ChatAdmin() {
    const {GetChatForUser,mail,chat,SetChat,FromUser,SetFromUser} = useContext(UserContext)  
    useEffect(() => {GetChatForUser(mail) }, [])

  return (
    <View style={styles.container}>
       {/* { <FlatList
          data={chat}
          renderItem={({ item }) => <ShowChatLog chat={item}  />}
          keyExtractor={(item, index) => index.toString()}
        />} */}
        <ShowChatLog chat={chat}  />
        <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Type your message here" />
        <Ionicons style={styles.icon} name="send-outline" />
        </View>

    </View>
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
      icon: {
        fontSize: 30,
        color: 'white',
      },
      input: {
        flex: 1,
        height: 40,
      },
})