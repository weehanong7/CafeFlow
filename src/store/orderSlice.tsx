import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, MenuItem } from '../../types';
import { StorageService } from '../services/storage';

interface OrderState {
  currentOrder: Order | null;
  orderHistory: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  orderHistory: [],
  loading: false,
  error: null,
};

export const loadOrderHistory = createAsyncThunk(
  'orders/loadOrderHistory',
  async () => {
    return await StorageService.loadOrderHistory();
  }
);

export const saveOrderHistory = createAsyncThunk(
  'orders/saveOrderHistory',
  async (orders: Order[]) => {
    await StorageService.saveOrderHistory(orders);
    return orders;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addToOrder: (state, action: PayloadAction<MenuItem>) => {
      if (!state.currentOrder) {
        state.currentOrder = {
          id: Date.now().toString(),
          items: [],
          totalAmount: 0,
          paymentStatus: 'pending',
          timestamp: new Date(),
        };
      }

      const existingItem = state.currentOrder.items.find(
        item => item.menuItem.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subtotal = existingItem.quantity * existingItem.menuItem.price;
      } else {
        state.currentOrder.items.push({
          id: Date.now().toString(),
          menuItem: action.payload,
          quantity: 1,
          subtotal: action.payload.price,
        });
      }

      state.currentOrder.totalAmount = state.currentOrder.items.reduce(
        (total, item) => total + item.subtotal,
        0
      );
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['paymentStatus'] }>) => {
      const order = state.orderHistory.find(o => o.id === action.payload.orderId);
      if (order) {
        order.paymentStatus = action.payload.status;
        StorageService.saveOrderHistory(state.orderHistory);
      }
    },
    completeOrder: (state) => {
      if (state.currentOrder) {
        state.orderHistory.push(state.currentOrder);
        StorageService.saveOrderHistory(state.orderHistory);
        state.currentOrder = null;
      }
    },
    clearOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOrderHistory.fulfilled, (state, action) => {
        state.orderHistory = action.payload;
        state.loading = false;
      })
      .addCase(loadOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load order history';
      });
  },
});

export const { addToOrder, updateOrderStatus, completeOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
