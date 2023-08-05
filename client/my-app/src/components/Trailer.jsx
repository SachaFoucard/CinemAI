import { StyleSheet, View, Button } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { WebView } from 'react-native-webview';

const Trailer = ({ name }) => {
  // Ref for the video player
  const video = useRef(null);
  const [status, setStatus] = useState({});

  // State for the fetched trailer data
  const [trailer, setTrailer] = useState(null);

  // Fetch trailer data when the component mounts or the name prop changes
  useEffect(() => {
    if (name && name.id) {
      fetchData(name.id);
    }
  }, [name]);

  // Fetch trailer data from the API
  const fetchData = async (id) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWM2NzRlZWU2NTc5ZWI3ZWMxZTEyZGY2NmJlNDAwMyIsInN1YiI6IjY0NjIyNjlmOGM0NGI5MDE1M2RjMWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UeA6Vc9H6D7Bl34qAgv5dLIPBGwtQlu_v74yXGbbUbA',
      },
    };

    try {
      const url = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
      const response = await url.json();
      setTrailer(response?.results[0]?.key);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {trailer && (
        <WebView
          ref={video} // Use the video ref here
          style={styles.video}
          source={{ uri: `https://www.youtube.com/embed/${trailer}` }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      )}
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 200,
  },
});

export default Trailer;
