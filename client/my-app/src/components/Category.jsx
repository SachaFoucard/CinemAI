import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Category = ({title,films}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{films[0]?.original_title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    title:{
        color:'white',
        fontSize:40
    }
})
export default Category