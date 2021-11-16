import { CircularProgress } from '@mui/material';
import { getAllProduct } from 'api';
import { ProductCard } from 'components/ProductCard';
import { AppLayout } from 'layout/AppLayout';
import React, { FC, useEffect, useState } from 'react';
import { Product } from 'types';
import './index.scss';

export const Home: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async (): Promise<void> => {
    const data = await getAllProduct();
    setProducts(data);
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppLayout>
      <div className="product-list">
        {isLoaded ? (
          products.map(({ id, image, name, price }, index) => {
            return (
              <ProductCard
                key={`product_${index + 1}`}
                id={id}
                image={image}
                name={name}
                price={price}
              />
            );
          })
        ) : (
          <CircularProgress size={20} style={{ marginRight: 20 }} />
        )}
      </div>
    </AppLayout>
  );
};
