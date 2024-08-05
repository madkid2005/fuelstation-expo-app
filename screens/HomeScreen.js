import React, { useEffect, useRef, useState } from 'react';
import { View, Button, StyleSheet, Text, Animated, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [usageCount, setUsageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const initializeUser = async () => {
      try {
        let id = await AsyncStorage.getItem('userId');
        if (!id) {
          id = nanoid();
          await AsyncStorage.setItem('userId', id);
        }
        setUserId(id);

        const count = await AsyncStorage.getItem(`usageCount_${id}`);
        if (count !== null) {
          setUsageCount(parseInt(count, 10));
        }
      } catch (error) {
        console.error('Error initializing user:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleUsage = async () => {
    const newCount = usageCount + 1;
    if (newCount > 555) {
      Alert.alert('Demo Time', 'شما در حال حاضر استفاده از نسخه دمو بودید برای ادامه استفاده از اپلیکیشین با برنامه نویس اپ تماس بگیرید.');
    } else {
      setUsageCount(newCount);
      try {
        await AsyncStorage.setItem(`usageCount_${userId}`, newCount.toString());
        navigation.navigate('Calculations');
      } catch (error) {
        console.error('Error saving usage count:', error);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>در حال بارگذاری...</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={require('../assets/adaptive-icon.png')} style={styles.image} tintColor="#ffffff" />
      <Text style={styles.title}>سامانه بازرسی سرک-کسری جایگاه های سوخت GS PMC</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="شروع "
          onPress={handleUsage}
          color="blue"
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0005B4',
    padding: 20,
  },
  image: {
    width: 130,
    height: 100,
    tintColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default HomeScreen;
