import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function ShowChatLog({chat,FromUser,index}) {
    console.log(FromUser,"yey");
    console.log(FromUser);
    console.log(index);
  return (
    <View style={[styles.container, FromUser[index]? styles.fromUser : styles.fromOthers]}>
    <Text style={styles.messageText}>{chat}</Text>
  </View>
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
