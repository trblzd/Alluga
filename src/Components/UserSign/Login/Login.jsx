import React, {useState, useEffect} from 'react'
import { TextField, Button, Typography} from '@mui/material'
import './Login.css'
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../../firebase';

const Login=()=>{    
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //signedIn
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          setError(true);
          })

    };
    return (
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type='email'
            onChange={e=>setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            type="password"
            onChange={e=>setPassword(e.target.value)}
          />
          <Button type='submit' variant="contained" color="primary" class="button" onClick={0}>
            Login
          </Button>
          <Typography align="center">   
            <a href="#">Esqueci minha senha</a>
          </Typography>
        </form>
      );
}

export default Login;