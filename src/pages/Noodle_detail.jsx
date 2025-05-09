import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../menu_detail.css';
import noodle from '../image/noodle.png';
import {setCartItems } from '../slice/cartslice';

const NoodleDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedNoodle = useSelector(state => state.noodle.selectedItem);
  const [orderId , setOrderId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const selectedTable = useSelector(state => state.table.selectedTable);

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(prevQuantity + amount, 1));
  };

  const handleHomeDeliveryChange = () => {
    setHomeDelivery(prev => !prev);
  };

  const handleAddToCart = async () => {
    if (selectedNoodle) {
      try {
        const response = await fetch('https://lanchangbackend-production.up.railway.app/addnoodletocart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            noodle_type_id: selectedNoodle.Noodle_type_id,
            soup_id: selectedNoodle.Soup_id,
            meat_id: selectedNoodle.Meat_id,
            size_id: selectedNoodle.Size_id,
            price: selectedNoodle.Total_price,
            quantity,
            homeDelivery,
            additionalInfo,
            orderId
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        const data = await response.json();
        console.log('Added to cart:', data);
        dispatch(setCartItems(data.quantity));
        navigate('/menu_order');
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const fetchOrder = async() =>{
    try {
      const response = await fetch(`https://lanchangbackend-production.up.railway.app/order/${selectedTable}`)
      const data = await response.json()
      setOrderId(data.Order_id)
    } catch (err) {
      console.log('error geting order')
    }
  }

  useEffect(() => {
    fetchOrder();
    if (!selectedNoodle) {
      navigate('/menu_order');
    }
  }, [selectedNoodle, navigate]);

  
  return (
    <div>
      <header className="header"></header>
      <div className="picture">
        <div id="noodle-detail-container">
          {selectedNoodle ? (
            <div>
              <img
                className="picture-detail"
                src={noodle}
                alt={selectedNoodle.formattedName}
              />
              <h2 className="title">{selectedNoodle.formattedName}</h2>
              <p className="price">{selectedNoodle.Total_price} บาท</p>
            </div>
          ) : (
            <p>No noodle selected. Please go back and choose a noodle.</p>
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
          placeholder="รายละเอียดเพิ่มเติม เช่น ไม่ใส่ผัก เผ็ดมาก"
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

export default NoodleDetail;
