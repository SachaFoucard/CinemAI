import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '@react-native-material/core';

const Comment = ({ username, text, date }) => {
  return (
    <View style={styles.post}>
      <View style={{ flexDirection: 'row' }}>
        <Avatar label={username} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    marginLeft:10
  },
  username: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    color: 'white',
    marginTop: 15,
    marginLeft:5

  },
  date: {
    color: 'white',
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default Comment;
