// ResultsTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import GasolineResults from './GasolineResults';
import GasResults from './GasResults';
import BothResults from './BothResults';

const Tab = createBottomTabNavigator();

const ResultsTabs = ({ route }) => {
  const { results } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'نتایج بنزین') {
            iconName = 'local-gas-station';
          } else if (route.name === 'نتایج گاز') {
            iconName = 'whatshot';
          } else if (route.name === 'نتایج هر دو') {
            iconName = 'list'; // یا آیکون مناسب دیگر
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="نتایج بنزین" children={() => <GasolineResults results={results} />} />
      <Tab.Screen name="نتایج گاز" children={() => <GasResults results={results} />} />
      <Tab.Screen name="نتایج هر دو" children={() => <BothResults results={results} />} />
    </Tab.Navigator>
  );
};

export default ResultsTabs;
