import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Category = ({ title, type,films }) => {

  const navigation = useNavigation()
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllFilms',{type:type,title:title,films:films})}>
          <Text style={styles.btnSeeAll}>See all</Text>
        </TouchableOpacity>

      </View>
      <FlatList
        keyExtractor={(item) => item.id.toString()} // Use a function to extract the key
        horizontal
        data={films}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={(()=>navigation.navigate('ItemFilm',{item:item}))}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` }}
              style={styles.img} />
            <View style={styles.fontGrade}>
              <Text style={styles.grade}>{item.vote_average}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15
  },
  title: {
    color: 'white',
    fontSize: 30,
    margin: 10
  },
  img: {
    width: 130,
    height: 200,
    borderRadius: 20,
    marginLeft: 15,
    position: 'relative'
  },
  btnSeeAll: {
    color: 'red',
    fontSize: 17
  },
  grade: {
    color: 'white',
    fontSize: 15
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
})
export default Category