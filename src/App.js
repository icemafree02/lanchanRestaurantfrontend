import React from 'react';
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';
import MenuOrder from './pages/Menu_order';
import Noodle_detail from './pages/Noodle_detail';
import Menu_detail from './pages/Menu_detail';
import Cart from './pages/Cart';
import Menu_ordered from './pages/Menu_ordered';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:tablenumber/menu_order" element={<MenuOrder />} />
        <Route path="/:tablenumber/menu_order/noodle_detail" element={<Noodle_detail />} />
        <Route path="/:tablenumber/menu_order/menu_detail" element={<Menu_detail />} />
        <Route path="/:tablenumber/menu_order/cart" element={<Cart />} />
        <Route path="/:tablenumber/menu_order/cart/menu_ordered" element={<Menu_ordered />} />
      </Routes>
    </Router>
  );
}

export default App;
