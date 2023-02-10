import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import './Styles.css';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
    return (
        <Card class='cardsl'>
            <CardMedia image={item.image.url} alt={item.name} class='cardimage' />
            <CardContent>
                <Typography class='card-heading' variant='h4'>{item.name}</Typography>
                <Typography class='card-text' variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions class='cardaction'>
                <div class='cardbutton'>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant='contained' type="button" color='secondary' onClick={() => onRemoveFromCart(item.id)}>Remover</Button>
            </CardActions>
        </Card>
    )
}
export default CartItem;