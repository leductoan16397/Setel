/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, CircularProgress, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { ProductOrder } from 'components/ProductOrder';
import { CartContext } from 'contexts/CartContext';
import React, { FC, useContext } from 'react';
import { IOrder } from 'types';

interface ColorMap {
  [key: string]: string;
}

const COLORMAP: ColorMap = {
  created: '#1acb71',
  canceled: '#f67c7c',
  confirmed: '#1a9acb',
  delivered: '#9b8209',
};

export const OrderCard: FC<IOrder> = ({
  id,
  address,
  totalPrice,
  status,
  products,
  createdAt,
  author,
}) => {
  const { isCanclingOrder, doCancleOrder } = useContext(CartContext);
  return (
    <Paper sx={{ padding: '10px' }}>
      <Stack>
        <Grid container spacing={4}>
          <Grid item sm={8}>
            <Typography variant="body1" component="div">
              Address: {address}
            </Typography>
          </Grid>
          <Grid container item sm={4} justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Typography variant="body1" component="div">
                Status:
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: `${COLORMAP[status] || 'black'}` }}
              >
                {status.toUpperCase()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <ProductOrder products={products} />
        <Divider />
        <Grid container spacing={4} justifyContent="flex-end">
          <Grid item>
            <Typography variant="h6" component="div">
              Total price:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div" sx={{ color: '#f67c7c' }}>
              $ {totalPrice}
            </Typography>
          </Grid>
        </Grid>
        {(status === 'created' || status === 'confirmed') && (
          <Grid container spacing={4} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={() => doCancleOrder(id)}
                disabled={isCanclingOrder}
              >
                {isCanclingOrder && <CircularProgress size={20} style={{ marginRight: 20 }} />}
                Cancle
              </Button>
            </Grid>
          </Grid>
        )}
      </Stack>
    </Paper>
  );
};
