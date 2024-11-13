import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  addToOrder,
  updateOrderStatus,
  completeOrder,
  clearOrder
} from '../store/orderSlice';
import { MenuItem, Order } from '../types';

export const useOrder = () => {
  const dispatch = useDispatch();
  const currentOrder = useSelector((state: RootState) => state.orders.currentOrder);
  const orderHistory = useSelector((state: RootState) => state.orders.orderHistory);

  return {
    currentOrder,
    orderHistory,
    addToOrder: (item: MenuItem) => dispatch(addToOrder(item)),
    updateOrderStatus: (orderId: string, status: Order['paymentStatus']) =>
      dispatch(updateOrderStatus({ orderId, status })),
    completeOrder: () => dispatch(completeOrder()),
    clearOrder: () => dispatch(clearOrder()),
    getOrderById: (orderId: string) =>
      orderHistory.find(order => order.id === orderId),
  };
};
