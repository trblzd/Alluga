import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, FormControl, FormControlLabel, FormLabel, Checkbox,} from '@material-ui/core'
import useStyles from './Styles';

const SignUp = () => {
    const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
        <Grid>
          <Paper elevation={5} className={classes.paper}>
              <Grid>
                <Avatar className={classes.avatar}>
                  </Avatar>  
                  <h1 className={classes.header}>Criar Conta</h1>
                    <Typography variant='caption' gutterBottom>Insira seus dados para criar uma conta</Typography>
                </Grid>
                <form className={classes.form}>
                    <TextField fullWidth label='Nome' placeholder="Insira seu nome" />
                    <TextField fullWidth label='Email' placeholder="Insira seu Email" />
                    <TextField fullWidth label='Telefone' placeholder="Insira seu telefone" />
                    <TextField fullWidth label='Senha' placeholder="Crie uma senha"/>
                    <TextField fullWidth label='Confirmar Senha' placeholder="Confirme sua senha"/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="Aceito os termos e condições."
                        className={classes.control}
                    />
                 <Button className={classes.button} type='submit' variant='contained' color='primary'>Criar Conta</Button>
                </form>
          </Paper>
        </Grid>
        </div>
  )
}

export default SignUp;