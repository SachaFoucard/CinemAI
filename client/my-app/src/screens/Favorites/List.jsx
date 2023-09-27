import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, TouchableHighlight, Swipeable } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const List = ({ navigation }) => {
  const { listFavs, getFavoritesList, removeFilmFromFavorites, mail, userId } = useContext(UserContext);

  useEffect(() => {
    getFavoritesList(mail);
  }, [mail, listFavs, listFavs.length]);

  const AlertRemoveFilm = (item) => {
    Alert.alert('Are you sure ?', 'To remove the film from your playlist ', [
      {
        text: 'NO',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
      { text: 'YES', onPress: () => removeFilmFromFavorites(userId, item.id) },
    ]);
  }
 
  return (
    <View style={styles.container}>
      {
        listFavs.some(item => Object.keys(item).length > 0) ?
          <View>
            <View style={styles.ttleHEADR}>
              <Text style={styles.wht}>My Watchlist</Text>
              <Ionicons name='list' size={30} color='white' style={styles.icnhedr} />
            </View>
            <FlatList
              style={styles.flatlist}
              keyExtractor={(item) => item.original_title}
              data={listFavs}
              renderItem={({ item }) => (

                <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ItemFilm', { item: item })}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` }} style={styles.img} />
                  <View style={styles.fontGrade}>
                    <Text style={styles.grade}>{item.vote_average}</Text>
                  </View>
                  <TouchableOpacity onPress={() => AlertRemoveFilm(item)} style={styles.removeButton}>
                    <Ionicons name="trash-outline" size={30} color="red" />
                  </TouchableOpacity>
                </TouchableOpacity>

              )}
              numColumns={1}
            />
          </View>
          : <View style={styles.emptyMess}>
            <Text style={styles.wht}>PlayList Empty</Text>
            <TouchableOpacity style={styles.iconAdd} onPress={() => navigation.navigate('Home')}>
              <Ionicons name="add-outline" size={30} color="red" />
            </TouchableOpacity>
          </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
    paddingBottom: 150
  },
  ttleHEADR: {
    flexDirection: 'row',
    paddingTop: 30,
    justifyContent: 'center',
    margin: 30
  },
  flatlist: {
  },
  ttleList: {
    fontSize: 30,
    color: 'red'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  wht: {
    color: 'white',
    fontSize: 30,
  },
  emptyMess: {
    position: 'absolute',
    top: '50%',
    left: '25%',
  },
  fontGrade: {
    position: 'absolute',
    left: '42%',
    top: '0%',
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  img: {
    width: 180,
    height: 200,
    borderRadius: 20,
    marginLeft: 15,
  },
  grade: {
    color: 'white',
    fontSize: 10,
  },
  removeButton: {
    position: 'absolute',
    top: '30%',
    right: '20%',
  },
  iconAdd: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 5,
    borderRadius: 20,
    alignItems: 'center'
  },
  icnhedr: {
    marginLeft: 20,
    marginTop: 5
  }
});

export default List;
