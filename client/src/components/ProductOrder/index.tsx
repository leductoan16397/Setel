import {
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Grid,
  CardMedia,
  Typography,
  Divider,
} from '@mui/material';
import React, { FC } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Cart } from 'types';

export const ProductOrder: FC<Cart> = ({ products }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = (): void => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="div"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {products.map(({ count, image, name, price }, index) => (
            <div key={`product_order_${index + 1}`}>
              <Divider variant="middle" />
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item sm={2}>
                    <CardMedia component="img" height="100" image={image} />
                  </Grid>
                  <Grid item sm={7} container flexDirection="column" justifyContent="space-around">
                    <Typography variant="h6" color="text.secondary">
                      {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      x{count}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={3}
                    textAlign="end"
                    justifyContent="flex-end"
                    alignItems="center"
                    container
                  >
                    <Typography variant="h6" color="text.secondary" sx={{ color: '#f67c7c' }}>
                      $ {price * count}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </div>
          ))}
        </List>
      </Collapse>
    </List>
  );
};
