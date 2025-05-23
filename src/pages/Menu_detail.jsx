import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCartItems } from '../slice/cartslice';
import '../menu_detail.css';

const MenuDetail = () => {
  const [table ,setTable ] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedMenu = useSelector(state => state.menu.selectedItem);
  const [orderId, setOrderId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const selectedTable = useSelector(state => state.table.selectedTable);

    useEffect(() => {
    fetchOrder();
    if (!selectedMenu) {
      navigate(`/${selectedTable}/menu_order`);
      fetchTable();
    }
  }, [selectedMenu, navigate]);

  const fetchOrder = async() =>{
    try {
      const response = await fetch(`https://lanchangbackend-production.up.railway.app/order/${selectedTable}`)
      const data = await response.json()
      setOrderId(data.Order_id)
    } catch (err) {
      console.log('error geting order')
    }
  }

  const fetchTable = async () => {
    try {
      const response = await fetch(`https://lanchangbackend-production.up.railway.app/table/${selectedTable}`)
      const data = await response.json();
      setTable(data)
    } catch (err) {
      console.log('error get table')
    }
  }

  console.log(table)

  if (table.status_id === 2) {
    return (
      <h2 style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: "red"
      }}>
        {`โต๊ะ ${selectedTable} ไม่พร้อมให้บริการ`}
      </h2>
    );
  } else if (table.status_id === 0) {
    return (
      <h2 style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: "orange"
      }}>
        โต๊ะ {selectedTable} พนักงานกำลังเก็บโต๊ะ กรุณารอสักครู่
      </h2>
    );
  }

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(prevQuantity + amount, 1));
  };

  const handleHomeDeliveryChange = () => {
    setHomeDelivery(prev => !prev);
  };

  const handleAddToCart = async () => {
    if (selectedMenu) {
      try {
        const response = await fetch('https://lanchangbackend-production.up.railway.app/addmenutocart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: selectedMenu.Menu_id,
            price: selectedMenu.Menu_price,
            quantity,
            homeDelivery,
            additionalInfo,
            orderId
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add item to cart`);
        }
        const data = await response.json();
        console.log(data)
        dispatch(setCartItems(data.quantity));
        console.log('Added to cart:', data);
        navigate(`/${selectedTable}/menu_order`);

      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };


  return (
    <div>
      <header className="header"></header>

      <div className="picture">
        <div id="menu-detail-container">
          {selectedMenu ? (
            <div>
              <img
                className="picture-detail"
                src={`https://lanchangbackend-production.up.railway.app/menuimage/${selectedMenu.Menu_id}`}
                alt={selectedMenu.Menu_name}
              />
              <h2 className="title">{selectedMenu.Menu_name}</h2>
              <p className="price">{selectedMenu.Menu_price} บาท</p>
            </div>
          ) : (
            <p>ไม่มีเมนูที่เลือก</p>
          )}
        </div>
      </div>

      <div className="takehome">
        <input
          type="checkbox"
          id="homeDelivery"
          className="checker"
          checked={homeDelivery}
          onChange={handleHomeDeliveryChange}
        />
        <label htmlFor="homeDelivery" className="takehome">สั่งกลับบ้าน</label>
      </div>

      <div className="additional">
        <textarea
          rows="7"
          cols="55"
          placeholder="รายละเอียดเพิ่มเติม เช่น ขอซอสเยอะๆ น้ำจิ้มเยอะๆ"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        ></textarea>
      </div>

      <div className='addspace'></div>

      <footer>
        <div className="left">
          <div className="counter">
            <button
              id="decrease"
              className="decrement"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>

            <span id="quantity" className="value">{quantity}</span>

            <button
              id="increase"
              className="increment"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          <button
            id="additem"
            className="btn btn-outline-success"
            onClick={handleAddToCart}
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MenuDetail;
