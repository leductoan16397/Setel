import { Grid, Tooltip, IconButton, CardMedia, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { FC, useContext } from 'react';
import { ProductOrder } from 'types';
import { CartContext } from 'contexts/CartContext';

export const ProductCart: FC<ProductOrder> = ({ id, name, image, price, count }) => {
  const { increaseCount, descreaseCount, isCreatintOrder, removeProductFromCart } =
    useContext(CartContext);

  return (
    <Grid
      container
      alignItems="center"
      sx={{ backgroundColor: 'white', borderRadius: '8px', padding: '10px 0' }}
    >
      <Grid container item xs={5} alignItems="center">
        <Grid item xs={4}>
          <CardMedia component="img" height="80" image={image} />
        </Grid>
        <Grid item xs={8}>
          <h5>{name}</h5>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <h5>$ {price}</h5>
      </Grid>
      <Grid item container xs={2} alignItems="center">
        <Tooltip title="Descrease" arrow placement="top">
          <IconButton onClick={() => descreaseCount(id)} disabled={isCreatintOrder}>
            <RemoveIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <h5>{count}</h5>
        <Tooltip title="Increase" arrow placement="top">
          <IconButton onClick={() => increaseCount(id)} disabled={isCreatintOrder}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h6" sx={{ color: '#f67c7c' }}>
          $ {price * count}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Remove Product" arrow placement="top">
          <IconButton onClick={() => removeProductFromCart(id)} disabled={isCreatintOrder}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
