import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { useSpring, animated } from '@react-spring/native';
import MotivationalQuote from './components/MotivationalQuote';
import { TouchableOpacity, ScrollView } from 'react-native';

const AnimatedText = animated(Text);

// Screen components
import TodaySchedule from './screens/TodaySchedule';
import YoshinChatbot from './screens/YoshinChatbot';
import CollaborativeChallenges from './screens/CollaborativeChallenges';
import EnergyMonitoring from './screens/EnergyMonitoring';
import LoadingScreen from './screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const greetingSpring = useSpring({
    from: { opacity: 0, translateY: 50, scale: 0.9 },
    to: { opacity: 1, translateY: 0, scale: 1 },
    config: { tension: 100, friction: 10 },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <AnimatedText
          style={[
            styles.greeting,
            {
              opacity: greetingSpring.opacity,
              transform: [
                { translateY: greetingSpring.translateY },
                { scale: greetingSpring.scale }
              ]
            }
          ]}
        >Hello,{"\n"}Shubh Zatakia!</AnimatedText>
        
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusText}>Current Status</Text>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statusBody}>
            <Text style={styles.productiveText}>75%{"\n"}productive</Text>
          </View>
        </View>
      </View>

      <Text style={styles.helpText}>How can we help you?</Text>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {[
          {
            icon: '📅',
            text: 'Today\'s\nSchedule',
            onPress: () => navigation.navigate('TodaySchedule')
          },
          {
            icon: '💬',
            text: 'Yoshin\nAssistant',
            onPress: () => navigation.navigate('YoshinChatbot')
          },
          {
            icon: '✓',
            text: 'Collaborative\nChallenges',
            onPress: () => navigation.navigate('CollaborativeChallenges')
          },
          {
            icon: '📊',
            text: 'Energy\nMonitoring',
            onPress: () => navigation.navigate('EnergyMonitoring')
          }
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={item.onPress}>
            <View style={styles.iconContainer}>
              <Text style={styles.cardIcon}>{item.icon}</Text>
            </View>
            <Text style={styles.cardText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <MotivationalQuote />

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
        <Stack.Screen name="YoshinChatbot" component={YoshinChatbot} />
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
    marginBottom: 20,
    padding: 15,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  statusText: {
    color: '#808080',
    fontSize: 16,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  productiveText: {
    color: '#FFFFFF',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  helpText: {
    color: '#808080',
    fontSize: 16,
    marginVertical: 20,
  },
  gridContainer: {
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
  cardIcon: {
    fontSize: 24,
    color: '#B4FF39',
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
