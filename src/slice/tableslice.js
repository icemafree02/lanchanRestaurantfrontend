import { createSlice } from '@reduxjs/toolkit';
const initialTableNumber = sessionStorage.getItem('tableNumber') ? Number(sessionStorage.getItem('tableNumber')) : null;

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    selectedTable: initialTableNumber,  // Initialize from sessionStorage
  },
  reducers: {
    setSelectedTable: (state, action) => {
      state.selectedTable = action.payload;  
      sessionStorage.setItem('tableNumber', action.payload.toString());  // ✅ Persist in sessionStorage
    },
  },
});


export const { setSelectedTable } = tableSlice.actions;
export default tableSlice.reducer;
