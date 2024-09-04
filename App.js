import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CodeVerificationScreen from './screens/CodeVerificationScreen';
import SendSmsScreen from './screens/SendSmsComponent';

import HomeScreen from './screens/HomeScreen';
import CalculationScreen from './screens/CalculationScreen';
import ResultsTabs from './screens/ResultsTabs';
import { ThemeProvider } from './context/ThemeContext'; // Adjust the path as per your project structure
import 'react-native-get-random-values';
import { Buffer } from 'buffer';
global.Buffer = Buffer;


const Stack = createStackNavigator();

const App = () => {
  const [approvedNumbers, setApprovedNumbers] = useState([]);

  const addApprovedNumber = (number) => {
    setApprovedNumbers([...approvedNumbers, number]);
  };

  return (
    <ThemeProvider>

    <NavigationContainer>
    <Stack.Navigator initialRouteName="SendSms">
        <Stack.Screen
          name="SendSms"
          component={SendSmsScreen}
          options={{ title: 'ارسال پیامک' }}
        />
        <Stack.Screen
          name="CodeVerification"
          component={CodeVerificationScreen}
          options={{ title: 'تایید کد' }}
        />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Calculations"
            component={CalculationScreen}
            options={{ title: 'محاسبات' }}
          />
          <Stack.Screen
            name="ResultsTabs"
            component={ResultsTabs}
            options={{ title: 'گزارش ها' }}
          />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>

  );
};

export default App;
