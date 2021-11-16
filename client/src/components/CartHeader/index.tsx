import { Grid } from '@mui/material';
import React, { FC, useContext } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import './index.scss';
import { CartContext } from 'contexts/CartContext';

export const CartHeader: FC = () => {
  const { removeAllProduct, isCreatintOrder } = useContext(CartContext);

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        backgroundColor: 'gray',
        borderRadius: '8px',
        position: 'sticky',
        top: '0px',
        padding: '5px 0',
        zIndex: '999',
      }}
    >
      <Grid
        container
        alignItems="center"
        sx={{
          backgroundColor: 'white',
        }}
      >
        <Grid item xs={5} sx={{ textAlign: 'center' }}>
          <h5>Product</h5>
        </Grid>
        <Grid item xs={2}>
          <h5>Price</h5>
        </Grid>
        <Grid item xs={2}>
          <h5>Count</h5>
        </Grid>
        <Grid item xs={2}>
          <h5>Total</h5>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Remove All" arrow placement="top">
            <IconButton onClick={() => removeAllProduct()} disabled={isCreatintOrder}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};
