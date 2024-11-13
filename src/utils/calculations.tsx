import { OrderItem, Order } from '../types';

export const calculateSubtotal = (quantity: number, price: number): number => {
  return quantity * price;
};

export const calculateOrderTotal = (items: OrderItem[]): number => {
  return items.reduce((total, item) => total + item.subtotal, 0);
};

export const calculateDailySales = (orders: Order[], date: Date): number => {
  const targetDate = new Date(date).setHours(0, 0, 0, 0);
  return orders
    .filter(order => {
      const orderDate = new Date(order.timestamp).setHours(0, 0, 0, 0);
      return orderDate === targetDate && order.paymentStatus === 'paid';
    })
    .reduce((total, order) => total + order.totalAmount, 0);
};

export const calculateWeeklySales = (orders: Order[], date: Date): number => {
  const targetDate = new Date(date);
  const weekStart = new Date(targetDate.setDate(targetDate.getDate() - targetDate.getDay()));
  const weekEnd = new Date(targetDate.setDate(targetDate.getDate() + 6));

  return orders
    .filter(order => {
      const orderDate = new Date(order.timestamp);
      return orderDate >= weekStart &&
             orderDate <= weekEnd &&
             order.paymentStatus === 'paid';
    })
    .reduce((total, order) => total + order.totalAmount, 0);
};

export const calculateMonthlySales = (orders: Order[], date: Date): number => {
  const targetDate = new Date(date);

  return orders
    .filter(order => {
      const orderDate = new Date(order.timestamp);
      return orderDate.getMonth() === targetDate.getMonth() &&
             orderDate.getFullYear() === targetDate.getFullYear() &&
             order.paymentStatus === 'paid';
    })
    .reduce((total, order) => total + order.totalAmount, 0);
};
