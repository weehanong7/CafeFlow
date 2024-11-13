// src/screens/DashboardScreen.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CategoryTabs } from '../../components/menu/CategoryTabs';
import { MenuItemCard } from '../../components/menu/MenuItemCard';
import { useMenu } from '../../hooks/useMenu';
import { useOrder } from '../../hooks/useOrder';
import { COLORS } from '../../constants';
import { MenuItem } from '../../types';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<MenuItem['category']>('food');
  const { menuItems, getMenuItemsByCategory } = useMenu();
  const { currentOrder, addToOrder, completeOrder, clearOrder } = useOrder();

  const filteredItems = getMenuItemsByCategory(selectedCategory);

  const handleAddToOrder = (item: MenuItem) => {
    addToOrder(item);
  };

  const handleCompleteOrder = () => {
    if (!currentOrder || currentOrder.items.length === 0) {
      Alert.alert('Error', 'No items in current order');
      return;
    }

    Alert.alert(
      'Complete Order',
      'Are you sure you want to complete this order?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          onPress: () => {
            completeOrder();
            Alert.alert('Success', 'Order completed successfully');
          },
        },
      ]
    );
  };

  const calculateTotal = () => {
    if (!currentOrder) return 0;
    return currentOrder.items.reduce((total, item) => total + item.subtotal, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuSection}>
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {menuItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No menu items available</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddMenuItem')}
            >
              <Text style={styles.addButtonText}>Add Menu Item</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MenuItemCard
                item={item}
                onPress={handleAddToOrder}
              />
            )}
            contentContainerStyle={styles.menuList}
          />
        )}
      </View>

      <View style={styles.orderSection}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderTitle}>Current Order</Text>
          {currentOrder && currentOrder.items.length > 0 && (
            <TouchableOpacity
              onPress={() => clearOrder()}
              style={styles.clearButton}
            >
              <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
            </TouchableOpacity>
          )}
        </View>

        {!currentOrder || currentOrder.items.length === 0 ? (
          <View style={styles.emptyOrder}>
            <Text style={styles.emptyOrderText}>No items in order</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={currentOrder.items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.orderItem}>
                  <View style={styles.orderItemInfo}>
                    <Text style={styles.orderItemName}>{item.menuItem.name}</Text>
                    <Text style={styles.orderItemQuantity}>x{item.quantity}</Text>
                  </View>
                  <Text style={styles.orderItemPrice}>
                    ${item.subtotal.toFixed(2)}
                  </Text>
                </View>
              )}
              style={styles.orderList}
            />

            <View style={styles.orderFooter}>
              <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>
                  ${calculateTotal().toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.completeButton}
                onPress={handleCompleteOrder}
              >
                <Text style={styles.completeButtonText}>Complete Order</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.background,
  },
  menuSection: {
    flex: 2,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  menuList: {
    padding: 10,
  },
  orderSection: {
    flex: 1,
    padding: 15,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  clearButton: {
    padding: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '500',
  },
  emptyOrder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyOrderText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  orderList: {
    flex: 1,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 16,
  },
  orderItemQuantity: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 15,
    marginTop: 10,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    color: COLORS.text,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
  },
  completeButton: {
    backgroundColor: COLORS.success,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;
