// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tableReducer from '../slice/tableslice';
import menuReducer from '../slice/menuslice';
import noodleReducer from '../slice/noodleslice';
import cartReducer from '../slice/cartslice';
import menuItemsReducer from '../slice/menuItemsSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['table', 'cart','orderId'] 
};

const appReducer = combineReducers({
  table: tableReducer,
  menu: menuReducer,
  menuItems: menuItemsReducer,
  noodle: noodleReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export const persistor = persistStore(store);

