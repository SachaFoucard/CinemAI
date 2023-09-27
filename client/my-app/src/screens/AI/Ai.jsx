import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Ai = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [input, setInput] = useState('');

  const inputRef = useRef(null);
  const chatScrollViewRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat whenever allMessages changes
    chatScrollViewRef.current.scrollToEnd({ animated: true });
  }, [allMessages]);

  const addMessage = (message, isAI = false) => {
    setAllMessages((prevMessages) => [...prevMessages, { text: message, isAI }]);
  };

  const handleSendMessage = () => {
    const userMessage = input.trim(); // Remove leading/trailing whitespace
    if (userMessage === '') return; // Don't send empty messages

    addMessage(userMessage);

    // Simulate AI response (for demonstration purposes)
    setTimeout(() => {
      let aiResponse = '';

      const lowercaseUserMessage = userMessage.toLowerCase(); // Convert user's message to lowercase

      if (lowercaseUserMessage.includes('hi') || lowercaseUserMessage.includes('hello')) {
        aiResponse = `AI: Hi there!`;
      } else if (lowercaseUserMessage.includes('how are you')) {
        aiResponse = `AI: I'm just a computer program, so I don't have feelings, but I'm here to assist you! How can I help you today?`;
      } else if (lowercaseUserMessage.includes("what's the weather like today?")) {
        aiResponse = `AI: I'm sorry, I don't have real-time data. You can check the weather on a weather website or app.`;
      } else if (lowercaseUserMessage.includes('tell me a joke')) {
        aiResponse = `AI: Sure, here's one: Why did the scarecrow win an award? Because he was outstanding in his field!`;
      } else if (['comic', 'mystery', 'romance', 'adventure', 'action', 'horror', 'comedy', 'thriller', 'war', 'fantasy'].some(keyword => lowercaseUserMessage.includes(keyword))) {
        aiResponse = `AI: I understand that you're interested in ${userMessage} film ?`;
      } else {
        // If no keyword matches, provide a default response
        aiResponse = `AI: I didn't quite catch that. Can you please rephrase or ask another question?`;
      }

      addMessage(aiResponse, true);
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

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Talk with me"
          placeholderTextColor="grey"
          value={input}
          onChangeText={setInput}
          autoFocus={true} // Set the autoFocus prop to true
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 14,
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
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  sendButton: {
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
});

export default Ai;
