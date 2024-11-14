// src/components/order/OrderCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Order } from '../../types';
import { COLORS } from '../../constants';

type OrderCardProps = {
  order: Order;
  onPress: (order: Order) => void;
};

const StatusBadge = ({ status }: { status: Order['paymentStatus'] }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'paid':
        return COLORS.success;
      case 'pending':
        return COLORS.warning;
      case 'cancelled':
        return COLORS.danger;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.badgeText}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
};

export const OrderCard = ({ order, onPress }: OrderCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(order)}
    >
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <StatusBadge status={order.paymentStatus} />
      </View>

      <View style={styles.details}>
        <Text style={styles.timestamp}>
          {new Date(order.timestamp).toLocaleString()}
        </Text>
        <Text style={styles.itemCount}>
          {order.items.length} items
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>RM{order.totalAmount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: '500',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  timestamp: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  itemCount: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: 14,
    color: COLORS.text,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
