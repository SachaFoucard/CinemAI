import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'

const SignUpScreen = () => {
  return (
    <View style={styles.container} >
      <Image style={styles.img} source={require('../../../assets/SignUp/logo.png')} />
      <Text style={styles.text}>Create Your Account</Text>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:'#181A21'
  },
img:{
  width:200,
  height:100,
  alignSelf:'center',
  marginTop:150
},
text:{
  color:'white',
  fontSize:33,
  textAlign:'center',
  marginTop:50
}
})