// src/components/menu/CategoryTabs.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CATEGORIES, COLORS } from '../../constants';

type CategoryTabsProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export const CategoryTabs = ({ selectedCategory, onSelectCategory }: CategoryTabsProps) => {
  return (
    <View style={styles.container}>
      {CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.tab,
            selectedCategory === category && styles.selectedTab
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text style={[
            styles.tabText,
            selectedCategory === category && styles.selectedTabText
          ]}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.background,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 15,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  selectedTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  selectedTabText: {
    color: COLORS.background,
  },
});
