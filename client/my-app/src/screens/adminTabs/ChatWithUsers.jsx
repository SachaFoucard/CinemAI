import { View, Text,StyleSheet,ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function ChatWithUsers() {
   const {GetAllChatForAdmin,allChatsAdmin,SetallChatsAdmin,loading, setloading} = useContext(UserContext); 

   if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  useEffect(() => {
    const fetchChat = async () => {
      await GetAllChatForAdmin();
      setloading(false); // Set loading to false after fetching the chat
      console.log(allChatsAdmin);
    };

    fetchChat();
  },[])


  return (
    <View style={styles.container}>
      <Text>ChatWithUsers</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
    alignItems: 'center',
  },})