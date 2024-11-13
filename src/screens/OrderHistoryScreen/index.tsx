// src/screens/OrderHistoryScreen.tsx
import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { OrderCard } from '../../components/order/OrderCard';
import { useOrder } from '../../hooks/useOrder';
import { COLORS, PAYMENT_STATUS } from '../../constants';

const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const { orderHistory } = useOrder();
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredOrders = filterStatus
    ? orderHistory.filter(order => order.paymentStatus === filterStatus)
    : orderHistory;

  const renderFilterButton = (status: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filterStatus === status && styles.activeFilterButton
      ]}
      onPress={() => setFilterStatus(
        filterStatus === status ? null : status
      )}
    >
      <Text style={[
        styles.filterButtonText,
        filterStatus === status && styles.activeFilterButtonText
      ]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {Object.values(PAYMENT_STATUS).map((status) => (
          renderFilterButton(status)
        ))}
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="document-text-outline"
              size={48}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyStateText}>
              {filterStatus
                ? `No ${filterStatus} orders found`
                : 'No orders yet'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    color: COLORS.text,
    fontSize: 14,
  },
  activeFilterButtonText: {
    color: COLORS.background,
  },
  listContent: {
    flexGrow: 1,
    padding: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default OrderHistoryScreen;
