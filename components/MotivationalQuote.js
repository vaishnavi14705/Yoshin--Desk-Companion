import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

const quotes = [
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don't watch the clock; do what it does. Keep going.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Success is walking from failure to failure with no loss of enthusiasm.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Your time is limited, don't waste it living someone else's life.",
  "The best way to predict the future is to create it."
];

const MotivationalQuote = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const fadeAnim = new Animated.Value(1);

  const changeQuote = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();

    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    const interval = setInterval(changeQuote, 10000); // Change quote every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.quote, { opacity: fadeAnim }]}>
        "{quote}"
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
  },
  quote: {
    color: '#B4FF39',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default MotivationalQuote;