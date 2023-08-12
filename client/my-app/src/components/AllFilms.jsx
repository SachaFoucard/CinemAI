import { View, Text, SafeAreaView, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const AllFilms = ({ route, navigation }) => {
  // Extract the necessary parameters from the route
  const { type, title } = route.params;

  // Access the necessary data and functions from the context
  const { AllFilmType, TypePage2 } = useContext(UserContext);

  useEffect(() => {
    // Call the necessary functions and update the state
    AllFilmType(type);
  }, [type, AllFilmType]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={32} color="white" style={styles.iconArrow} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

      {/* Film list */}
      <FlatList
        style={styles.flatlist}
        keyExtractor={(item) => item.id.toString()}
        horizontal={false}
        data={TypePage2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={(() => navigation.navigate('ItemFilm', { item: item }))}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` }}
              style={styles.img} />
            <View style={styles.fontGrade}>
              <Text style={styles.grade}>{item.vote_average}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21'
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
  iconArrow: {
    marginRight: 10
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 30,
  },
  flatlist: {
    marginTop: 20
  },
  img: {
    width: 180,
    height: 250,
    borderRadius: 20,
    marginLeft: 15,
    position: 'relative',
    marginTop: 20
  },
  grade: {
    color: 'white',
    fontSize: 10,
  },
  fontGrade: {
    position: 'absolute',
    left: '15%',
    top: '6%',
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'red',
    borderRadius: 5
  }
});

export default AllFilms;
