import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

type FilterOption = 'daily' | 'weekly' | 'monthly';

type SalesFilterProps = {
  selectedFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
};

export const SalesFilter = ({ selectedFilter, onFilterChange }: SalesFilterProps) => {
  return (
    <View style={styles.container}>
      {(['daily', 'weekly', 'monthly'] as FilterOption[]).map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            selectedFilter === filter && styles.selectedFilter
          ]}
          onPress={() => onFilterChange(filter)}
        >
          <Text style={[
            styles.filterText,
            selectedFilter === filter && styles.selectedFilterText
          ]}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: COLORS.background,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  selectedFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.text,
    fontSize: 16,
  },
  selectedFilterText: {
    color: COLORS.background,
  },
});
