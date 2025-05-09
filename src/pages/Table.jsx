import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedTable } from '../slice/tableslice';
import { setOrderId } from '../slice/cartslice';
import { useTableSelection } from '../Functions/tableselection';
import '../table.css';
import lanchan from '../image/lanchan.png';

function TableSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tables, loading, error } = useTableSelection();

  const reserveTable = async (tableNumber) => {
    try {
      dispatch(setSelectedTable(tableNumber));
      navigate('/menu_order');
    } catch (error) {
      console.error('Error reserving table or creating order:', error);
      alert('Failed to reserve table or create order. Please try again.');
    }
  };

  const handleTableSelection = (tableNumber) => {
    reserveTable(tableNumber);
  };

  if (loading) return <div>กำลังโหลด</div>;
  if (error) return <div>เกิดข้อผิดพลาด : {error}</div>;

  return (
    <div>
      <div className="header">
        <div className="picturelogo">
          <img src={lanchan} alt="ร้านก๋วยเตี๋ยวเรือล้านช้าง" />
        </div>
        <div className="title0">ยินดีต้อนรับ</div>
        <div className="title1">ร้านก๋วยเตี๋ยวเรือล้านช้าง</div>
      </div>
      <div className="title2">กรุณาเลือกโต๊ะที่ท่านนั่ง</div>
      <div className="row">
        <div id="table-container">
          {tables.map((table) => {
            const { tables_number, status_id } = table;
            const isReserved = status_id === 2;
            const isAvailable = status_id === 1;
            return (
              <button
                key={tables_number}
                className={`box ${isReserved ? 'ไม่ว่าง' : ''}`}
                onClick={() => isAvailable && handleTableSelection(tables_number)}
                disabled={isReserved}
                aria-label={isReserved ? `Table ${tables_number} is ไม่ว่าง` : `Select Table ${tables_number}`}
              >
                <div>{tables_number}</div>
                {isReserved && <div className="reserved-text">-ไม่ว่าง</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TableSelection;
