import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import genreId from '../data/genres.json';
import { UserContext } from '../context/UserContext';
import Actors from './Actors';

const Film = ({ route, navigation: { goBack } }) => {
  const { item } = route.params;
  const { actors, GetActorsAboutFilm } = useContext(UserContext);


  useEffect(() => {
    GetActorsAboutFilm(item.id)
  }, [item.id]) // updating screen each time that the id film is changing

  //function to transform the array number reference id into the type (horror,comedy)
  const getGenreName = (id) => {
    const genre = genreId.find((genre) => genre.id === id);
    return genre ? genre.type : '';
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImage}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item?.poster_path}` }}
          style={styles.img}
        />
        <Ionicons name="arrow-back-outline" size={32} color="white"
          style={styles.iconArrow}
          onPress={() => goBack()} />
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{item?.original_title}</Text>
          <Ionicons name="camera" size={32} color="white"
            style={styles.iconScreen} />
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
          <Text style={styles.genres}> Genre:
            {item?.genre_ids?.map((genreId, index, array) => (
              <Text style={styles.genres}
                key={genreId}>{getGenreName(genreId)}{index !== array.length - 1 ? ', ' : ', ...'}</Text>
            ))}
          </Text>
          <Text style={styles.genres}>{item?.overview}</Text>
        </View>
        <Actors actors={actors} />
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21'
  },
  img: {
    width: '100%',
    height: 400
  },
  title: {
    color: 'white',
    fontSize: 29,
    marginLeft: 20,
    marginTop: 20
  },
  iconScreen: {
    marginTop: 25,
    marginRight: 20,
  },
  iconArrow: {
    position: 'absolute',
    top: '20%',
    left: '5%'
  },
  textRedBorder: {
    color: 'red',
    fontSize: 16,
    marginLeft: 20,
    borderColor: 'red',
    borderWidth: 1,
    padding: 8,
    borderRadius: 10

  },
  textRed: {
    color: 'red',
    fontSize: 18,
    marginLeft: 4
  },
  details: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
    , marginLeft: 20
  },
  textWhite: {
    color: 'white',
    fontSize: 18,
    marginLeft: 20
  },
  genreOverview: {
    marginLeft: 15,
    marginTop: 18,
  },
  genres: {
    color: 'white',
    fontSize: 15,
    marginRight: 10,
    marginTop: 10
  },

})
export default Film