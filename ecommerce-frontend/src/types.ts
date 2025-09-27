export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  stock: number;
  imageUrl: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id?: number;
  customerEmail: string;
  items: OrderItem[];
  orderDate?: string;
  totalAmount?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}