import React from 'react';
import { Grid, Button, Container, Typography } from '@material-ui/core';
import useStyles from './Styles';

const ProductView = ({ products, onAddToCart, handleUpdateCartQty, handleRemoveFromCart }) => {
    return (
        <Container className='product-view'>
            {products.map((product) => (
                <div className='details'>
                    <div className='big-image'>
                        <img src={product.image.url} alt='' />
                    </div>
                    <div className='text'>
                        <Typography variant='h5' gutterBottom>
                            {product.name}
                        </Typography>

                        <Typography variant='h5'>
                            {product.price.formatted_with_symbol}/Dia
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>{product.description}</Typography>
                    </div>
                </div>
            ))}
        </Container>
    )
}

export default ProductView;