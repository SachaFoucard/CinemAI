import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { ActivityIndicator } from "@react-native-material/core";
import dataId from '../../data/genres.json';

const Explore = ({ navigation }) => {
  const { mail, GetGenreofUser, genreFav,explorefilms,getStockage30Films } = useContext(UserContext);

  // All films after filters 
  const [filmsAboutGenre, setFilmAboutGenre] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [mail]);

  const fetchData = async () => {
    await getStockage30Films()
    setIsLoading(true);
    await GetGenreofUser(mail);
    await getFilmAfterFilterGenre();
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
{
  console.log("genreFav",genreFav);
}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore More...</Text>
      <FlatList
        style={styles.flatlist}
        keyExtractor={(item) => item.id.toString()}
        horizontal={false}
        data={filmsAboutGenre} // Use the filtered films here
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ItemFilm', { item: item })}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` }} style={styles.img} />
            <View style={styles.fontGrade}>
              <Text style={styles.grade}>{item.vote_average}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  title: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
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
  }
});

export default Explore;
