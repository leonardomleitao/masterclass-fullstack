import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/app/data/contexts/theme.context';

export default function ThemeToggle() {
  const { isDark, setTheme, theme } = useTheme();
  const rotateAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(rotateAnim, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
    }).start();
  }, [isDark]);

  const toggleTheme = () => {
    // Animação de feedback ao clicar
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.85,
        useNativeDriver: true,
        speed: 50,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
      }),
    ]).start();

    setTheme(isDark ? 'light' : 'dark');
  };

  const sunRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const moonRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });

  const sunScale = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const moonScale = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const sunOpacity = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const moonOpacity = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={toggleTheme}
        style={[
          styles.container,
          {
            backgroundColor: isDark ? '#27272a' : '#fef08a',
          },
        ]}
        activeOpacity={0.8}
      >
        {/* Ícone do Sol */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ rotate: sunRotation }, { scale: sunScale }],
              opacity: sunOpacity,
            },
          ]}
        >
          <Ionicons name="sunny" size={20} color="#ca8a04" />
        </Animated.View>

        {/* Ícone da Lua */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ rotate: moonRotation }, { scale: moonScale }],
              opacity: moonOpacity,
            },
          ]}
        >
          <Ionicons name="moon" size={20} color="#60a5fa" />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
