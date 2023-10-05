import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Category from '../../components/Category';
import HeaderHome from '../../components/HeaderHome';


const Home = ({ navigation }) => {
  const { popularF, TopRated, topRatedF, UpComing, UpComingF, mail } = useContext(UserContext);
  const [slider, setSlider] = useState([]); // Carousselle state


  const fetchData = async () => {
    setSlider(popularF.splice(0, 5)); // Set the Carousselle state to the first 5 films from popularF
  };

  useEffect(() => {
    fetchData();
    TopRated();
    UpComing();
  }, []);
 
  return (
    <ScrollView style={styles.container}>
      <HeaderHome film={slider} navigation={navigation} />

      {/* Categories */}
      <Category title="Popular" films={popularF} type="popular" />
      <Category title="Up Coming" films={UpComingF} type="upcoming" />
      <Category title="Top Rated" films={topRatedF} type="top_rated" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A21',
  },
  load: {
    position: 'absolute',
    bottom: '40%',
    left: '47%',
  },
  search: {
    position: 'absolute',
    right: '5%',
    top: '15%',
    zIndex: 1,
    flexDirection: 'row'
  },
});

export default Home;
