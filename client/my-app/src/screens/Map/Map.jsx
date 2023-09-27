import React, { useState, useEffect, useRef } from 'react';
import { Platform, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { Circle } from 'react-native-maps';

import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  //state closest position cinema (state empty) // before searching
  const [cinemaclosest, setCinemaclosest] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapRef = useRef(null); // Ref for the MapView component

  //infos about the closest cinema (adress,phone..)
  const [positionClosest, setPositionClosest] = useState({
    latitude: null,
    longitude: null,
    name: '',  // Initialize with appropriate properties
    adress: '',
    tel: '',
  });


  const localizeMySelf = async () => {
    if (Platform.OS === 'android' && !Device.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
      );
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  useEffect(() => {
    // The `localizeMySelf` function will only run once when the component mounts
    localizeMySelf();
  }, []);


  //return the closest cinema from database cinema about my position
  const findCinemaClosest = async () => {

    try {
      let data = await fetch('https://cinemai.onrender.com/api/map/findCinema', {
        method: 'POST', // Use POST method to send the body data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          long: location?.coords?.longitude, //  sending my longitude position
          lat: location?.coords?.latitude, //  sending my latitude position 
          km: selectedRange
        }),
      });

      if (data.status === 201) {
        const response = await data.json();
        console.log("data.status", data.status);
        console.log("response", response);
  
        setCinemaclosest({
          latitude: Number(response.lat),
          longitude: Number(response.long),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
  
        // Use the imported cinema data
        setPositionClosest(cinemaclosest);
      } else {
        // Update the state without the cinema's location
        // Set up place cinema
        setCinemaclosest({
          latitude: null,
          longitude: null,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        alert('Cinema not in your radius location');
      }
    } catch (error) {
      console.error("Error in findCinemaClosest:", error);
      alert('Cinema not in your radius location');
    }
  };
  const handleLocalizeMe = () => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [selectedRange, setSelectedRange] = useState(1); // Initial range of 5 kilometers

  return (
    <View style={styles.container}>
      {!location ? ( // Use parentheses to wrap the condition
        <Text>Waiting to localize you...</Text> // if localize you not yet 
      ) : (
        location && (
          <MapView
            ref={mapRef}
            style={{ alignSelf: 'stretch', height: '100%' }}
            region={cinemaclosest.latitude ? cinemaclosest : { // Use cinemaclosest if available, otherwise use user's location
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {location.coords.latitude && ( // Show user's marker only if location is available
              <Marker
                coordinate={location?.coords}
                title='Your Position'
                style={{ width: 30, height: 30 }}
                pinColor='blue'
              />
            )}
            {/* Draw a blue circle around the user's position */}
            {location.coords.latitude && (
              <Circle
                center={location?.coords}
                radius={selectedRange * 1000} // Convert selectedRange to meters
                strokeColor="blue"
                fillColor="rgba(0, 0, 255, 0.1)" // Blue with opacity
              />
            )}
            {cinemaclosest && cinemaclosest.longitude && (
              <Marker
                coordinate={{longitude: cinemaclosest.longitude,latitude: cinemaclosest.latitude,}}
                //  title={positionClosest.name}
                //  description={positionClosest?.adress + positionClosest?.tel}
                pinColor='red'
              />
            )}

          </MapView>
        ))}
      <TouchableOpacity style={styles.positionme} onPress={handleLocalizeMe}>
        <Ionicons name="navigate-circle" color='blue' size={30} />
      </TouchableOpacity>
      <View style={styles.rangeContainer}>
        <Text style={styles.rangeLabel}>Select Range (km): {selectedRange}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={50}
          step={1}
          value={selectedRange}
          onValueChange={value => setSelectedRange(value)}
        />
      </View>
      <TouchableOpacity style={styles.findbtn} onPress={findCinemaClosest}>
        <Ionicons name="car-sport-outline" color='red' size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  positionme: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  findbtn: {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  rangeContainer: {

    marginBottom: 10,
    position: 'absolute',
    bottom: '5%',
    left: '30%'
  },
  rangeLabel: {
    marginRight: 10,
    fontSize: 16,
    color: 'black',
  },
  slider: {
    flex: 1,
  },
});
