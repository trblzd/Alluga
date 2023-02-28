import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import './Cart.css';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleRemoveFromCart, handleEmptyCart }) => {
    const EmptyCart = () => (
        <Typography variant="subtitle1">Você não tem itens no seu carrinho, <Link to='/' className='link'>Adicione alguns!</Link>
        </Typography>
    );
    if (!cart.line_items) return 'Carregando...';
    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((lineitem) => (
                    <Grid item xs={12} sm={4} key={lineitem.id}>
                        <CartItem item={lineitem} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>                                                     
            <div class='cardDetails'>
                <Typography variant='h4' class='title'>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button class='emptyButton' size='large' type='button' variant='contained'onClick={handleEmptyCart}>Esvaziar Carrinho</Button>
                    <Button component={Link} to='/review' class='checkoutButton' size='large' type='button' variant='contained'>Concluir Aluguel</Button>
                </div>
            </div>
        </>
    )

    return (
        <Container>
            <div class='toolbar' />
            <Typography class='title' gutterBottom>Seu Carrinho</Typography> <br/>
            {!cart.line_items?.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}
export default Cart;