import React, { useState, useContext } from 'react';
import { Button, Image, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../../context/UserContext';

export default function ProfilSetUp() {
  const { setFullName, setPhone, setGender, setCountry, setImage, image, country, gender, phone, fullName, mail } = useContext(UserContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.img} />
          ) : (
            <Image source={require('../../../assets/setUpProfil/blankPp.webp')} style={styles.img} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="grey" onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Phone" placeholderTextColor="grey" onChangeText={setPhone} keyboardType="phone-pad" maxLength={10} />
        <TextInput style={styles.input} editable={false} value={mail} />

        <Picker
          selectedValue={gender}
          style={styles.pickerGender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          labelStyle={styles.pickerLabel}
        >
          <Picker.Item label="M" value="M" />
          <Picker.Item label="F" value="F" />
        </Picker>

        <Picker
          selectedValue={country}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
          labelStyle={styles.pickerLabel}
        >
          <Picker.Item label="EU 🇪🇺" value="EU" />
          <Picker.Item label="Africa 🇿🇦" value="Africa" />
          <Picker.Item label="North America 🇺🇸" value="North America" />
          <Picker.Item label="South America 🇻🇪" value="South America" />
          <Picker.Item label="Oceania 🇦🇺" value="Oceania" />
        </Picker>
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
    height: 100,
  },
  inputs: {
    marginTop: 100,
  },
  form: {
    marginTop: 30,
  },
  input: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 20,
    margin: 15,
    color: 'white',
    width: 300,
  },
  pickerGender: {
    width: 300,
    color: 'white',
  },
  picker: {
    width: 300,
    color: 'white',
  },
  pickerLabel: {
    color: 'white',
  },
});
