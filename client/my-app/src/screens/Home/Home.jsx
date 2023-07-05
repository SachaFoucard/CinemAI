import { View, Text,StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { ActivityIndicator } from "@react-native-material/core";

const Home = () => {
  const { popularF, Popular,LoadingCircle,loading,setloading } = useContext(UserContext);

  useEffect(() => {
    Popular()
    LoadingCircle()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      {loading ? <ActivityIndicator size="large" color='#E21121' style={styles.load} /> : ''}

    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#181A21'
  },
  load: {
    position: 'absolute',
    bottom: '40%',
    left:'47%'
  }
})
export default Home