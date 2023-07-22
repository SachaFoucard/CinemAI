import React, { useState, useEffect, useRef } from 'react';
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native';

import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null); // Ref for the MapView component

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

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={{ alignSelf: 'stretch', height: '100%' }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Corrected image prop syntax */}
          <Marker
            coordinate={location.coords}
            title='Your Position'
            style={{ width: 30, height: 30 }}
          />
        </MapView>
      )}
      <TouchableOpacity style={styles.positionme} onPress={handleLocalizeMe}>
        <Ionicons name="navigate-circle" color='blue' size={30} />
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
});
