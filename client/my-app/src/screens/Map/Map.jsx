import React, {useState} from 'react';
import MapView , {  Marker,Heatmap  } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

export default function Map() {

  const [mapLat, setMapLat] = useState(6.841776681);
  const [mapLong, setMapLong] = useState(79.869319);
 
  const locationData = [
    {latitude: 6.841776681, longitude: 79.869319},
    {latitude: 6.84076664, longitude: 79.871323},
  ];

  return (
   <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: mapLat,
          longitude: mapLong,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      {locationData.map((data, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: data.latitude,
              longitude: data.longitude,
            }}
            title={`Marker ${index + 1}`}
            description={`Weight: ${data.weight}`}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
