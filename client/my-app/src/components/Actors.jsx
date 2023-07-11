import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Image, View } from 'react-native';

const Actors = ({ actors }) => {
 
    return (
        <FlatList
            horizontal
            data={actors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.actorContainer}>
                    {item.profile_path ? (
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w200${item.profile_path}` }}
                            style={styles.imageActor}
                        />
                    ) : (
                        ''
                    )}
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    actorContainer: {
        marginRight: 10,
    },
    imageActor: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    noImageActor: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
    },
});

export default Actors;
