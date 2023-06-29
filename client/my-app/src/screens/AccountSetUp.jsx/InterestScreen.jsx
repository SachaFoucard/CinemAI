import { View, StyleSheet } from 'react-native';
import { Text } from '@react-native-material/core';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const InterestScreen = () => {
  const buttons = [
    'Action',
    'Drama',
    'Comedy',
    'Thriller',
    'Romance',
    'Sciences',
    'Music',
    'Documentary',
    'Crime',
    'Fantasy',
    'Mystery',
    'Fiction',
    'History',
    'Television',
    'Superheroes',
    'Anime',
    'Sport'
  ];

  const renderButtons = () => {
    const rows = [];
    let row = [];

    buttons.forEach((button, index) => {
      row.push(
        <TouchableOpacity key={index} style={styles.button}>
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      );

      if ((index + 1) % 3 === 0 || index === buttons.length - 1) {
        rows.push(
          <View key={rows.length} style={styles.row}>
            {row}
          </View>
        );
        row = [];
      }
    });

    return rows;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text variant='h5' style={styles.title}>Choose Your Interest</Text>
        <Text variant='h6' style={styles.subsistle}>Choose your interests and get the best movie recommendations. Don't worry you can always change it later.</Text>
      </View>
      <View style={styles.section}>{renderButtons()}</View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonSkip}>
          <Text style={styles.textSkip}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContinue}>
          <Text style={styles.textContinue}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InterestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginTop: 100,
    marginRight: 80
  },
  subsistle: {
    color: 'white',
    marginTop: 40,
    marginLeft: 25,
    width: 360
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 5,
    width: 100,
    borderColor: 'red',
    borderWidth: 1,
    margin: 20,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'red',
    padding: 4,
    textAlign: 'center'
  },
  section: {
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10

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
    marginLeft:10,
    marginTop:10
  },
  buttonSkip: {
    backgroundColor: 'grey',
    width: 150,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    marginRight:10,
    marginTop:10

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
