// ChatScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';


const ChatScreen = () => {
  const route = useRoute();
  const { user } = route.params; // Get the selected user from the navigation parameters

  // Dummy data for demonstration
  const dummyMessages = [
    { id: 1, sender: 'User 1', message: 'Hello', timestamp: new Date() },
    { id: 2, sender: 'User 2', message: 'Hi there!', timestamp: new Date() },
    // Add more messages as needed
  ];

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(dummyMessages);

  const sendMessage = () => {
    if (message.trim() === '') return;
    const newMessage = { id: messages.length + 1, sender: 'You', message, timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{user.name}</Text>
      </View>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageContainer}>
            <Text style={styles.sender}>{msg.sender}</Text>
            <Text style={styles.message}>{msg.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginBottom: 10,
  },
  sender: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sendButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
