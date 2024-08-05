import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CalculationScreen from './screens/CalculationScreen';
import ResultsTabs from './screens/ResultsTabs';

import { ThemeProvider } from './context/ThemeContext'; // Adjust the path as per your project structure
import 'react-native-get-random-values';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Image
                  style={styles.headerImage}
                  source={require('./assets/GSPMC.png')} // مسیر به تصویر
                  resizeMode="contain" // برای حفظ نسبت تصویر و جلوگیری از برش
                />
              </View>
            ),
            headerTitleAlign: 'center', // برای قرار دادن عنوان در وسط
            headerStyle: {
              backgroundColor: 'blue', // تنظیم رنگ پس‌زمینه به آبی
              height: 90, // تنظیم ارتفاع ثابت برای هدر
            },
          }}
        >
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

const styles = StyleSheet.create({
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center', // تنظیم موقعیت عمودی تصویر به مرکز
    alignItems: 'center', // تنظیم موقعیت افقی تصویر به مرکز
  },
  headerImage: {
    width: 666,
    height: 44, // تنظیم ارتفاع تصویر به 100%
  },
});

export default App;
