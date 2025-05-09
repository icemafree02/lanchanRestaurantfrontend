import { createSlice } from '@reduxjs/toolkit';
const initialOrderId = sessionStorage.getItem('orderId') ? Number(sessionStorage.getItem('orderId')) : null;

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    orderedItems: [],
    orderId: initialOrderId,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      let existingItem;
      if (newItem.type === 'noodle') {
        existingItem = state.items.find(item =>
          item.id.Noodle_type_id === newItem.id.Noodle_type_id &&
          item.id.Soup_id === newItem.id.Soup_id &&
          item.id.Meat_id === newItem.id.Meat_id &&
          item.id.Size_id === newItem.id.Size_id &&
          item.type === newItem.type &&
          item.homeDelivery === newItem.homeDelivery &&
          item.additionalInfo === newItem.additionalInfo &&
          JSON.stringify(item.Noodle_name) === JSON.stringify(newItem.Noodle_name)
        );
      } else if (newItem.type === 'menu') {
        existingItem = state.items.find(item =>
          item.id === newItem.id &&
          item.type === newItem.type &&
          item.homeDelivery === newItem.homeDelivery &&
          item.additionalInfo === newItem.additionalInfo
        );
      }
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    setCartItems: (state, action) => {
      // If action.payload is an array of items with quantities
      if (Array.isArray(action.payload)) {
        state.items = action.payload.reduce((total, item) => {
          return total + (item || 0);
        }, 0);
      } 
      // If action.payload is already a number
      else if (typeof action.payload === 'number') {
        state.items = action.payload;
      }
      // Default to 0 if payload is invalid
      else {
        state.items = 0;
      }
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
      sessionStorage.setItem('orderId', action.payload.toString());
    },
    clearCart: (state) => {
      state.orderedItems = [...state.items];
      state.items = [];
    },
  },
});

export const { addItemToCart, increaseQuantity, decreaseQuantity, removeItemFromCart, clearCart, setOrderId, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
