import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import aiData from '../../data/ai.json';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Ai = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [textToType, setTextToType] = useState([]);
  const typingSpeed = 150; // Adjust typing speed as needed
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('Feel free to write anything');
  const inputRef = useRef(null);

  const { mail } = useContext(UserContext);

  const chatScrollViewRef = useRef();

  const simulateTyping = (messages) => {
    if (currentIndex < messages[currentIndex]?.text.length) {
      setAllMessages(prevMessages => [...prevMessages, messages[currentIndex]?.text.slice(0, currentIndex + 1)]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const addMessage = (message, isAI = false) => {
    setAllMessages(prevMessages => [...prevMessages, { text: message, isAI }]);
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
      let aiResponse;

      switch (userMessage.toLowerCase()) {
        case 'hi':
          aiResponse = `AI: Hi ${mail}`;
          break;
        case 'hello':
          aiResponse = `AI: Hi ${mail}`;
          break;
          case 'comic':
          aiResponse = `AI: Hi ${mail}`;
          break;
        default:
          aiResponse = `AI: I understand you're interested in "${userMessage}" genre films. Here are some recommendations.`;
      }

      addMessage(aiResponse, true);

      // Scroll to the bottom of the chat
      chatScrollViewRef.current.scrollToEnd({ animated: true });
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
        <ScrollView
          ref={chatScrollViewRef}
          contentContainerStyle={styles.messageContainer}
        >
          {allMessages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageItem,
                message.isAI ? styles.aiMessageItem : styles.userMessageItem,
              ]}
            >
              <Text
                style={[
                  styles.message,
                  message.isAI ? styles.aiMessage : styles.userMessage,
                ]}
              >
                {message.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.barSendMess}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Talk with me"
          placeholderTextColor="grey"
          value={input}
          onChangeText={setInput}
          autoFocus={true} // Set the autoFocus prop to true
        />
        <TouchableOpacity style={styles.postButton} onPress={() => sendMess()}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

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
  },
  messageContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end', // Start from the bottom
  },
  messageItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userMessageItem: {
    justifyContent: 'flex-end',
  },
  aiMessageItem: {
    justifyContent: 'flex-start',
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
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: '#007AFF', // Blue color for user messages
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#34C759', // Green color for AI messages
    alignSelf: 'flex-start',
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
});

export default Ai;
