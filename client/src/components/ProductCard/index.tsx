/* eslint-disable max-len */
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { CartContext } from 'contexts/CartContext';
import React, { FC, useContext } from 'react';
import { Product } from 'types';

export const ProductCard: FC<Product> = ({ id, name, image, price }) => {
  const { addProductToCart } = useContext(CartContext);
  const addToCartHandle = (): void => {
    addProductToCart({ id, name, image, price });
  };

  return (
    <Card sx={{ width: 350, margin: '10px' }}>
      <CardMedia component="img" height="250" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ color: '#f67c7c' }}>
          $ {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={addToCartHandle}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
