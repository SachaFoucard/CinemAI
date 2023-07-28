import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '@react-native-material/core';
import { Stack } from "@react-native-material/core";
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

const SignInScreen = ({ navigation }) => {

  const { Login, setmail, setpassword, mail, password,pushed} = useContext(UserContext);

  return (
    <>
      <View style={styles.container} >
        <Image style={styles.img} source={require('../../../assets/SignUp/logo.png')} />
        <Text variant='h4' style={styles.text}>Login To Your Account</Text>
        <Stack spacing={2} style={{ margin: 16 }}>
          <TextInput
            style={styles.input}
            placeholder='Mail'
            placeholderTextColor="white"
            onChangeText={setmail}
          />

          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor="white"
            onChangeText={setpassword}
          />
        </Stack>
        <TouchableOpacity style={[styles.button , pushed && mail && password && {backgroundColor : '#E21121' }]}
          onPress={() => Login(navigation, mail, password)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signInLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
  },
  img: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginTop: 150,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  input: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 20,
    margin: 15,
    color: 'white'
  },
  button: {
    backgroundColor: 'grey',
    width: 350,
    height: 60,
    justifyContent: 'center',
    borderRadius: 25,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  signInText: {
    color: 'white',
  },
  signInLink: {
    color: '#E21121',
    fontSize: 19,
    marginLeft: 5
  }
});
