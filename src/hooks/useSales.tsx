import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  calculateDailySales,
  calculateWeeklySales,
  calculateMonthlySales
} from '../utils/calculations';

export const useSales = () => {
  const orderHistory = useSelector((state: RootState) => state.orders.orderHistory);

  return {
    getDailySales: (date: Date = new Date()) => calculateDailySales(orderHistory, date),
    getWeeklySales: (date: Date = new Date()) => calculateWeeklySales(orderHistory, date),
    getMonthlySales: (date: Date = new Date()) => calculateMonthlySales(orderHistory, date),
    getOrderCount: (period: 'daily' | 'weekly' | 'monthly', date: Date = new Date()) => {
      const start = new Date(date);
      const end = new Date(date);

      switch (period) {
        case 'daily':
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);
          break;
        case 'weekly':
          start.setDate(date.getDate() - date.getDay());
          end.setDate(start.getDate() + 6);
          break;
        case 'monthly':
          start.setDate(1);
          end.setMonth(start.getMonth() + 1, 0);
          break;
      }

      return orderHistory.filter(order => {
        const orderDate = new Date(order.timestamp);
        return orderDate >= start && orderDate <= end;
      }).length;
    },
  };
};
