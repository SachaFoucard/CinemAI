import { View,Text,ScrollView,StyleSheet,TextInput,FlatList, TouchableOpacity,ActivityIndicator  } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import ShowChatLog from '../../components/ShowChatLog'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ChatWithUser({route,navigation}) {
    const {GetChatForUser,mail,chat,SetChat,FromUser,SetFromUser,AddChatForUser,loading, setloading,inputMessage, setInputMessage} = useContext(UserContext);
    const { CurrentMail } = route.params;  
    useEffect(() => {
        const fetchChat = async () => {
            console.log(CurrentMail,"is");
          await GetChatForUser(CurrentMail);
          setloading(false); // Set loading to false after fetching the chat
          console.log("FromUser in ChatAdmin",FromUser);
          console.log("chat in ChatAdmin",chat);
      
        };
    
        fetchChat();
      }, [CurrentMail]);
    
      if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
        );
      }
        //useEffect(() => {GetChatForUser(mail) }, [])
    
        const handleSendMessage = async () => {
            console.log("handleSendMessage");
              // Assuming you have a function to send the message to the backend
              // Here, you can implement the logic to send the message and update the chat
              // For example:
              const chat = [inputMessage];
              const fromUser = [false];
              
              await AddChatForUser(CurrentMail,chat,fromUser)
        
              // Clear the input field after sending the message
              setInputMessage('');
              await GetChatForUser(CurrentMail)
          };
    
      return (
        <View style={styles.container}>
             <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('AdminTabMenu')}>
             <Ionicons style={styles.icon} name="chevron-back-outline" />
             <Text style={styles.title}>Chat With {CurrentMail}</Text>
             </TouchableOpacity>
            <ShowChatLog chat={chat}  />
            <View style={styles.inputContainer}>
            <TextInput style={styles.input}
              placeholder="Type your message here"
              value={inputMessage}
              onChangeText={setInputMessage} />
            <TouchableOpacity onPress={handleSendMessage}>
    
            <Ionicons style={styles.icon} name="send-outline" />
            </TouchableOpacity>
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
        loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#181A21',
        },
        icon: {
          fontSize: 30,
          color: 'black',
        },
        input: {
          flex: 1,
          height: 40,
        },
        header: {
            flexDirection: 'row',
            margin: 15,
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
          },
          icon: {
            fontSize: 30,
            color: 'white',
          },
          title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
          },
  })