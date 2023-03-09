import React, { useState } from 'react';
import { Paper, TextField, Button, FormHelperText } from '@mui/material';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const CriarConta = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            dispatch({ type: 'LOGIN', payload: user });
            history('/');
          })
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          setEmailError(true);
          setErrorMessage('Email já está em uso.');
        }
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
  };

  return (
    <div>
    <div class='toolbarCA' />
      <Paper elevation={5} class='paperCA'>
          <h1 class='headerCA'>Criar Conta</h1>
        <form class='formCA' onSubmit={CriarConta}>
          <TextField
            fullWidth
            label='Email'
            placeholder='Insira seu Email'
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            type='email'
          />
          {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
          <TextField
            fullWidth
            label='Senha'
            placeholder='Crie uma senha'
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button class='buttonCA' type='submit' variant='contained' color='primary'>
            Criar Conta
          </Button>
        </form>
      </Paper>
  </div>
  );
};

export default SignUp;
