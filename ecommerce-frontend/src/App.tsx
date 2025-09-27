import { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import CategoryFilter from './components/CategoryFilter';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import type { Product, Category, CartItem } from './types';
import { getProducts, getCategories, getProductsByCategory } from './services/api';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    
    try {
      if (categoryId === null) {
        const productsData = await getProducts();
        setProducts(productsData);
      } else {
        const productsData = await getProductsByCategory(categoryId);
        setProducts(productsData);
      }
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Ecommerce Store</h1>
        <div className="header-actions">
          <button 
            className="cart-button"
            onClick={() => setShowCart(!showCart)}
          >
            Cart ({getTotalItems()})
          </button>
        </div>
      </header>

      <main className="main">
        <div className="sidebar">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategoryFilter}
          />
        </div>

        <div className="content">
          <ProductList products={products} onAddToCart={addToCart} />
        </div>

        {showCart && (
          <div className="cart-sidebar">
            <Cart
              items={cart}
              onUpdateQuantity={updateCartQuantity}
              onClearCart={clearCart}
              onCheckout={() => {
                setShowOrderForm(true);
                setShowCart(false);
              }}
              onClose={() => setShowCart(false)}
            />
          </div>
        )}
      </main>

      {showOrderForm && (
        <OrderForm
          cartItems={cart}
          onOrderComplete={() => {
            setShowOrderForm(false);
            clearCart();
          }}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </div>
  );
}

export default App;