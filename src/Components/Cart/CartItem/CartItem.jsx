
import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import './CartItem.css';

const CartItem = ({ item, onRemoveFromCart }) => {
    return (
        <Card class='cardsl1'>
            <CardMedia>
                <img src={item.image.url} class='cardimage' alt={item.name} />
            </CardMedia>
            <CardContent>
                <Typography class='card-heading' variant='h4'>{item.name}</Typography>
                <Typography class='card-text' variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions class='cardaction'>
            <Typography class='card-text' id='quantity'>Quantidade: {item.quantity}</Typography><br/>
                <Button variant='contained' type="button" color='secondary' onClick={() => onRemoveFromCart(item.id)}>Remover</Button>
            </CardActions>
        </Card>
    )
}
export default CartItem;