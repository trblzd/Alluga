import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, FormControlLabel, Checkbox,} from '@mui/material'
import styles from'./Styles.css';

const SignUp = () => {
  return (
    <div>
      <div className={styles.toolbar} />
        <Grid>
          <Paper elevation={5} className={styles.paper}>
              <Grid>
                <Avatar className={styles.avatar}>
                  </Avatar>  
                  <h1 className={styles.header}>Criar Conta</h1>
                    <Typography variant='caption' gutterBottom>Insira seus dados para criar uma conta</Typography>
                </Grid>
                <form className={styles.form}>
                    <TextField fullWidth label='Nome' placeholder="Insira seu nome" />
                    <TextField fullWidth label='Email' placeholder="Insira seu Email" />
                    <TextField fullWidth label='Telefone' placeholder="Insira seu telefone" />
                    <TextField fullWidth label='Senha' placeholder="Crie uma senha"/>
                    <TextField fullWidth label='Confirmar Senha' placeholder="Confirme sua senha"/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="Aceito os termos e condições."
                        classes='control'
                    />
                 <Button className={styles.button} type='submit' variant='contained' color='primary'>Criar Conta</Button>
                </form>
          </Paper>
        </Grid>
        </div>
  )
}

export default SignUp;