import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { COLORS, PAYMENT_STATUS } from '../../constants';
import { useOrder } from '../../hooks/useOrder';

type OrderDetailScreenRouteProp = RouteProp<RootStackParamList, 'OrderDetail'>;

const OrderDetailScreen = () => {
  const route = useRoute<OrderDetailScreenRouteProp>();
  const navigation = useNavigation();
  const { orderId } = route.params;
  const { getOrderById, updateOrderStatus } = useOrder();

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Order not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleStatusUpdate = (newStatus: keyof typeof PAYMENT_STATUS) => {
    Alert.alert(
      'Update Status',
      `Are you sure you want to mark this order as ${newStatus}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Update',
          onPress: () => {
            updateOrderStatus(orderId, newStatus.toLowerCase() as typeof order.paymentStatus);
            Alert.alert('Success', 'Order status updated successfully');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <Text style={styles.timestamp}>
          {new Date(order.timestamp).toLocaleString()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        {order.items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.menuItem.name}</Text>
              <Text style={styles.itemQuantity}>x{item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>
              ${item.subtotal.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Status</Text>
        <View style={styles.statusButtons}>
          {Object.entries(PAYMENT_STATUS).map(([key, status]) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                order.paymentStatus === status.toLowerCase() && styles.activeStatusButton
              ]}
              onPress={() => handleStatusUpdate(key as keyof typeof PAYMENT_STATUS)}
            >
              <Text style={[
                styles.statusButtonText,
                order.paymentStatus === status.toLowerCase() && styles.activeStatusButtonText
              ]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalAmount}>
          ${order.totalAmount.toFixed(2)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: COLORS.text,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '500',
  },
  timestamp: {
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
  },
  itemQuantity: {
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  activeStatusButton: {
    backgroundColor: COLORS.primary,
  },
  statusButtonText: {
    color: COLORS.text,
  },
  activeStatusButtonText: {
    color: COLORS.background,
  },
  totalSection: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default OrderDetailScreen;
