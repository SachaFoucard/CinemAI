import { View, Text,StyleSheet,ActivityIndicator,FlatList } from 'react-native'
import React, { useContext,useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import ShowAdminChats from '../../components/ShowAdminChats';

export default function ChatWithUsers({navigation}) {
   const {GetAllChatForAdmin,allChatsAdmin,SetallChatsAdmin,loading, setloading,allMails,SetallMails} = useContext(UserContext); 
   
   
   useEffect(() => {
     const fetchChat = async () => {
       await GetAllChatForAdmin();
       setloading(false); // Set loading to false after fetching the chat
      };  
      fetchChat();
  
    },[SetallChatsAdmin])
    
    
    if (loading) {
     return (
       <View style={styles.loadingContainer}>
         <ActivityIndicator size="large" color="white" />
       </View>
     );
   }

  return (
    <View style={styles.container}>
     <Text style={styles.title}>Chats With Users</Text>
    
        {
        <FlatList
         data={allMails}
         renderItem={({item}) => <ShowAdminChats mail={item} navigation={navigation} />}
         keyExtractor={(item,index) => index.toString()}
         />

      }
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
    alignItems: 'center',
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
  title: {
    paddingTop:45,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

})