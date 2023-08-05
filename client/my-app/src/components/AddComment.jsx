import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserContext } from '../context/UserContext';

const AddComment = ({ idFilm }) => {
  const { mail, allcomments } = useContext(UserContext);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // take only the good part date
  const [text, setText] = useState("");

  const inputRef = useRef(null); // Create a ref for the input

  useEffect(() => {

  }, [allcomments.length, allcomments])

  const PostComment = async () => {
    const idFilmString = String(idFilm);

    const newComment = {
      username: mail,
      text: text,
      date: date,
    };

    const data = await fetch('https://cinemai.onrender.com/api/comments/postComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idFilm: idFilmString, comments: [newComment] }),
    });

    if (data.status === 201) {
      alert('Comment posted');
      setText(""); // Reset the input field value
      inputRef.current.clear(); // Clear the input field using the ref
    } else {
      console.log('wrong');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef} // Attach the ref to the input
        style={styles.input}
        placeholder="Add comment..."
        placeholderTextColor="grey"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.postButton} onPress={() => PostComment()}>
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
    borderRadius: 14,
    borderWidth: 1,
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
