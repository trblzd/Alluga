import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, FormHelperText } from '@mui/material';
import './Styles.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setErrorMessage('Insira um email válido.');
      return;
    }
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.location.href = '/UserProfile';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailError(true);
      setErrorMessage('Insira um email válido.');
    } else {
      setEmailError(false);
      setErrorMessage('');
    }
  }

  return (
    <div>
      <div class='toolbar' />
      <Grid>
        <Paper elevation={5} class='paper'>
          <Grid>
            <h1 class='header'>Criar Conta</h1>
            <br />
          </Grid>
          <form class='form' onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label='Nome'
              placeholder="Insira seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
            <TextField
              fullWidth
              label='Email'
              placeholder="Insira seu Email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              required
              type='email'
            />
            {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
            <br />
            <br />
            <TextField
              fullWidth
              label='Telefone'
              placeholder="Insira seu telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <br />
            <TextField
              fullWidth
              label='Senha'
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <Button class='button' type='submit' variant='contained' color='primary'>Criar Conta</Button>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}

export default SignUp;
