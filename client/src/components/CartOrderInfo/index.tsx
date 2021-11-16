import { Button, CircularProgress, Paper, Stack, TextField, Typography } from '@mui/material';
import { CartContext } from 'contexts/CartContext';
import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { ProductOrder } from 'types';
import { Toast } from 'utils';

export const CartOrderInfo: FC = () => {
  const { cart, isCreatintOrder, doCreateOrder } = useContext(CartContext);
  const [totlPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      setTotalPrice(
        cart.reduce((pre: number, cur: ProductOrder) => pre + cur.price * cur.count, 0)
      );
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  const createOrderHandler = (): void => {
    setInputError(false);
    if (cart.length === 0) {
      Toast('Info!!', 'Cart is empty!', 'warning');
      return;
    }
    if (address.length < 10) {
      setInputError(true);
      Toast('Error!!', 'The address must be longer than 10 characters', 'danger');
      return;
    }
    doCreateOrder(address);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        position: 'sticky',
        top: '0px',
        zIndex: '999',
      }}
    >
      <Typography gutterBottom variant="h4" component="div">
        Order Info
      </Typography>
      <Paper sx={{ padding: '10px' }}>
        <TextField
          error={inputError}
          label="Address"
          value={address}
          disabled={isCreatintOrder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          variant="outlined"
          sx={{ width: '100%' }}
        />
      </Paper>
      <Paper sx={{ padding: '10px' }}>
        <Typography variant="h6" color="text.secondary" sx={{ color: '#f67c7c' }}>
          Total Price: ${totlPrice}
        </Typography>
      </Paper>
      <Paper sx={{ padding: '10px' }}>
        <Button
          color="error"
          variant="contained"
          fullWidth
          disabled={isCreatintOrder}
          onClick={createOrderHandler}
        >
          {isCreatintOrder && <CircularProgress size={20} style={{ marginRight: 20 }} />}
          Order
        </Button>
      </Paper>
    </Stack>
  );
};
