export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: 'food' | 'beverage' | 'dessert';
  description?: string;
};

export type OrderItem = {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  subtotal: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  timestamp: Date;
};

export type RootStackParamList = {
  MainTabs: undefined;
  AddMenuItem: undefined;
  OrderDetail: { orderId: string };
};

export type RootTabParamList = {
  Dashboard: undefined;
  OrderHistory: undefined;
  SalesIncome: undefined;
};
