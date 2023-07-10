import React, { useState, useContext } from 'react';
import { Button, Image, View, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../../context/UserContext';

export default function ProfilSetUp({navigation}) {
  const { setFullName, setPhone, setGender, setCountry, setImage, image, country, gender, phone, fullName, mail,SaveInformationSetUp } = useContext(UserContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
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
        <View style={{ flexDirection: 'row' }}>
          <Picker
            selectedValue={gender}
            style={styles.pickerGender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            labelStyle={styles.pickerLabel}
          >
            <Picker.Item label="M" value="M" color='white' />
            <Picker.Item label="F" value="F" color='white' />
          </Picker>

          <Picker
            selectedValue={country}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
          >
            <Picker.Item label="EU 🇪🇺" value="EU" color='white' />
            <Picker.Item label="Africa 🇿🇦" value="Africa" color='white' />
            <Picker.Item label="North America 🇺🇸" value="North America" color='white' />
            <Picker.Item label="South America 🇻🇪" value="South America" color='white' />
            <Picker.Item label="Oceania 🇦🇺" value="Oceania" color='white' />
          </Picker>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonSkip} onPress={()=>navigation.navigate('TabMenu')}> 
            <Text style={styles.textSkip}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContinue} onPress={() => SaveInformationSetUp(navigation)} >
            <Text style={styles.textContinue}>Continue</Text>
          </TouchableOpacity>
        </View>
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
    width: 120,
    height: 120,
    borderRadius: 60
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
    width: 100,
    color: 'white',
  },
  picker: {
    width: 200,
    color: 'white',
  },
  pickerLabel: {
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContinue: {
    backgroundColor: 'red',
    padding: 4,
    borderRadius: 40,
    width: 150,
    height: 60,
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10
  },
  buttonSkip: {
    backgroundColor: 'grey',
    width: 150,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 10

  },
  textContinue: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  textSkip: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  }
});
