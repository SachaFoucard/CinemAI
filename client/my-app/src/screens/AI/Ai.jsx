import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import aiData from '../../data/ai.json';
import Ionicons from '@expo/vector-icons/Ionicons';

const Ai = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [textToType, setTextToType] = useState([]);
  const typingSpeed = 50; // Adjust typing speed as needed
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const simulateTyping = (messages) => {
    if (currentIndex < messages[currentIndex]?.text.length) {
      setAllMessages(prevMessages => [...prevMessages, messages[currentIndex]?.text.slice(0, currentIndex + 1)]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const addMessage = (message) => {
    setAllMessages(prevMessages => [...prevMessages, message]);
  };

  useEffect(() => {
    setTextToType(aiData);
    const typingInterval = setInterval(() => simulateTyping(textToType), typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentIndex, textToType]);

  const sendMess = () => {
    const userMessage = input;
    addMessage(userMessage);

    // Simulate AI response (for demonstration purposes)
    setTimeout(() => {
      const aiResponse = `AI: I understand you're interested in "${userMessage}" genre films. Here are some recommendations.`;
      addMessage(aiResponse);
    }, 1000);

    setInput('');
    inputRef.current.clear();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust as needed
    >
      <View style={styles.chatContainer}>
        {allMessages.map((message, index) => (
          <Text key={index} style={[styles.message, message.startsWith('AI:') && styles.aiMessage]}>
            {message}
          </Text>
        ))}
      </View>
      <View style={styles.barSendMess}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Which type of film"
          placeholderTextColor="grey"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.postButton} onPress={() => sendMess()}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
  },
  chatContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  input: {
    color: 'white',
    fontSize: 16,
  },
  postButton: {
    marginLeft: 10,
  },
  message: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  barSendMess: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
});

export default Ai;