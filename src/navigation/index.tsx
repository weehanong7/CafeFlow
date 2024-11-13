import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import SalesIncomeScreen from '../screens/SalesIncomeScreen';
import AddMenuItemScreen from '../screens/AddMenuItemScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';

import { RootStackParamList, RootTabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'OrderHistory') {
            iconName = focused ? 'time' : 'time-outline';
          } else {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Ionicons
              name="add"
              size={24}
              color="#007AFF"
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('AddMenuItem')}
            />
          ),
        })}
      />
      <Tab.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Tab.Screen name="SalesIncome" component={SalesIncomeScreen} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
