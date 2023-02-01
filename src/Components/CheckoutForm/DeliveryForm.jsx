import React from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/Commerce'
import FormInput from './CustomTextField';


const DeliveryForm = ({ checkoutToken, next }) => {
    const methods = useForm();
    return (
        <>
            <Typography variant='h6' gutterBottom>Ponto de Entrega</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data }))}>
                    <Grid container spacing={3}>
                        <FormInput required name='pnome' label='Nome' />
                        <FormInput required name='snome' label='Sobrenome' />
                        <FormInput required name='address' label='Endereço' />
                        <FormInput required name='horario' label='Horario desejado' />
                        <FormInput required name='datain' label='Data desejada' />
                        <FormInput required name='dataout' label='Data de entrega' />
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to='/cart' variant='outlined'>Voltar ao Carrinho</Button>
                        <Button type='submit' variant='contained' color='primary'>Continuar</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default DeliveryForm