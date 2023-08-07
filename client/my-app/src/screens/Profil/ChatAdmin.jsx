import { View, Text,ScrollView,StyleSheet,TextInput,FlatList, TouchableOpacity,ActivityIndicator  } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import ShowChatLog from '../../components/ShowChatLog'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ChatAdmin() {
    const {GetChatForUser,mail,chat,SetChat,FromUser,SetFromUser,AddChatForUser} = useContext(UserContext)  
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchChat = async () => {
      await GetChatForUser(mail);
      setLoading(false); // Set loading to false after fetching the chat
      console.log("FromUser in ChatAdmin",FromUser);
      console.log("chat in ChatAdmin",chat);
  
    };

    fetchChat();
  }, []);

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
          const newMessage = {
            text: inputMessage,
            fromUser: true, // Assuming the message is from the current user
            mail:mail
          }
          
          await AddChatForUser(mail,newMessage,true)
    
          // Clear the input field after sending the message
          setInputMessage(' added');
          await GetChatForUser(mail)
      };

  return (
    <View style={styles.container}>
       {/* { <FlatList
          data={chat}
          renderItem={({ item }) => <ShowChatLog chat={item}  />}
          keyExtractor={(item, index) => index.toString()}
        />} */}
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
      icon: {
        fontSize: 30,
        color: 'black',
      },
      input: {
        flex: 1,
        height: 40,
      },
})