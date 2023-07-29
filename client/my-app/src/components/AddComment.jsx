import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const AddComment = () => {
  const [postText, setPostText] = useState('');

  const handlePost = () => {
    // Handle the post action here (e.g., send the post to the server)
    console.log('Posted:', postText);
    // Clear the post input after posting
    setPostText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add comment..."
        placeholderTextColor="grey"
        value={postText}
        onChangeText={(text) => setPostText(text)}
      />
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Ionicons name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20,
    borderRadius:14,
    borderWidth:1
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 8,
 
  },
  postButton: {
    marginLeft: 10,
  },
});

export default AddComment;
