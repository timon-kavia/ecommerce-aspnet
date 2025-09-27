import React from 'react';
import type { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onClearCart,
  onCheckout,
  onClose,
}) => {
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  if (items.length === 0) {
    return (
      <div className="cart">
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="cart-content">
          <p>Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="cart-content">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.product.id} className="cart-item">
              <img 
                src={item.product.imageUrl} 
                alt={item.product.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h4>{item.product.name}</h4>
                <p>${item.product.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                  >
                    +
                  </button>
                </div>
                <p className="item-total">
                  Total: ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                className="remove-btn"
                onClick={() => onUpdateQuantity(item.product.id, 0)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="cart-total">
            <h4>Total: ${getTotalPrice().toFixed(2)}</h4>
          </div>
          
          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={onClearCart}>
              Clear Cart
            </button>
            <button className="checkout-btn" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;