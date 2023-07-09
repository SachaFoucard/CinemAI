import { View, Text,StyleSheet,Image } from 'react-native'
import {React, useContext} from 'react'
import logo from '../../../assets/logoScreen/logo.png'
import profileImg from '../../../assets/profileScreen/profile.png'
import { UserContext } from '../../context/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons'

const Profil = () => {
  const {user, Login, setmail, setpassword, mail, password} = useContext(UserContext);
  
console.log(user.user.mail);
console.log(user.mail);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.header}>Profil</Text>
      </View>
      <View style={styles.userDisplay}>
        <Image source={profileImg} style={styles.progileImg} />
        <Text style={styles.text}>{user.user.name}</Text>
        <Text style={styles.text}>{user.user.mail}</Text>
      </View>

      <View style={styles.options}>
      <Text style={styles.text}>{user.user.mail}</Text>
      <Ionicons style={styles.icon} name="play-circle" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#181A21',
 
  },
  profile: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 40,
    marginRight: 10,
   
    // Add any additional styles for the logo here
  },
  progileImg: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius:50,
    // Add any additional styles for the logo here
  },
  header: {
    color: "white",
    fontSize:19,
  },
  userDisplay: {
   
    alignItems: 'center',
    marginTop:10,
  },
  text: {
    color: 'white',
  },
  icon: {
    fontSize: 20,
    color: 'white'
  },
  options:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  
})
export default Profil

