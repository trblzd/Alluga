import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import './Styles.css';
import { Link } from 'react-router-dom'

const Product = ({ product, onAddToCart }) => {
    return (
        <Card class='cardsl'>
            <CardMedia class='cardimage' image={product.image.url} title={product.name} component={Link} to="/ProductView/{product.id}" />
                <CardActions disableSpacing class='cardaction'>
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


