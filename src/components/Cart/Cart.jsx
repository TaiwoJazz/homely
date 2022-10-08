import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';

const Cart = props => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `₦${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const CartItemRemoveHandler = (item) => {
    cartCtx.removeItem(item);
  };

  const CartItemAddHandler = (item,) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handleMutipleClick = () => {
    props.onOrder();
    cartCtx.clearItems();
  };

  const cartItems = (
    <ul className='m-0 p-4 max-h-[25rem] overflow-auto'>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          title={item.title}
          amount={item.amount}
          price={item.price}
          image={item.image}
          onRemove={CartItemRemoveHandler.bind(null, item)}
          onAdd={CartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className='flex justify-between font-bold text-2xl my-6 px-4 '>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className='flex justify-center sm:justify-end'>
        <button
          onClick={props.onCloseCart}
          className='py-1 px-6 mr-6 w-auto font-semibold inline-block border-2 border-brandColor rounded-xl text-brandColor cursor-pointer hover:bg-brandColor hover:text-white transition-all duration-300 ease-in-out'
        >
          Close
        </button>
        {hasItems && (
          <button
            onClick={handleMutipleClick}
            className='py-1.5 px-6 w-auto font-semibold inline-block bg-brandColor rounded-xl text-white cursor-pointer hover:opacity-80'
          >
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
