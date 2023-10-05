import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput,TouchableOpacity,
} from 'react-native';
import { Text } from '@react-native-material/core';
import { Stack } from '@react-native-material/core';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { ActivityIndicator } from '@react-native-material/core';
import Ionicons from '@expo/vector-icons/Ionicons';

const SignUpScreen = ({ navigation }) => {
  const { setMail, setPassword, Register, mail, password, loadingResponse, pushed } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../../../assets/SignUp/logo.png')} />
        <Text variant='h4' style={styles.text}>
          Create Your Account
        </Text>
        {loadingResponse ? (
          <ActivityIndicator size='large' color='white' style={styles.load} />
        ) : null}
        <Stack spacing={2} style={{ margin: 16 }}>
          <TextInput
            style={styles.input}
            placeholder='Mail'
            placeholderTextColor='white'
            onChangeText={setMail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder='Password'
              placeholderTextColor='white'
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.passwordVisibilityButton}
              onPress={togglePasswordVisibility}
            >
              <Text style={styles.passwordVisibilityText}>
                {showPassword ? <Ionicons color='white' size={30} name='eye-outline'/> : <Ionicons color='grey' size={30} name='eye-off-outline'/>}
              </Text>
            </TouchableOpacity>
          </View>
        </Stack>
        <TouchableOpacity
          style={[styles.button,pushed,mail && password && { backgroundColor: '#E21121' },]}onPress={() => Register(navigation, mail, password)} >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SignUpScreen;

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
    width:'95%',
    margin: 15,
    color: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordVisibilityButton: {
    position: 'absolute',
    right: 10,
  },
  passwordVisibilityText: {
    marginRight:10
  },
  button: {
    width: 350,
    height: 60,
    backgroundColor: '#E21121',
    justifyContent: 'center',
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInText: {
    color: 'white',
  },
  signInLink: {
    color: '#E21121',
    fontSize: 19,
    marginLeft: 5,
  },
  load: {
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust for indicator size
    zIndex: 1,
  },
});
