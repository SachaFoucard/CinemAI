import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import genreId from '../data/genres.json';
import { UserContext } from '../context/UserContext';
import Actors from './Actors';
import Trailer from '../components/Trailer'
import Comment from '../components/Comments'

const Film = ({ route, navigation }) => {
  const { item } = route.params;
  const { actors, GetActorsAboutFilm, getAllcomments, LastComment, setLastComment, AddFilm, userId } = useContext(UserContext);
  const [selectedMenu, setSelectedMenu] = useState('');


  useEffect(() => {
    getAllcomments(item.id); // Fetch all comments when the Film component mounts
    setLastComment([])
    GetActorsAboutFilm(item.id);
  }, [item.id]);

  const getGenreName = (id) => {
    const genre = genreId.find((genre) => genre.id === id);
    return genre ? genre.type : '';
  };

  const ToggleBarBottom = (menu) => {
    setSelectedMenu(menu);
    if (selectedMenu === 'comments') {
      getAllcomments(item.id);
    }
  };

  const AlertAdd = () => {
    Alert.alert('Are you sure ?', 'To add the film to your playlist ', [
      {
        text: 'NO',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
      { text: 'YES', onPress: () => AddFilm(userId, item) },
    ]);
  }

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
          onPress={() => navigation.navigate('TabMenu')} // Use goBack.goBack() instead of goBack()
        />

      </View>
      <TouchableOpacity onPress={() => AlertAdd()} style={styles.btnAdd}>
        <Ionicons name="add-circle" color={'white'} size={40} />
      </TouchableOpacity>
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
        <TouchableOpacity onPress={() => ToggleBarBottom('trailers')}>
          <Text style={[styles.titleMenuBar, selectedMenu === 'trailers' && styles.highlightedMenu]}>Trailers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ToggleBarBottom('more')}>
          <Text style={[styles.titleMenuBar, selectedMenu === 'more' && styles.highlightedMenu]}>More Like This</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ToggleBarBottom('comments')}>
          <Text style={[styles.titleMenuBar, selectedMenu === 'comments' && styles.highlightedMenu]}>Comments</Text>
        </TouchableOpacity>
      </View>

      {selectedMenu === 'trailers' && (
        <View style={styles.Menu}>
          <Trailer name={item} />
        </View>
      )}
      {selectedMenu === 'more' && (
        <View style={styles.Menu}>
          <Text style={styles.menuContent}>More Like This content goes here</Text>
        </View>
      )}
      {selectedMenu === 'comments' && (
        <View style={styles.MenuC}>
          <TouchableOpacity>
            <Text style={styles.all} onPress={() => navigation.navigate('allcomments', { itemId: item.id })}>See all</Text>
          </TouchableOpacity>
          {
            !LastComment || !Array.isArray(LastComment) ? <Text style={styles.txt}> 0 comments</Text> :
              <View style={styles.comments}>
                <View style={styles.headerBar}>
                  <Text style={styles.nbrscomm}>{LastComment.length} Comments</Text>
                </View>
                <FlatList
                  style={styles.flatlist}
                  data={LastComment.reverse()}
                  keyExtractor={(item, index) => index.toString()} // Change keyExtractor to use index.toString()
                  renderItem={({ item }) => (
                    <Comment username={item.username} text={item.text} date={item.date} style={styles.txt} />
                  )}
                />
              </View>
          }
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
  Menu: {
    paddingBottom: 50,
    paddingTop: 50,
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
  all: {
    color: 'red',
    textAlign: 'right',
    marginRight: 10,
    marginTop: 20,
    fontSize: 20
  },
  nbrscomm: {
    fontSize: 25,
    color: 'white',
    marginLeft: 15,
  },
  btnAdd: {
    position: 'absolute',
    top: '30%',
    right: '2%',

  },
  txt: {
    color: 'white',
    textAlign: 'center',
  }
});

export default Film;
