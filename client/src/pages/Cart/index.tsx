import { Grid, Stack, Typography } from '@mui/material';
import { ProductCart } from 'components/ProductCart';
import { CartContext } from 'contexts/CartContext';
import { AppLayout } from 'layout/AppLayout';
import React, { FC, useContext } from 'react';
import './index.scss';
import { ProductOrder } from 'types';
import { CartHeader, CartOrderInfo } from 'components';

export const Cart: FC = () => {
  const { cart } = useContext(CartContext);

  return (
    <AppLayout>
      <div className="cart-detail">
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid
            item
            xs={8}
            sx={{
              height: '100%',
              position: 'relative',
              overflow: 'auto',
            }}
          >
            <Stack spacing={2}>
              <Typography gutterBottom variant="h4" component="div">
                Cart
              </Typography>
              <CartHeader />
              {cart.map((item: ProductOrder, index: number) => (
                <ProductCart
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  count={item.count}
                  key={`product_cart_${index + 1}`}
                />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{ height: '100%' }}>
            <CartOrderInfo />
          </Grid>
        </Grid>
      </div>
    </AppLayout>
  );
};
