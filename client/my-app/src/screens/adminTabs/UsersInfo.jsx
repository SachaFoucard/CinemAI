import { View, Text,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function UsersInfo() {

  const{users,GetUsers} = useState({})

  useEffect(()=> {

  },[])
  return (
    <View style={styles.container}>
      <Text>UsersInfo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
    alignItems: 'center',
  },})