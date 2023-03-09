import React, { useState, useContext } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import './Cart.css';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { doc, getDoc, collection } from "firebase/firestore";
import {db} from '../../firebase';

const Cart = ({ cart, handleRemoveFromCart, handleEmptyCart }) => {
  const {currentUser} = useContext(AuthContext)
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = async () => {
    setSendingEmail(true);
    try {
      const docRef = doc(collection(db, "usuariodados"), currentUser.uid);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
  
      if (!docData) {
        alert("Não foi possível encontrar seus dados no banco de dados. Por favor, preencha seus dados na página 'Meus Dados' antes de concluir o aluguel.");
        return;
      }
  
      // CONTEUDO DO EMAIL
      var emailText = `
        Nome: ${docData.Nome}
        Telefone: ${docData.Telefone}
        CPF: ${docData.CPF}
        CEP: ${docData.CEP}
        \n
        Itens do Carrinho:
        ${cart.line_items
          .map((item) => `${item.name}: ${item.quantity}`)
          .join('\n')}
  
        \n
        Subtotal: ${cart.subtotal.formatted_with_symbol}
      `;
      emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, {message: emailText,}, process.env.REACT_APP_PUBLIC_KEY)
      .then(function(response) {
        console.log('SUCCESSO!', response.status, response.text);
     }, function(error) {
        console.log('FALHA...', error);
     });
      setEmailSent(true);
      handleEmptyCart();
    } catch (error) {
      console.log(error);
    } finally {
      setSendingEmail(false);
    }
  }
  
  const EmptyCart = () => (
    <Typography variant="subtitle1">Você não tem itens no seu carrinho, <Link to='/' className='link'>Adicione alguns!</Link>
    </Typography>
  );
  
  if (!cart.line_items) return 'Carregando...';

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((lineitem) => (
           <Grid item xs={12} sm={6} md={4} key={lineitem.id}>
            <CartItem item={lineitem} onRemoveFromCart={handleRemoveFromCart} />
          </Grid>
        ))}
      </Grid>                                                     
      <div class='cardDetails'>
        <Typography variant='h4' class='title1'>
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        {sendingEmail && <Typography variant='subtitle1' color='textSecondary' class='evemail'>Enviando pedido para o email do Alluga...</Typography>}
        {emailSent && <Typography variant='subtitle1' color='success' class='evemail'>O pedido foi enviado com sucesso! Entraremos em contato.</Typography>}
        <div>
          <Button class='emptyButton' size='large' type='button' variant='contained' onClick={handleEmptyCart}>Esvaziar Carrinho</Button>
          <Button class='checkoutButton' size='large' type='button' variant='contained' onClick={sendEmail} disabled={sendingEmail}>Concluir Aluguel</Button>

        </div>
       
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