import React, {useState,useContext} from 'react'
import { TextField, Button, Grid, Paper} from '@mui/material'
import './Login.css'
import { Link } from 'react-router-dom'
import {signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'

const Login=()=>{    
    const [setError] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {dispatch} = useContext(AuthContext);
    // eslint-disable-next-line
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = () => {
      alert('Um email foi enviado para você!')
    sendPasswordResetEmail(auth, email).then(() => {

      navigate('/Login');
  })
  .catch((error) => {
    setError(error);
  });

    }
    const handleLogin = (e) => {
      e.preventDefault();
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch({ type: 'LOGIN', payload: user });
          navigate('/MeusDados');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/user-not-found':
              setErrorMessage('Usuário não encontrado. Verifique seu email.');
              break;
            case 'auth/wrong-password':
              setErrorMessage('Senha incorreta. Tente novamente.');
              break;
            default:
              setErrorMessage('Algo deu errado. Tente novamente mais tarde.');
              break;
          }
        });
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
          {errorMessage && <p className="error">{errorMessage}</p>}
           <br/> <br/>
           <div class='button-container'>
          <Button type='submit' variant="contained" color="primary" class="buttonLG">
            Login
          </Button>
          <Button type='button' variant="contained" color="primary" class="buttonLG" component={Link} to={'/CriarConta'} >
            Criar Conta
          </Button>
          </div>
          <Button type='text' class="conta" onClick={handleForgotPassword} >
          Esqueci a senha
          </Button>
          
        </form>
        </Paper>
      </div>
    
      );
}

export default Login;