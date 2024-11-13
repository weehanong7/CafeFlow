import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../store/menuSlice';
import { MenuItem } from '../types';

export const useMenu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state: RootState) => state.menu.items);

  return {
    menuItems,
    getMenuItemsByCategory: (category: MenuItem['category']) =>
      menuItems.filter(item => item.category === category),
    addMenuItem: (item: Omit<MenuItem, 'id'>) => {
      const newItem = {
        ...item,
        id: Date.now().toString(),
      };
      dispatch(addMenuItem(newItem));
    },
    updateMenuItem: (item: MenuItem) => dispatch(updateMenuItem(item)),
    deleteMenuItem: (id: string) => dispatch(deleteMenuItem(id)),
  };
};
