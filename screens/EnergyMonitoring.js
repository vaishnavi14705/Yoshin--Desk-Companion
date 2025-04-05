import React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const EnergyMonitoring = ({ navigation }) => {
  // Sample data - this can be replaced with real data later
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 70],
        color: (opacity = 1) => `rgba(180, 255, 57, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisLabel=""
        bezier
        chartConfig={{
          backgroundColor: '#1E1E1E',
          backgroundGradientFrom: '#2A2A2A',
          backgroundGradientTo: '#2A2A2A',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          barPercentage: 0.7,
          barRadius: 5,
        }}
        style={styles.chart}
      />

      <View style={styles.questionsContainer}>
        <Text style={styles.questionsTitle}>Frequently Asked Questions</Text>
        <ScrollView>
          <TouchableOpacity 
            style={styles.questionItem}
            onPress={() => navigation.navigate('YoshinChatbot', { question: 'How is my energy score calculated?' })}
          >
            <Text style={styles.questionText}>How is my energy score calculated?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.questionItem}
            onPress={() => navigation.navigate('YoshinChatbot', { question: 'What factors affect my productivity levels?' })}
          >
            <Text style={styles.questionText}>What factors affect my productivity levels?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.questionItem}
            onPress={() => navigation.navigate('YoshinChatbot', { question: 'How can I improve my daily energy patterns?' })}
          >
            <Text style={styles.questionText}>How can I improve my daily energy patterns?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.questionItem}
            onPress={() => navigation.navigate('YoshinChatbot', { question: 'Tips for maintaining consistent energy levels?' })}
          >
            <Text style={styles.questionText}>Tips for maintaining consistent energy levels?</Text>
          </TouchableOpacity>
        </ScrollView>
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  questionsContainer: {
    marginTop: 20,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    maxHeight: 200,
  },
  questionsTitle: {
    color: '#B4FF39',
    fontSize: 16,
    marginBottom: 10,
  },
  questionItem: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default EnergyMonitoring;