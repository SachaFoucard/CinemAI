import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfilSetUp() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (<Image source={{ uri: image }}
            style={styles.img}
          />
          ) : (
            <Image source={require('../../../assets/setUpProfil/blankPp.webp')}
              style={styles.img}
            />)}
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100
  },
  inputs:{
    marginTop:100
  }
});