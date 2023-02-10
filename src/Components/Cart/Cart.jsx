import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import './Styles.css';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const EmptyCart = () => (
        <Typography variant="subtitle1">Você não tem itens no seu carrinho, <Link to='/' className='link'>Adicione alguns!</Link>
        </Typography>
    );
    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((lineitem) => (
                    <Grid item xs={12} sm={4} key={lineitem.id}>
                        <CartItem item={lineitem} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>                                                     
            <div class='cardDetails'>
                <Typography variant='h4'>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button class='emptyButton' size='large' type='button' variant='contained' color='secondary' onClick={handleEmptyCart}>Esvaziar Carrinho</Button>
                    <Button component={Link} to='/checkout' class='checkoutButton' size='large' type='button' variant='contained' color='primary'>Concluir Aluguel</Button>
                </div>
            </div>
        </>
    )

    if (!cart.line_items) return 'Carregando...';
    return (
        <Container>
            <div class='toolbar' />
            <Typography class='title' variant='h3' gutterBottom>Seu Carrinho</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}
export default Cart;