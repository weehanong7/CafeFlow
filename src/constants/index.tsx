export const CATEGORIES = ['food', 'beverage', 'dessert'] as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  CANCELLED: 'cancelled',
} as const;

export const TIME_FILTERS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const;

export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  text: '#000000',
  textSecondary: '#8E8E93',
  background: '#FFFFFF',
  border: '#C6C6C8',
};
