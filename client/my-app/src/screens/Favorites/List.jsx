import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const List = ({ navigation }) => {
  const { listFavs, getFavoritesList, removeFilmFromFavorites, mail,userId } = useContext(UserContext);


  
  useEffect(() => {
    getFavoritesList(mail);
  }, [mail, listFavs.length]);



  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        keyExtractor={(item) => item.id.toString()}
        data={listFavs}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` }} style={styles.img} />
            <View style={styles.fontGrade}>
              <Text style={styles.grade}>{item.vote_average}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFilmFromFavorites(userId,item.id)} style={styles.removeButton}>
              <Ionicons name="remove-outline" size={30} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
  },
  flatlist: {
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  fontGrade: {
    position: 'absolute',
    left: '15%',
    top: '6%',
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  img: {
    width: 180,
    height: 250,
    borderRadius: 20,
    marginLeft: 15,
  },
  grade: {
    color: 'white',
    fontSize: 10,
  },
  removeButton: {
    position: 'absolute',
    top: '6%',
    right: '6%',
  },
});

export default List;
