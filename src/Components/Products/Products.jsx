import React from 'react';
import { Grid } from '@mui/material';
import Product from './Product/Product';
import styles from './Styles.css';

const Products = ({ products, onAddToCart }) => {
    return (
        <main className={styles.content}>
            <div className={styles.toolbar} />
            <Grid container justifyContent='center' spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )

}
export default Products;