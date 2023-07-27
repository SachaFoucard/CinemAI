import React from 'react';
import { View, Text } from 'react-native';

const Comment = ({ username, text, date }) => {
  return (
    <View>
      <Text>{username}</Text>
      <Text>{text}</Text>
      <Text>{date}</Text>
    </View>
  );
};

export default Comment;
