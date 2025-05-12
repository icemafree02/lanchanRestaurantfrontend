import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../cart.css';
import noodle from '../image/noodle.png';

const Cart = () => {
  const [orderId, setOrderId] = useState(null);
  const [cartItems, setCartItem] = useState([]);
  const [totalitems, setTotalitems] = useState(0);
  const selectedTable = useSelector(state => state.table.selectedTable);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3333/order/${selectedTable}`)
      const data = await response.json()
      setOrderId(data.Order_id)
    } catch (err) {
      console.log('error geting order')
    }
  }

  useEffect(() => {
    fetchOrder();
  })
  useEffect(() => {
    if (orderId) {
      getCartItems();
      getTotalCartItems();
    }
  }, [orderId]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0);
  };

  const getCartItems = async () => {
    try {
      const response = await fetch(`http://localhost:3333/cart/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const data = await response.json();
      setCartItem(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const getTotalCartItems = () => {
    fetch(`http://localhost:3333/gettotalcartitems/${orderId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Total cart items:', data.total_items);
        setTotalitems(data.total_items);
      })
      .catch(error => {
        console.error('Error fetching total cart items:', error);
        return 0;
      });
  };

  const getImageSource = (item) => {
    if (!item.Menu_id) {
      return noodle;
    }
    return `http://localhost:3333/menuimage/${item.Menu_id}`;
  };

  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:3333/cart/increase/${item.Cart_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: item.Quantity + 1 }),
      });

      if (!response.ok) {
        throw new Error('Failed to increase quantity');
      }
      getCartItems();
      getTotalCartItems();
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecrease = async (item) => {
    if (item.Quantity > 1) {
      try {
        const response = await fetch(`http://localhost:3333/cart/decrease/${item.Cart_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: item.Quantity - 1 }),
        });

        if (!response.ok) {
          throw new Error('Failed to decrease quantity');
        }
        getCartItems();
        getTotalCartItems();
      } catch (error) {
        console.error('Error decreasing quantity:', error);
      }
    }
  };


  const handleRemove = async (item) => {
    try {
      const response = await fetch(`http://localhost:3333/cart/delete/${item.Cart_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }
      getCartItems();
      getTotalCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const OrderMenu = async () => {
    try {
      const url = `http://localhost:3333/orders/${orderId}/add_items`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cartItems.map(item => ({
            menuId: item.Menu_id || null,
            type: item.Menu_id ? 'menu' : 'noodle',
            quantity: item.Quantity,
            price: item.Price,
            homeDelivery: item.HomeDelivery || 0,
            additionalInfo: item.Additional || null,
            noodleDetails: item.Menu_id ? null : {
              Soup_id: item.Soup_id || null,
              Size_id: item.Size_id || null,
              Meat_id: item.Meat_id || null,
              Noodle_type_id: item.Noodle_type_id || null,
            },
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate(`/${selectedTable}/menu_order/cart/menu_ordered`);
      DeleteOrderItem();
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    }
  };

  const DeleteOrderItem = async () => {
    try {
      const response = await fetch(`http://localhost:3333/cart/order/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  }

  return (
    <div>
      <header>
        <div className='titlecart'>ตระกร้าของคุณ</div>
      </header>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p>ไม่มีรายการอาหาร</p>
        ) : (
          <div>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.Cart_id} className="cart-item">
                  <img
                    alt={item.name || 'Item image'}
                    className="cart-item-image"
                    src={getImageSource(item)}
                  />
                  <div className="cart-item-details">
                    <div className='cart-name'>{item.Menu_name || `${item.Noodle_type_name} ${item.Soup_name} ${item.Meat_name} ${item.Size_name}`}</div> {/* Fallback for name */}
                    <p>ราคา {item.Price} บาท</p>
                    <p className={item.HomeDelivery ? 'take-home' : 'eat-in'}>
                      {item.HomeDelivery ? 'สั่งกลับบ้าน' : 'ทานที่ร้าน'}
                    </p>
                    {item.Additional && <p className='additionalnote'>เพิ่มเติม : {item.Additional}</p>}
                    <div className="cart-item-controls">
                      <button className="quantity-btn" onClick={() => handleDecrease(item)}>-</button>
                      <span className="quantity">{item.Quantity}</span>
                      <button className="quantity-btn" onClick={() => handleIncrease(item)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemove(item)}>ลบ</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h4>{totalitems} รายการ</h4>
              <h3 className='quantities'>ราคารวม {getTotalPrice()} บาท</h3>
            </div>
            <button className="order-btn" onClick={OrderMenu}>สั่งอาหาร</button>
          </div>
        )}
      </div>
      <div className='center'>
        <button className="view-ordered-btn" onClick={() => navigate(`/${selectedTable}/menu_order/cart/menu_ordered`)}>ดูรายการที่สั่ง</button>
      </div>
    </div>
  );
};

export default Cart;
