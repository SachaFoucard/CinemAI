import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Category from '../../components/Category';
import HeaderHome from '../../components/HeaderHome';

const Home = () => {
  const { popularF } = useContext(UserContext);
  const [slider, setSlider] = useState([]) // carousselle states
  const [popular, setpopular] = useState([])

  const fetchData = async () => {
    { setSlider(popularF.splice(0, 5)); } // state for the Carousselle take only the 5 first film from popularF
    // setpopular(popular(5, popular.length));
  };

  useEffect(() => {
    fetchData();
    console.log(popularF);
    console.log();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderHome film={slider} />
    </View>
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
});

export default Home;
