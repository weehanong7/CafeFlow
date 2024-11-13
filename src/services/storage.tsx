import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuItem, Order } from '../types';

const STORAGE_KEYS = {
  MENU_ITEMS: 'cafeflow_menu_items',
  ORDER_HISTORY: 'cafeflow_order_history',
};

export const StorageService = {
  // Menu Items
  saveMenuItems: async (items: MenuItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving menu items:', error);
    }
  },

  loadMenuItems: async (): Promise<MenuItem[]> => {
    try {
      const items = await AsyncStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error loading menu items:', error);
      return [];
    }
  },

  // Order History
  saveOrderHistory: async (orders: Order[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ORDER_HISTORY, JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving order history:', error);
    }
  },

  loadOrderHistory: async (): Promise<Order[]> => {
    try {
      const orders = await AsyncStorage.getItem(STORAGE_KEYS.ORDER_HISTORY);
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error('Error loading order history:', error);
      return [];
    }
  },

  // Clear all data
  clearAllData: async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.MENU_ITEMS,
        STORAGE_KEYS.ORDER_HISTORY,
      ]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  },
};
