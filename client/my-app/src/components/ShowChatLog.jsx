import { View, Text,StyleSheet,FlatList } from 'react-native'
import React, { useContext,useEffect } from 'react'
import { UserContext } from '../context/UserContext';

export default function ShowChatLog({chat}) {
    const {FromUser,SetFromUser} = useContext(UserContext)
    console.log("FromUser in showchatlog",FromUser);
    console.log("chat in showchatlog",chat);

  return (
    <>
    {
        <FlatList
          data={FromUser}
          renderItem={({item,index}) => <View  style={[item ? styles.fromUser : styles.fromOthers]}>
          <Text style={styles.messageText}>{chat[index]}</Text>
        </View>}
          keyExtractor={(item, index) => index.toString()}
        />

    }
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        maxWidth: '80%',
        borderRadius: 8,
        marginVertical: 5,
      },
      fromUser: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
      },
      fromOthers: {
        alignSelf: 'flex-start',
        backgroundColor: 'red',
      },
      messageText: {
        width: 250,    
        color: 'white', // Change the text color to black for better visibility
      },
})
