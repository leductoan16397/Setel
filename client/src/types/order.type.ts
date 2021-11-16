export interface Cart {
  products: ProductOrder[];
}

export interface ProductOrder extends Product {
  count: number;
}

export interface Product {
  id?: string;
  name: string;
  image: string;
  price: number;
}

export interface IOrder {
  address: string;
  totalPrice: number;
  status: 'created' | 'canceled' | 'confirmed' | 'delivered';
  products: ProductOrder[];
  createdAt: Date;
  author: string;
  id: string;
}
