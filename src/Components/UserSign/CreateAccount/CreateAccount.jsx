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

  const Sign = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(auth.currentUser.uid)
        console.log(userCredential)
        // Navigate to the main page
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
      <div class='toolbar' />
      <Grid>
        <Paper elevation={5} class='paper'>
          <Grid>
            <h1 class='header'>Criar Conta</h1>
            <br />
          </Grid>
          <form class='form' onSubmit={Sign}>
            
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
            <Button class='button' type='submit' variant='contained' color='primary'>Criar Conta</Button>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}

export default SignUp;
