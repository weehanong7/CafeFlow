import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../app/screens/DashboardScreen';
import OrderHistoryScreen from '../app/screens/OrderHistoryScreen';
import SalesIncomeScreen from '../app/screens/SalesIncomeScreen';
import AddMenuItemScreen from '../app/screens/AddMenuItemScreen';
import OrderDetailScreen from '../app/screens/OrderDetailScreen';

type RootStackParamList = {
  Dashboard: undefined;
  OrderHistory: undefined;
  SalesIncome: undefined;
  AddMenuItem: undefined;
  OrderDetail: { orderId: string };
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Ionicons
              name="add"
              size={24}
              onPress={() => navigation.navigate('AddMenuItem')}
              style={{ marginRight: 15 }}
            />
          ),
        })}
      />
      <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
            } else if (route.name === 'OrderHistory') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'SalesIncome') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardStack} options={{ headerShown: false }} />
        <Tab.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Tab.Screen name="SalesIncome" component={SalesIncomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
