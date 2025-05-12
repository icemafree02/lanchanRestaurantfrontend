import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMenuData = createAsyncThunk(
  'menu/fetchMenuData',
  async () => {
    const response = await fetch('http://localhost:3333/menu');
    if (!response.ok) throw new Error('Failed to fetch menu data');
    return response.json();
  }
);

export const fetchMenuItemDetail = createAsyncThunk(
  'menu/fetchMenuItemDetail',
  async (menuId) => {
    const response = await fetch(`http://localhost:3333/menu/${menuId}`);
    if (!response.ok) throw new Error('Failed to fetch menu item detail');
    return response.json();
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    selectedItem: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMenuItemDetail.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
      });
  },
});

export default menuSlice.reducer;