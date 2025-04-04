import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';

// Screen components
import TodaySchedule from './screens/TodaySchedule';
import MoodTracking from './screens/MoodTracking';
import CollaborativeChallenges from './screens/CollaborativeChallenges';
import EnergyMonitoring from './screens/EnergyMonitoring';
import LoadingScreen from './screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello,{"\n"}Shubh Zatakia!</Text>
        <View style={styles.statusCard}>
          <Text style={styles.statusText}>Current Status</Text>
          <View style={styles.statusRow}>
            <Text style={styles.productiveText}>75%{"\n"}productive</Text>
            <TouchableOpacity style={styles.menuButton}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.helpText}>How can we help you?</Text>

      <View style={styles.grid}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('TodaySchedule')}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>↓</Text>
          </View>
          <Text style={styles.cardText}>Today's{"\n"}Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('MoodTracking')}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>☺</Text>
          </View>
          <Text style={styles.cardText}>Mood{"\n"}Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('CollaborativeChallenges')}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✓</Text>
          </View>
          <Text style={styles.cardText}>Collaborative{"\n"}Challenges</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('EnergyMonitoring')}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>≡</Text>
          </View>
          <Text style={styles.cardText}>Energy{"\n"}Monitoring</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Text style={styles.navIcon}>▶</Text>
        </View>
        <View style={styles.navItem}>
          <View style={styles.navCircle} />
        </View>
        <View style={styles.navItem}>
          <View style={styles.navSquare} />
        </View>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E1E1E',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Loading" 
          component={LoadingScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TodaySchedule" component={TodaySchedule} />
        <Stack.Screen name="MoodTracking" component={MoodTracking} />
        <Stack.Screen name="CollaborativeChallenges" component={CollaborativeChallenges} />
        <Stack.Screen name="EnergyMonitoring" component={EnergyMonitoring} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  header: {
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    color: '#B4FF39',
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 15,
  },
  statusText: {
    color: '#808080',
    marginBottom: 5,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productiveText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  menuButton: {
    padding: 5,
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: '#FFFFFF',
    marginVertical: 2,
  },
  helpText: {
    color: '#808080',
    fontSize: 16,
    marginVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    color: '#B4FF39',
    fontSize: 20,
  },
  cardText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    color: '#B4FF39',
    fontSize: 24,
  },
  navCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#808080',
  },
  navSquare: {
    width: 10,
    height: 10,
    backgroundColor: '#808080',
  },
});
