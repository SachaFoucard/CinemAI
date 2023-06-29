import { View, StyleSheet } from 'react-native';
import { Text } from '@react-native-material/core';
import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { UserContext } from '../../context/UserContext';

const InterestScreen = ({navigation}) => {
  const { SetGenreFav, genreFav } = useContext(UserContext);
  const buttons = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Science Fiction',
    'TV Movie',
    'Thriller',
    'War',
    'Western'
  ];
  
  // Add or remove a genre from the selected genres
  const toggleGenre = (genre) => {
    let updatedGenres = [];
    if (genreFav.includes(genre)) {
      updatedGenres = genreFav.filter((item) => item !== genre);
    } else {
      updatedGenres = [...genreFav, genre];
    }
    SetGenreFav(updatedGenres);
  };

  const SkipNoSelectedGenres = () => {
    genreFav.splice(0); // remove the arrayGenre 
    navigation.navigate('ProfilSetUp')

  }

  const renderButtons = () => {
    const rows = [];
    let row = [];

    buttons.forEach((button, index) => {
      const isActive = genreFav.includes(button);

      row.push(
        <TouchableOpacity
          onPress={() => toggleGenre(button)}
          key={index}
          style={[styles.button, isActive && styles.activeButton]}
        >
          <Text style={[styles.buttonText, isActive && styles.activeText]}>{button}</Text>
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
{
  console.log(genreFav);
}
  return (
    <View style={styles.container}>
      <View>
        <Text variant='h5' style={styles.title}>Choose Your Interest</Text>
        <Text variant='h6' style={styles.subsistle}>
          Choose your interests and get the best movie recommendations. Don't worry, you can always change it later.
        </Text>
      </View>
      <View style={styles.section}>{renderButtons()}</View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonSkip} onPress={()=>SkipNoSelectedGenres()}>
          <Text style={styles.textSkip}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContinue} onPress={()=>navigation.navigate('ProfilSetUp')}>
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
    borderRadius: 65,
    borderColor: 'red',
    borderWidth: 1,
    justifyContent: 'center'
  },
  activeButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'red',
    padding: 4,
    textAlign: 'center'
  },
  activeText: {
    color: 'white',
  },
  section: {
    marginTop: 10,

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
