import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Video, ResizeMode } from 'expo-av';


const Trailer = ({ name }) => {
    // Ref for the video player
    const video = React.useRef(null);

    // State for the video player status
    const [status, setStatus] = React.useState({});

    // State for the fetched trailer data
    const [trailer, setTrailer] = useState('');

    // Fetch trailer data when the component mounts or the name prop changes
    useEffect(() => {
        fetchData(name);
    }, []);

    // Fetch trailer data from the API
    const fetchData = async () => {
        const url = `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${name.title}%20trailer&next=1`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7632f6ab30mshfe41249fd386ccdp18d667jsne3f0704cc7ee',
                'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            const parsedResult = JSON.parse(result);
            const trailerUrl = parsedResult.items?.[0]?.url || ''; // Get the first item's URL if it exists, otherwise use an empty string
            setTrailer(trailerUrl);
        } catch (error) {
            console.error(error);
        }
    };



    console.log("trailer", trailer);

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    // uri: trailer + '.mp4',
                    uri: trailer + '.mp4'
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
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
    buttons: {
        marginTop: 20,
    },
});

export default Trailer;
