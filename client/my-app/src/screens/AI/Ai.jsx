import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import aiData from '../../data/ai.json';

const Ai = () => {
  const [displayText, setDisplayText] = useState('');
  const typingSpeed = 50; // Adjust typing speed as needed
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [ai, setAi] = useState([]);
  const [userInput, setUserInput] = useState('');

  const simulateTyping = () => {
    if (currentIndex < ai[count]?.text.length) {
      setDisplayText(ai[count]?.text.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    setAi(aiData);
    const typingInterval = setInterval(simulateTyping, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentIndex]);

  const handleInput = (text) => {
    setUserInput(text);

    // Process user input and update display text based on AI responses
    if (count === 1) {
      setCount(2);
    } else if (count === 2) {
      setCount(3);
    } else if (count === 3) {
      setCount(4);
    } else if (count === 4) {
      setCount(5);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayText}</Text>
      {count >= 2 && (
        <Text style={styles.aiResponse}>{ai[count - 1].text}</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={handleInput}
        placeholder="Your answer..."
        value={userInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  aiResponse: {
    marginTop: 10,
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  input: {
    marginTop: 20,
    paddingHorizontal: 10,
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Ai;
