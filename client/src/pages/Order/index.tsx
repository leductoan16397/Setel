/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography, CircularProgress } from '@mui/material';
import { OrderCard } from 'components';
import { AppLayout } from 'layout/AppLayout';
import React, { FC, useEffect, useState, useContext } from 'react';
import { IOrder } from 'types';
import './index.scss';
import { AuthContext } from 'contexts/AuthContext';
import { getAllOrder } from 'api';
import { Toast } from 'utils';
import { CartContext } from 'contexts/CartContext';

export const Order: FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoadedOrder, setIsLoadedOrder] = useState(false);

  const { getAccessToken } = useContext(AuthContext);
  const { isCanclingOrder } = useContext(CartContext);

  const fetchOrder = async (): Promise<void> => {
    try {
      setIsLoadedOrder(false);
      const token = await getAccessToken();
      const data = await getAllOrder(token);
      setOrders(data);
      setIsLoadedOrder(true);
    } catch (error: any) {
      Toast('Error!!', error.message, 'danger');
    }
  };

  // useEffect(() => {
  //   fetchOrder();
  // }, []);

  useEffect(() => {
    if (!isCanclingOrder) {
      fetchOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCanclingOrder]);

  return (
    <AppLayout>
      <div className="order-list">
        <Stack
          spacing={2}
          sx={{
            height: '100%',
          }}
        >
          <Typography variant="h3" component="div">
            Orders
          </Typography>
          {isLoadedOrder ? (
            orders.map((item, index) => (
              <OrderCard
                address={item.address}
                author={item.author}
                createdAt={item.createdAt}
                id={item.id}
                products={item.products}
                status={item.status}
                totalPrice={item.totalPrice}
                key={`order_${index + 1}`}
              />
            ))
          ) : (
            <CircularProgress size={20} style={{ marginRight: 20 }} />
          )}
        </Stack>
      </div>
    </AppLayout>
  );
};
