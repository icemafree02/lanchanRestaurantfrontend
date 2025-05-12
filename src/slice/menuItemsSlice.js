// src/slices/menuItemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  noodles: [],
  menu: [],
  status: 'idle',
  error: null,
};
export const fetchNoodles = createAsyncThunk('menuItems/fetchNoodles', async () => {
  const response = await fetch('http://localhost:3333/noodle');
  if (!response.ok) throw new Error('Failed to fetch noodles');
  return response.json();
});

export const fetchMenu = createAsyncThunk('menuItems/fetchMenu', async () => {
  const response = await fetch('http://localhost:3333/menu');
  if (!response.ok) throw new Error('Failed to fetch menu');
  return response.json();
});

const menuItemsSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNoodles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNoodles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.noodles = action.payload;
      })
      .addCase(fetchNoodles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menu = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default menuItemsSlice.reducer;

export const {} = menuItemsSlice.actions;


export const selectNoodles = (state) => state.menuItems.noodles;
export const selectMenu = (state) => state.menuItems.menu;
export const selectMenuStatus = (state) => state.menuItems.status;
export const selectMenuError = (state) => state.menuItems.error;
