
import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import './Product.css';

const Product = ({ product, onAddToCart }) => {
    return (
        <Card class='cardsl'>
            <CardMedia class='cardimagehome' title={product.name}>
                <img src={product.image.url} alt={product.name}/>
            </CardMedia>
                <CardActions disableSpacing class='cardactionpro'>
                <IconButton aria-label='Add to Cart' onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
            <CardContent>
                    <Typography variant='h5' gutterBottom class='cardheading'>{product.name}</Typography>
                    <Typography class='cardtext' dangerouslySetInnerHTML={{ __html: product.description }} variant='body2' color='textSecondary' />
                    <Typography variant='h5' class='cardtext'>{product.price.formatted_with_symbol}/Dia</Typography>
            </CardContent>


        </Card>
    )
}

export default Product;