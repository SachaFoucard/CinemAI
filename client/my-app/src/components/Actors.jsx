import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Image, Text, View } from 'react-native';

const Actors = ({ actors }) => {

    return (
        <FlatList
            horizontal
            data={actors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.actorContainer}>
                    {item.profile_path ? (
                        <View>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w200${item.profile_path}` }}
                                style={styles.imageActor}
                            />
                            <Text style={styles.text}>{item.name.slice(0, 10)}</Text>
                            <Text style={styles.text}>{item.known_for_department}</Text>
                        </View>
                    ) : (
                        <View>
                            <Image source={require('../../assets/setUpProfil/blankPp.webp')}
                                style={styles.imageActor}
                            />
                            <Text style={styles.text}>{item.name.slice(0, 10)}</Text>
                            <Text style={styles.text}>{item.known_for_department}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    actorContainer: {
        marginRight: 10,
        flexDirection: 'row',
        margin: 30
    },
    imageActor: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    text: {
        color: 'white'
    }
});

export default Actors;
