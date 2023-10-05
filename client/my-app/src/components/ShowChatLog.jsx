import { View, Text,StyleSheet,FlatList } from 'react-native'
import React, { useContext,useEffect } from 'react'
import { UserContext } from '../context/UserContext';

export default function ShowChatLog({chat}) {
    const {FromUser,SetFromUser} = useContext(UserContext)
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
        padding:5,
        margin:5
      },
      fromOthers: {
        alignSelf: 'flex-start',
        backgroundColor: 'red',
        padding:5,
        margin:5
      },
      messageText: {
        width: "auto",    
        color: 'white', // Change the text color to black for better visibility
      },
})
