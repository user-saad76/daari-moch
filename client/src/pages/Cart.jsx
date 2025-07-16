import React, { useContext } from 'react';
import { CartContext } from '../App';

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const handleClearCart = () => {
    setCart([]);
  };

  const handleDelete = (id) => {
    const updatedCart = cart.filter(c => c.id !== id);
    setCart(updatedCart);
  };

  const handleQtyIncrease = (cartitem) => {
    const updatedCart = cart.map(item =>
      item.id === cartitem.id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleQtyDecrease = (cartitem) => {
    const updatedCart = cart.map(item => {
      if (item.id === cartitem.id && item.qty > 1) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleChange = () => {
    // optional if you want manual input updates
  };

  return (
    <div className='container'>
      <table className="table">
        <thead>
          <tr>
            <th>Img</th>
            <th>Title</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(cartitem => (
            <tr key={cartitem.id}>
              <td>
                <img src={cartitem.image} alt={cartitem.title} style={{ width: '100px' }} />
              </td>
              <td>{cartitem.title}</td>
              <td>{cartitem.price}</td>
              <td>
                <div className='d-flex'>
                  <button className='btn btn-dark' onClick={() => handleQtyDecrease(cartitem)}>-</button>
                  <input
                    type="text"
                    className='form-control text-center'
                    value={cartitem.qty}
                    onChange={handleChange}
                    style={{ width: '60px' }}
                    readOnly
                  />
                  <button className='btn btn-dark' onClick={() => handleQtyIncrease(cartitem)}>+</button>
                </div>
              </td>
              <td>{(cartitem.price * cartitem.qty).toFixed(2)}</td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDelete(cartitem.id)}>
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cart.length > 0 && (
  <div className="text-end">
    <h4>Grand Total: Rs. {cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</h4>
  </div>
    )}
      <button className='btn btn-danger' onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
}

export default Cart;



let marks = [20,23,42,49,33,202,467,120,180]
let total = 0;

for(let i= 0; i<marks.length; i++){
   total = total+marks[i]
  console.log(marks[i]);
}

console.log(total);