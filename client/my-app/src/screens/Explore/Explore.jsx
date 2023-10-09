import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { ActivityIndicator, TextInput } from "@react-native-material/core";
import dataId from '../../data/genres.json';
import Ionicons from '@expo/vector-icons/Ionicons';

const Explore = ({ navigation }) => {
  const { mail, GetGenreofUser, genreFav, explorefilms, getStockage30Films } = useContext(UserContext);

  // All films after filters 
  const [filmsAboutGenre, setFilmAboutGenre] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState(false)

  const [text, setText] = useState('');

  const [filmInput, setFilmInput] = useState([]);

  useEffect(() => {
    fetchData();
  }, [mail]);

  useEffect(() => {
    let data = explorefilms.filter((films) => {
      // Check if the object has the 'original_title' property
      if (films.title && typeof films.title === 'string') {
        return films.original_title.toLowerCase().includes(text.toLowerCase());
      }
      return false;
    });
    setFilmInput(data);
  }, [text, explorefilms]);

  const fetchData = async () => {
    await getStockage30Films()
    setIsLoading(true);
    await GetGenreofUser(mail);
    getFilmAfterFilterGenre();
    setIsLoading(false);
  };

  const getFilmAfterFilterGenre = () => {
    const filteredGenres = dataId.filter((genre) => genreFav.includes(genre.type));

    const filteredFilms = explorefilms.filter((film) => {
      return filteredGenres.some((genre) => film.genre_ids.includes(genre.id));
    });
    setFilmAboutGenre(filteredFilms);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color='#E21121' />
      </View>
    );
  }

  const renderFilmItem = (item) => (
    <TouchableOpacity onPress={() => navigation.navigate('ItemFilm', { item })}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` }} style={styles.img} />
      <View style={styles.fontGrade}>
        <Text style={styles.grade}>{item.vote_average}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TextInput
  style={[styles.searchInput, { color: 'white' }]}
  placeholder="Search films..."
  placeholderTextColor="black"
  onChangeText={setText}
/>
        <TouchableOpacity style={styles.icnSearch} onPress={() => setSearch(!search)}>
          <Ionicons name="search" size={35} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.flatlist}
        keyExtractor={(item) => item.id}
        horizontal={false}
        data={filmInput.length ? filmInput : filmsAboutGenre}
        renderItem={({ item }) => renderFilmItem(item)}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#181A21'
  },
  icnSearch: {
    position: 'absolute',
    right: '7%',
    top: '45%'
  },
  title: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
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
    fontSize: 10
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
  },
  flatlist: {
    marginTop: 30
  },
  searchInput: {
    marginTop: 30,
    marginRight: 30,
    borderWidth: 1,
    width: 300,
    height: 60,
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
});

export default Explore;
