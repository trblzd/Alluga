import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './Styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">Você não tem itens no seu carrinho, <Link to='/' className={classes.link}>Adicione alguns!</Link>
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
            <div className={classes.cardDetails}>
                <Typography variant='h4'>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={handleEmptyCart}>Esvaziar Carrinho</Button>
                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>Concluir Aluguel</Button>
                </div>
            </div>
        </>
    )

    if (!cart.line_items) return 'Carregando...';
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3' gutterBottom>Seu Carrinho</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}
export default Cart;