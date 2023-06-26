import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/welcomeScreen/welcomephoto-min.png')}
        style={styles.img}
      />
      <TouchableOpacity style={styles.button}
       onPress={()=>navigation.navigate('SignUp')}> 
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: 250,
    height: 50,
    position: 'absolute',
    bottom: '5%',
    left:'20%',
    zIndex: 1,
    backgroundColor: '#E21121',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color:'white',
  },
});
