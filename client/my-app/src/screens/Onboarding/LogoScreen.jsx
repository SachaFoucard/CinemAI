import { View, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';

const LogoScreen = ({ navigation }) => {

  const Delay3s = () => {
    setTimeout(() => {
      navigation.navigate('Welcome')
    }, 5000);
  }

  useEffect(() => {
    Delay3s();
  }, [])


  return (
    <>
      <View style={styles.container}>
        <Image source={require('../../../assets/logoScreen/logo.png')}
          style={styles.img}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 100,
    marginTop: 300
  }
});

export default LogoScreen;
