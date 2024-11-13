import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { loadMenuItems } from '../store/menuSlice';
import { loadOrderHistory } from '../store/orderSlice';
import { COLORS } from '../constants';

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          dispatch(loadMenuItems()).unwrap(),
          dispatch(loadOrderHistory()).unwrap(),
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return <>{children}</>;
};
