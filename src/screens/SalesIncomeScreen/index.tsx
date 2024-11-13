// src/screens/SalesIncomeScreen.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SalesFilter } from '../../components/sales/SalesFilter';
import { SalesCard } from '../../components/sales/SalesCard';
import { SalesChart } from '../../components/sales/SalesChart';
import { useSales } from '../../hooks/useSales';
import { useOrder } from '../../hooks/useOrder';
import { COLORS } from '../../constants';

type FilterOption = 'daily' | 'weekly' | 'monthly';

const SalesIncomeScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('daily');
  const [refreshing, setRefreshing] = useState(false);
  const { orderHistory } = useOrder();
  const {
    getDailySales,
    getWeeklySales,
    getMonthlySales,
    getOrderCount
  } = useSales();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const salesData = useMemo(() => {
    const currentDate = new Date();
    let data;
    let labels;

    switch (selectedFilter) {
      case 'daily':
        // Last 24 hours in 3-hour intervals
        data = Array.from({ length: 8 }, (_, i) => {
          const date = new Date(currentDate);
          date.setHours(currentDate.getHours() - (7 - i) * 3);
          return getDailySales(date);
        });
        labels = Array.from({ length: 8 }, (_, i) => {
          const date = new Date(currentDate);
          date.setHours(currentDate.getHours() - (7 - i) * 3);
          return `${date.getHours()}:00`;
        });
        break;

      case 'weekly':
        // Last 7 days
        data = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(currentDate);
          date.setDate(currentDate.getDate() - (6 - i));
          return getDailySales(date);
        });
        labels = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(currentDate);
          date.setDate(currentDate.getDate() - (6 - i));
          return date.toLocaleDateString('en-US', { weekday: 'short' });
        });
        break;

      case 'monthly':
        // Last 30 days in weekly segments
        data = Array.from({ length: 4 }, (_, i) => {
          const date = new Date(currentDate);
          date.setDate(currentDate.getDate() - (3 - i) * 7);
          return getWeeklySales(date);
        });
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        break;

      default:
        data = [];
        labels = [];
    }

    return {
      labels,
      datasets: [{ data }],
    };
  }, [selectedFilter, orderHistory]);

  const getTotalSales = () => {
    switch (selectedFilter) {
      case 'daily':
        return getDailySales(new Date());
      case 'weekly':
        return getWeeklySales(new Date());
      case 'monthly':
        return getMonthlySales(new Date());
    }
  };

  const getAverageSales = () => {
    const total = getTotalSales();
    switch (selectedFilter) {
      case 'daily':
        return total / 24; // Average per hour
      case 'weekly':
        return total / 7; // Average per day
      case 'monthly':
        return total / 30; // Average per day
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SalesFilter
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <View style={styles.statsGrid}>
          <SalesCard
            title="Total Sales"
            amount={getTotalSales()}
            subtitle={`Total ${selectedFilter} sales`}
          />
          <SalesCard
            title="Average Sales"
            amount={getAverageSales()}
            subtitle={`Average per ${selectedFilter === 'daily' ? 'hour' : 'day'}`}
          />
          <SalesCard
            title="Avg Order Value"
            amount={getTotalSales() / (getOrderCount(selectedFilter) || 1)}
            subtitle="Per order"
          />
      </View>

      {/*<View style={styles.summaryContainer}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Performance Summary</Text>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.summaryItem}>
          <Ionicons name="trending-up" size={24} color={COLORS.success} />
          <View style={styles.summaryText}>
            <Text style={styles.summaryItemTitle}>Best Performing Day</Text>
            <Text style={styles.summaryItemValue}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </Text>
          </View>
        </View>

        <View style={styles.summaryItem}>
          <Ionicons name="time-outline" size={24} color={COLORS.primary} />
          <View style={styles.summaryText}>
            <Text style={styles.summaryItemTitle}>Peak Hours</Text>
            <Text style={styles.summaryItemValue}>2:00 PM - 4:00 PM</Text>
          </View>
        </View>
      </View>*/}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chartContainer: {
    backgroundColor: COLORS.background,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  statsGrid: {
    padding: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  summaryContainer: {
    backgroundColor: COLORS.background,
    margin: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  summaryText: {
    marginLeft: 15,
  },
  summaryItemTitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  summaryItemValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
});

export default SalesIncomeScreen;
