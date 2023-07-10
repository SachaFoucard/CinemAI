import { View, Text,StyleSheet,TextInput,TouchableOpacity  } from 'react-native'
import React, { useContext, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { UserContext } from '../../context/UserContext';

export default function EditProfile() {

    const {setFullName, setPhone, setGender, setCountry, setImage, image, country, gender, phone, fullName,mail, setmail} = useContext(UserContext)
    // name, mail, gender, phone, country
    const handleSave = async () => {
        let response = await fetch('https://cinemai.onrender.com/api/editProfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: fullName, mail: mail, phone: phone, gender: gender, country: country })
        });
       
          
            console.log('response', response.status);
            if (response.status === 401) {
                alert('Check your fields, user not found');
    
            } else if (response.status === 201) {
                const jsonResponse = await response.json();
                alert('You Connected successfully');
                // navigation.navigate('TabMenu');
            } else if (response.status === 402) {
                alert('fields empty');
            }
    
        
      };
  return (
    // name, mail, gender, phone, country 
    <View style={styles.container}>
    <Text style={styles.label}>Name:</Text>
    <TextInput
      style={styles.input}
      value={fullName}
      onChangeText={setFullName}
      placeholder="Enter your name"
    />

    <Text style={styles.label}>Mail:</Text>
    <TextInput
      style={styles.input}
      value={mail}
      onChangeText={setmail}
      placeholder="Enter your mail"
    />

    <Text style={styles.label}>Gender:</Text>
    <Picker
      style={styles.input}
      selectedValue={gender}
      onValueChange={(itemValue) => setGender(itemValue)}
    >
      <Picker.Item label="Male" value="male" />
      <Picker.Item label="Female" value="female" />
    </Picker>

    <Text style={styles.label}>Phone:</Text>
    <TextInput
      style={styles.input}
      value={phone}
      onChangeText={setPhone}
      placeholder="Enter your phone number"
    />

    <Text style={styles.label}>Country:</Text>
    <TextInput
      style={styles.input}
      value={country}
      onChangeText={setCountry}
      placeholder="Enter your country"
    />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181A21',
        padding: 20,
      },
      label: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
      },
      input: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
      },
  });

  