import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

const CollaborativeChallenges = () => {
  const [challenges] = useState([
    {
      id: '1',
      title: 'Morning Routine Challenge',
      participants: 5,
      status: 'In Progress',
      daysLeft: 7
    },
    {
      id: '2',
      title: 'Productivity Sprint',
      participants: 3,
      status: 'Starting Soon',
      daysLeft: 2
    },
    {
      id: '3',
      title: 'Focus Time Challenge',
      participants: 8,
      status: 'In Progress',
      daysLeft: 4
    }
  ]);

  const renderChallenge = ({ item }) => (
    <TouchableOpacity style={styles.challengeCard}>
      <Text style={styles.challengeTitle}>{item.title}</Text>
      <View style={styles.challengeDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Participants</Text>
          <Text style={styles.detailValue}>{item.participants}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Status</Text>
          <Text style={[styles.detailValue, styles.statusText]}>{item.status}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Days Left</Text>
          <Text style={styles.detailValue}>{item.daysLeft}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Active Challenges</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={challenges}
        renderItem={renderChallenge}
        keyExtractor={item => item.id}
        style={styles.challengeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  createButton: {
    backgroundColor: '#B4FF39',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  challengeList: {
    flex: 1,
  },
  challengeCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  challengeTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  challengeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    color: '#808080',
    fontSize: 12,
    marginBottom: 5,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  statusText: {
    color: '#B4FF39',
  },
});

export default CollaborativeChallenges;