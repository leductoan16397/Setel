import { Auth, ProductOrder } from 'types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAuth = (): Auth | null => {
  const data = localStorage.getItem(
    process.env.REACT_APP_AUTH_STORAGE_NAME || 'Setel_auth_storage'
  );
  if (data) {
    const auth: Auth = JSON.parse(data);
    return auth;
  }
  return null;
};

export const storageAuth = (auth: Auth | null | undefined): void => {
  if (!auth) {
    localStorage.removeItem(process.env.REACT_APP_AUTH_STORAGE_NAME || 'Setel_auth_storage');
  }
  localStorage.setItem(
    process.env.REACT_APP_AUTH_STORAGE_NAME || 'Setel_auth_storage',
    JSON.stringify(auth)
  );
};
export const getCart = (userId: string): ProductOrder[] | null => {
  const data = localStorage.getItem(
    `${process.env.REACT_APP_ORDER_STORAGE_NAME}_${userId}` || `Setel_cart_storage_${userId}`
  );
  if (data) {
    const cart: any = JSON.parse(data);
    return cart;
  }
  return null;
};

export const storageCart = (userId: string, cart: ProductOrder[] | null | undefined): void => {
  if (!cart) {
    localStorage.removeItem(
      `${process.env.REACT_APP_ORDER_STORAGE_NAME}_${userId}` || `Setel_cart_storage_${userId}`
    );
  }
  localStorage.setItem(
    `${process.env.REACT_APP_ORDER_STORAGE_NAME}_${userId}` || `Setel_cart_storage_${userId}`,
    JSON.stringify(cart)
  );
};
