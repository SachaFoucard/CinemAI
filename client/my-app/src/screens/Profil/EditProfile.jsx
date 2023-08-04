import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { UserContext } from '../../context/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import genreData from '../../data/genres.json'

export default function EditProfile({ navigation }) {

  const { setFullName, setPhone, setGender, setCountry, setImage, image, country, gender, phone, fullName, mail, setmail, SaveEditProfile, genreFav, SetGenreFav, GetGenreofUser, handleGenreSelection } = useContext(UserContext)

  useEffect(() => {
    GetGenreofUser(mail)
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('TabMenu')}>
        <Ionicons style={styles.icon} name="chevron-back-outline" />
        <Text style={styles.title}>Help Center</Text>
      </TouchableOpacity>

      <View style={styles.userDisplay}>
        <TouchableOpacity>
          <Image source={require('../../../assets/setUpProfil/blankPp.webp')} style={styles.profileImg} />
        </TouchableOpacity>
        <Text style={styles.text}>{mail}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your name"
          placeholderTextColor="white"
        />

        <Picker
          style={styles.input}
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}>
          <Picker.Item label="Male" value="male" color='white' />
          <Picker.Item label="Female" value="female" color='white' />
        </Picker>

        <Picker style={styles.input} selectedValue={genreFav} onValueChange={handleGenreSelection}>
          {genreData.map((genreName) => (
            <Picker.Item key={genreName.type} label={`${genreName.type}${genreFav.includes(genreName.type) ? ' ✓' : ''}`} value={genreName.type} color="white" />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          placeholderTextColor="white"
        />

        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
          placeholder="Enter your country"
          placeholderTextColor="white"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => SaveEditProfile(navigation)}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
  },

  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderRadius: 5,
    padding: 12,
    backgroundColor: "#2D353A",
    color: "white",
    borderRadius: 12,
  },
  inputContainer: {

  },
  header: {
    flexDirection: 'row',
    margin: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    fontSize: 30,
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userDisplay: {
    alignItems: 'center',

  },
  text: {
    color: 'white',
    fontSize: 30,
  },
  profileImg: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 50,
  },
  saveButton: {
    padding: 17,
    borderRadius: 20,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent:'center'
  },
  saveButtonText: {
    color: "white",
    fontSize: 25
  },

});

