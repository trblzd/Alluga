import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, FormHelperText } from '@mui/material';
import './CreateAccount.css';
import { useNavigate  } from 'react-router-dom'
import { auth } from '../../../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');


  const history = useNavigate();

  const CriarConta = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        history.push('/');
      })
      .catch((error) => {
        console.log(error)
      });
  }
  
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
      <div class='toolbarCA' />
      <Grid>
        <Paper elevation={5} class='paperCA'>
          <Grid>
            <h1 class='headerCA'>Criar Conta</h1>
            <br />
          </Grid>
          <form class='formCA' onSubmit={CriarConta}>
            
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
              label='Senha'
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <Button class='buttonCA' type='submit' variant='contained' color='primary'>Criar Conta</Button>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}

export default SignUp;
