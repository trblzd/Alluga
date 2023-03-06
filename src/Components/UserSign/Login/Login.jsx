import React, {useState,useContext} from 'react'
import { TextField, Button, Typography, Grid, Paper} from '@mui/material'
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
          navigate('/MeusDados');
        })
        .catch((error) => {
          setError(error);
          })

    };
    return (
      <div>
        <div class='toolbarLG'/>
        <Paper class='paperLG'>
        <Grid>
            <h1 class='headerLG'>Login</h1>
            <br />
          </Grid>
          <form onSubmit={handleLogin} class='formLG'>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            placeholder="Insira seu Email"
            type='email'
            onChange={e=>setEmail(e.target.value)}
          />
          <br/> <br/>
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            type="password"
            onChange={e=>setPassword(e.target.value)}
          />
           <br/> <br/>
           <div class='button-container'>
          <Button type='submit' variant="contained" color="primary" class="buttonLG">
            Login
          </Button>
          <Button type='button' variant="contained" color="primary" class="buttonLG" component={Link} to={'/CriarConta'} >
            Criar Conta
          </Button>
          </div>
          <Typography align="left">   
            Esqueci minha Senha
          </Typography>
        </form>
        </Paper>
      </div>
    
      );
}

export default Login;