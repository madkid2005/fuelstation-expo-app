import React, { useState, useContext } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputForm from '../components/InputForm';
import { performCalculations } from '../utils/calculations';
import { ThemeContext } from '../context/ThemeContext'; // Ensure correct path

const CalculationScreen = () => {
  const [results, setResults] = useState(null);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleCalculate = (data) => {
    const calcResults = performCalculations(data);
    setResults(calcResults);
    navigation.navigate('ResultsTabs', { results: calcResults });
  };

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputForm onCalculate={handleCalculate} />
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  pdfButtonContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default CalculationScreen;
