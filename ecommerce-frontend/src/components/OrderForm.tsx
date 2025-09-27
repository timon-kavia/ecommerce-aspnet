import React, { useState } from 'react';
import type { CartItem, Order } from '../types';
import { createOrder } from '../services/api';

interface OrderFormProps {
  cartItems: CartItem[];
  onOrderComplete: () => void;
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({
  cartItems,
  onOrderComplete,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData: Order = {
        customerEmail: email.trim(),
        items: cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      await createOrder(orderData);
      alert('Order placed successfully!');
      onOrderComplete();
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="order-form-overlay">
      <div className="order-form">
        <div className="order-form-header">
          <h3>Complete Your Order</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="order-summary">
          <h4>Order Summary</h4>
          {cartItems.map(item => (
            <div key={item.product.id} className="order-item">
              <span>{item.product.name}</span>
              <span>{item.quantity}x ${item.product.price.toFixed(2)}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">
            <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;