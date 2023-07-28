import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '@react-native-material/core';

const Comment = ({ username, text, date }) => {
  return (
    <View style={styles.post}>
      <Avatar alt={username} />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333333',
    marginBottom: 10,
    borderRadius: 8,
  },
  username: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    color: 'white',
    marginTop: 5,
  },
  date: {
    color: 'white',
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default Comment;
