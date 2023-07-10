import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const Film = ({ route, navigation: { goBack } }) => {
  const { item } = route.params;


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
          <Text style={styles.text}><Ionicons name="star" size={22} color="red" />  9.8</Text>
          <Text style={styles.text}><Ionicons name="chevron-forward-outline" size={22} color="red" /></Text>
        </View>
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
  text: {
    color: 'red',
    fontSize:16
  },
  details:{
flexDirection:'row'
  }
})
export default Film