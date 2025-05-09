import { createSlice } from '@reduxjs/toolkit';

const noodleSlice = createSlice({
  name: 'noodle',
  initialState: {
    items: [],
    selectedItem: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setSelectedNoodle: (state, action) => {
      state.selectedItem = action.payload;
    }
  }
});

export default noodleSlice.reducer;
export const { setSelectedNoodle } = noodleSlice.actions;