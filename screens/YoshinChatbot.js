import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';

const YoshinChatbot = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! I\'m Yoshin. How can I help you today?', isBot: true },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim().length > 0) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now().toString(), text: newMessage, isBot: false },
      ]);
      setNewMessage('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { id: Date.now().toString(), text: 'I understand. Let me help you with that.', isBot: true },
        ]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.isBot ? styles.botMessage : styles.userMessage]}>
      {item.isBot && (
        <View style={styles.botAvatar}>
          <Text style={styles.botAvatarText}>Y</Text>
        </View>
      )}
      <View style={[styles.messageBubble, item.isBot ? styles.botBubble : styles.userBubble]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Yoshin Assistant</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messageList}
        inverted={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          placeholderTextColor="#808080"
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    backgroundColor: '#2A2A2A',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  headerText: {
    color: '#B4FF39',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#B4FF39',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  botAvatarText: {
    color: '#1E1E1E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 20,
  },
  botBubble: {
    backgroundColor: '#2A2A2A',
    borderTopLeftRadius: 5,
  },
  userBubble: {
    backgroundColor: '#B4FF39',
    borderTopRightRadius: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#3A3A3A',
    borderRadius: 20,
    padding: 12,
    color: '#FFFFFF',
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#B4FF39',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 20,
    color: '#1E1E1E',
  },
});

export default YoshinChatbot;