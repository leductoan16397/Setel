/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createContext, useContext, useEffect, useState } from 'react';
import { getCart, storageCart, Toast } from 'utils';
import { createOrder, cancleOrder } from 'api';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { userInfo, fetching, getAccessToken } = useContext(AuthContext);
  const [isCreatintOrder, setCreatingOder] = useState(false);
  const [isCanclingOrder, setCanclingOder] = useState(false);
  const history = useHistory();

  const updateCartStorage = (cartData) => {
    storageCart(userInfo.userId, cartData);
  };

  const fetchData = () => {
    const data = getCart(userInfo.userId);
    if (!data) {
      return;
    }
    setCart(data);
  };

  useEffect(() => {
    if (userInfo) {
      fetchData();
    }
  }, [fetching]);

  const removeAllProduct = () => {
    setCart([]);
    updateCartStorage(null);
  };

  const addProductToCart = async ({ id, name, image, price }) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === id);
    if (index >= 0) {
      newCart[index].count += 1;
    } else {
      newCart.push({ id, name, image, price, count: 1 });
    }
    setCart(newCart);
    updateCartStorage(newCart);
    Toast('Success!!', 'Product added to cart successfully', 'success');
  };

  const removeProductFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    updateCartStorage(newCart);
  };

  const increaseCount = (id) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === id);
    newCart[index].count += 1;
    setCart(newCart);
    updateCartStorage(newCart);
  };

  const descreaseCount = (id) => {
    let newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === id);
    if (newCart[index].count <= 1) {
      newCart = newCart.filter((item) => item.id !== id);
    } else {
      newCart[index].count -= 1;
    }
    setCart(newCart);
    updateCartStorage(newCart);
  };

  const doCreateOrder = async (address) => {
    try {
      setCreatingOder(true);
      const accesstoken = await getAccessToken();
      await createOrder(accesstoken, { address, products: cart });
      Toast('Success!!', 'Create order successfully!', 'success');
      removeAllProduct();
      setCreatingOder(false);
      history.push('/order');
    } catch (error) {
      setCreatingOder(false);
      Toast('Error!!', error.message, 'danger');
    }
  };

  const doCancleOrder = async (id) => {
    try {
      setCanclingOder(true);
      const accesstoken = await getAccessToken();
      await cancleOrder(accesstoken, id);
      Toast('Success!!', 'Cancle order successfully!', 'success');
      setCanclingOder(false);
    } catch (error) {
      setCanclingOder(false);
      Toast('Error!!', error.message, 'danger');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCreatintOrder,
        isCanclingOrder,
        addProductToCart,
        removeProductFromCart,
        increaseCount,
        descreaseCount,
        removeAllProduct,
        doCreateOrder,
        doCancleOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
