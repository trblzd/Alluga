import React, {useState,useContext} from 'react'
import { TextField, Button, Typography} from '@mui/material'
import './Login.css'
import { Link } from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'




const Login=()=>{    
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {dispatch} = useContext(AuthContext)

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //signedIn
          const user = userCredential.user;
          dispatch({type: "LOGIN", payload: user})
          navigate('/Perfil');
        })
        .catch((error) => {
          setError(error);
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
          <Button type='submit' variant="contained" color="primary" class="button">
            Login
          </Button>
          <Button type='button' variant="contained" color="primary" class="button" component={Link} to={'/CriarConta'} >
            Criar Conta
          </Button>
          <Typography align="center">   
            Esqueci minha Senha
          </Typography>
        </form>
      );
}

export default Login;