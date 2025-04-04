import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const EnergyMonitoring = () => {
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
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisLabel=""
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default EnergyMonitoring;