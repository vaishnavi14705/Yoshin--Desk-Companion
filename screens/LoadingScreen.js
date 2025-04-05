import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { useSpring, animated } from '@react-spring/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AnimatedView = animated(View);
const AnimatedText = animated(Text);

const LoadingScreen = ({ navigation }) => {
  const logoSpring = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 120, friction: 14 },
  });

  const textSpring = useSpring({
    from: { opacity: 0, translateY: 50 },
    to: { opacity: 1, translateY: 0 },
    delay: 500,
    config: { tension: 100, friction: 20 },
  });

  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedView 
        style={[
          styles.logoContainer,
          {
            opacity: logoSpring.opacity,
            transform: [{ scale: logoSpring.scale }]
          }
        ]}
      >
        <Image
          source={require('../assets/splash-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </AnimatedView>
      <AnimatedText
        style={[
          styles.greeting,
          {
            opacity: textSpring.opacity,
            transform: [{ translateY: textSpring.translateY }]
          }
        ]}
      >
        
      </AnimatedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight,
  },
  greeting: {
    color: '#B4FF39',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
  },
  logo: {
    width: '100%',
    height: '100%',
    maxWidth: screenWidth * 0.6,
    maxHeight: screenWidth * 0.6,
  },
});

export default LoadingScreen;