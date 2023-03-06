import React, { useState, useContext } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import './Cart.css';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import 'firebase/firestore';
import { db, app, functions } from '../../firebase';
const Cart = ({ cart, handleRemoveFromCart, handleEmptyCart }) => {
  const {currentUser} = useContext(AuthContext)
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  
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
          <Button class='emptyButton' size='large' type='button' variant='contained' onClick={handleEmptyCart}>Esvaziar Carrinho</Button>
<<<<<<< HEAD
          <Button class='checkoutButton' size='large' type='button' variant='contained' onClick={1} disabled={sendingEmail}>Concluir Aluguel</Button>
=======
          <Button class='checkoutButton' size='large' type='button' variant='contained' onClick={sendEmail} disabled={sendingEmail}>Concluir Aluguel</Button>
>>>>>>> 38469ae19efc40ce238fa19ba37a093ba84e23a5
        </div>
        {sendingEmail && <Typography variant='subtitle1' color='textSecondary'>Enviando email para o Alluga...</Typography>}
        {emailSent && <Typography variant='subtitle1' color='success'>O pedido foi enviado com sucesso!</Typography>}
      </div>
    </>
  );

  return (
    <Container>
      <div class='toolbar' />
      <Typography class='title' gutterBottom>Seu Carrinho</Typography> <br/>
     

            {!cart.line_items?.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}
export default Cart;