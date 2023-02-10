import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import styles from './Styles.css';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
    return (
        <Card className={styles.cardsl}>
            <CardMedia image={item.image.url} alt={item.name} className={styles.cardimage} />
            <CardContent>
                <Typography className='card-heading' variant='h4'>{item.name}</Typography>
                <Typography className='card-text' variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={styles.cardaction}>
                <div className={styles.cardbutton}>
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