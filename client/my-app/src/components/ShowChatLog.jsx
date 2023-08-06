import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function ShowChatLog(chat) {
  return (
    <View styles={styles.container}>
      <Text>ShowChatLog</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
})