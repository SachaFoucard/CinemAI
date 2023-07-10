import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { ActivityIndicator } from "@react-native-material/core";

const Explore = () => {
  const { mail, GetFilmAboutUserGenre, StockageFilm, genreFav, SetGenreFav } = useContext(UserContext);
  const [filmsAboutGenre, setFilmAboutGenre] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     fetchData();
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [mail]);


  // const fetchData = async () => {
  //   await GetFilmAboutUserGenre(mail);
  //   setIsLoading(false);
  // };

  console.log("genreFav", genreFav); // Enclose console.log within curly braces

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color='#E21121' />
      </View>
    );
  }

  return (
    <View>
      <Text>Explore</Text>
      {/* Render your actual content here */}
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
});

export default Explore;
