import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const MoodTracking = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { id: 1, emoji: '😊', label: 'Happy' },
    { id: 2, emoji: '😐', label: 'Neutral' },
    { id: 3, emoji: '😔', label: 'Sad' },
    { id: 4, emoji: '😤', label: 'Frustrated' },
    { id: 5, emoji: '😴', label: 'Tired' },
    { id: 6, emoji: '🤗', label: 'Excited' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <View style={styles.moodGrid}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[styles.moodItem, selectedMood === mood.id && styles.selectedMood]}
            onPress={() => setSelectedMood(mood.id)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  selectedMood: {
    backgroundColor: '#3A3A3A',
    borderColor: '#B4FF39',
    borderWidth: 2,
  },
  moodEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  moodLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default MoodTracking;