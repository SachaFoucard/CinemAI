import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button, FlatList } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-uuid';

const Ai = () => {

  const navigation = useNavigation();
  const [firstFilm, setFirstFilm] = useState(false); // turn over the picture 
  const [secondFilm, setSecondFilm] = useState(false); // turn over the picture 

  const [wordTitle1, setWordTitle1] = useState(''); // State to store the entered film name for the first film
  const [wordTitle2, setWordTitle2] = useState(''); // State to store the entered film name for the second film

  const [dataFilm1, setDatafilm1] = useState(null); // State to store the result for the first film
  const [dataFilm2, setDataFilm2] = useState(null); // State to store the result for the second film

  const [recommandationFilms, setRecommandationFilms] = useState([]);

  const { SearchAiFilm } = useContext(UserContext);

  useEffect(() => {
    setRecommandationFilms([])
  }, [dataFilm1, dataFilm2]);

  const Recommandation = async (id1, id2) => {
    try {
      if (!id1 || !id2) {
        console.error('Invalid movie IDs');
        return;
      }

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWM2NzRlZWU2NTc5ZWI3ZWMxZTEyZGY2NmJlNDAwMyIsInN1YiI6IjY0NjIyNjlmOGM0NGI5MDE1M2RjMWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UeA6Vc9H6D7Bl34qAgv5dLIPBGwtQlu_v74yXGbbUbA'
        }
      };

      // Fetch recommendations for the first movie (id1)
      const response1 = await fetch(`https://api.themoviedb.org/3/movie/${id1}/recommendations?language=en-US&page=1`, options);
      if (!response1) {
        console.error('Failed to fetch recommendations for the first movie');
        return;
      }
      const data1 = await response1.json();

      // Fetch recommendations for the second movie (id2)
      const response2 = await fetch(`https://api.themoviedb.org/3/movie/${id2}/recommendations?language=en-US&page=1`, options);
      if (!response2) {
        console.error('Failed to fetch recommendations for the second movie');
        return;
      }
      const data2 = await response2.json();

      // Combine the recommendations from both movies and limit to the first 2 recommendations from each
      const combinedRecommendations = [
        ...(data1?.results || []).slice(0, 5),
        ...(data2?.results || []).slice(0, 5)
      ];

      if (combinedRecommendations) {
        setRecommandationFilms(combinedRecommendations);
      } else {
        console.error('No recommendations available');
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>What would you watch Tonight ? </Text>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => SearchAiFilm(wordTitle1, setDatafilm1)}>
            {firstFilm && dataFilm1 ? (
              <Image
                style={styles.img}
                source={{ uri: `https://image.tmdb.org/t/p/original/${dataFilm1?.backdrop_path}` }}
              />
            ) : (
              <Image
                style={styles.img}
                source={{ uri: 'https://i.pinimg.com/550x/40/90/0b/40900b2708df9c2bcb6af5defb29cfc9.jpg' }}
              />
            )}
            <TextInput
              onChangeText={(text) => {
                setFirstFilm(!firstFilm);
                setWordTitle1(text);
              }}
              placeholder='Enter film name'
              style={styles.input}
              value={wordTitle1}
            />
          </TouchableOpacity>
          <Text style={styles.plus}>+</Text>
          <TouchableOpacity onPress={() => SearchAiFilm(wordTitle2, setDataFilm2)}>
            {secondFilm && dataFilm2 ? (
              <Image
                style={styles.img}
                source={{ uri: `https://image.tmdb.org/t/p/original/${dataFilm2?.backdrop_path}` }}
              />
            ) : (
              <Image
                style={styles.img}
                source={{ uri: 'https://i.pinimg.com/550x/40/90/0b/40900b2708df9c2bcb6af5defb29cfc9.jpg' }}
              />
            )}
            <TextInput
              onChangeText={(text) => {
                setSecondFilm(!secondFilm);
                setWordTitle2(text);
              }}
              placeholder='Enter film name'
              style={styles.input}
              value={wordTitle2}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.equal}>=</Text>
        {
          recommandationFilms.length > 0 ? <View style={styles.results}>
            <FlatList
              data={recommandationFilms}
              keyExtractor={(item) => uuid()}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity onPress={(() => navigation.navigate('ItemFilm', { item: item }))}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item?.backdrop_path}` }}
                    style={styles.resultsImg} />
                  <View style={styles.fontGrade}>
                    <Text style={styles.grade}>{item?.vote_average}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View> : (
            <Text style={styles.answer}>No recommendations available</Text>
          )}


        <TouchableOpacity style={styles.btnSearch} onPress={() => Recommandation(dataFilm1.id, dataFilm2.id)}>
          <Text style={styles.txt}>Search</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 14,
  },
  title: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    padding: 20,
  },
  btnSearch: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '10%',
    backgroundColor: 'white',
    padding: 15,
    width: 200,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  img: {
    width: 130,
    height: 200,
    borderRadius: 20,
    marginLeft: 15,
    position: 'relative'
  },
  answer: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop:'50'
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
  },
  plus: {
    fontSize: 50,
    color: 'red',
    marginTop: 100,
    marginLeft: 15
  },
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderColor: 'white'
  },
  equal: {
    color: 'red',
    textAlign: 'center',
    fontSize: 50
  },
  txt: {
    alignSelf: 'center',
    fontSize: 20,
  },
  results: {
    marginTop: 50
  },
  resultsImg: {
    width: 100,
    height: 170,
    borderRadius: 20,
    marginLeft: 15,
    position: 'relative'
  }
});

export default Ai;
