import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Profil = () => {
  return (
    <View style={styles.container}>
      <Text>Profil</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#181A21'
  }
})
export default Profil