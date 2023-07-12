import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import genreId from '../data/genres.json';
import { UserContext } from '../context/UserContext';
import Actors from './Actors';
import Trailer from '../components/Trailer'

const Film = ({ route, navigation: goBack }) => {
  const { item } = route.params;
  const { actors, GetActorsAboutFilm } = useContext(UserContext);
  const [selectedMenu, setSelectedMenu] = useState('');

  useEffect(() => {
    GetActorsAboutFilm(item.id);
  }, [item]);

  const getGenreName = (id) => {
    const genre = genreId.find((genre) => genre.id === id);
    return genre ? genre.type : '';
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImage}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original/${item?.poster_path}` }}
          style={styles.img}
        />
        <Ionicons
          name="arrow-back-outline"
          size={32}
          color="white"
          style={styles.iconArrow}
          onPress={() => goBack.goBack()} // Use goBack.goBack() instead of goBack()
        />

      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{item?.original_title}</Text>
          <Ionicons name="camera" size={32} color="white" style={styles.iconScreen} />
        </View>
        <View style={styles.details}>
          <Ionicons name="star" size={22} color="red" />
          <Text style={styles.textRed}>{item?.vote_average}</Text>
          <Text style={styles.textWhite}>{item?.release_date.slice(0, 4)}</Text>
          <Text style={styles.textRedBorder}>{item?.adult ? <Text>18+</Text> : <Text>13+</Text>}</Text>
          <Text style={styles.textRedBorder}>{item?.original_language}</Text>
          <Text style={styles.textRedBorder}>subsistle</Text>
        </View>
        <View style={styles.genreOverview}>
          <Text style={styles.genres}>
            Genre:
            {item?.genre_ids?.map((genreId, index, array) => (
              <Text style={styles.genres} key={genreId}>
                {getGenreName(genreId)}
                {index !== array.length - 1 ? ', ' : ', ...'}
              </Text>
            ))}
          </Text>
          <Text style={styles.genres}>{item?.overview}</Text>
        </View>
        <Actors actors={actors} />
      </View>
      <View style={styles.barMenu}>
        <TouchableOpacity onPress={() => handleMenuClick('trailers')}>
          <Text style={[styles.titleMenuBar, selectedMenu === 'trailers' && styles.highlightedMenu]}>Trailers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuClick('more')}>
          <Text style={[styles.titleMenuBar, selectedMenu === 'more' && styles.highlightedMenu]}>More Like This</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMenuClick('comments')}>
          <Text style={[styles.titleMenuBar, selectedMenu === 'comments' && styles.highlightedMenu]}>Comments</Text>
        </TouchableOpacity>
      </View>

      {selectedMenu === 'trailers' && (
        <View>
          <Text style={styles.menuContent}>Trailers content goes here</Text>
          <Trailer name={item}/>
        </View>
      )}
      {selectedMenu === 'more' && (
        <View>
          <Text style={styles.menuContent}>More Like This content goes here</Text>
        </View>
      )}
      {selectedMenu === 'comments' && (
        <View>
          <Text style={styles.menuContent}>Comments content goes here</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
  },
  img: {
    width: '100%',
    height: 400,
  },
  title: {
    color: 'white',
    fontSize: 29,
    marginLeft: 20,
    marginTop: 20,
  },
  iconScreen: {
    marginTop: 25,
    marginRight: 20,
  },
  iconArrow: {
    position: 'absolute',
    top: '20%',
    left: '5%',
  },
  textRedBorder: {
    color: 'red',
    fontSize: 16,
    marginLeft: 20,
    borderColor: 'red',
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
  },
  textRed: {
    color: 'red',
    fontSize: 18,
    marginLeft: 4,
  },
  details: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginLeft: 20,
  },
  textWhite: {
    color: 'white',
    fontSize: 18,
    marginLeft: 20,
  },
  genreOverview: {
    marginLeft: 15,
    marginTop: 18,
  },
  genres: {
    color: 'white',
    fontSize: 15,
    marginRight: 10,
    marginTop: 10,
  },
  titleMenuBar: {
    fontSize: 20,
    color: 'white',
  },
  highlightedMenu: {
    color: 'red',
  },
  barMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  menuContent: {
    color: 'white',
    fontSize: 18,
    margin: 10,
  },
});

export default Film;
