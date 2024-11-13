import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '../../types';
import { StorageService } from '../services/storage';

interface MenuState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
};

export const loadMenuItems = createAsyncThunk(
  'menu/loadMenuItems',
  async () => {
    return await StorageService.loadMenuItems();
  }
);

export const saveMenuItems = createAsyncThunk(
  'menu/saveMenuItems',
  async (items: MenuItem[]) => {
    await StorageService.saveMenuItems(items);
    return items;
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
      StorageService.saveMenuItems(state.items);
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        StorageService.saveMenuItems(state.items);
      }
    },
    deleteMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      StorageService.saveMenuItems(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMenuItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load menu items';
      });
  },
});

export const { addMenuItem, updateMenuItem, deleteMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
