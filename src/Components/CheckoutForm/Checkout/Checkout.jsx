import React, { useState, useEffect } from "react";
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import useStyles from './Checkout.css';


const steps = ['Revisão', 'Enviar Solicitação']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const Navigate = useNavigate();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                console.log(token);
                setCheckoutToken(token);
            } catch (error) {
                Navigate.pushState('/')
            }
        };

        generateToken();

    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const timeout =  () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }
    let Confirmation = () => order.costumer ? (
        <>
            <div>
                <Typography variant='h5'>Obrigado por Allugar!, {order.costumer.firstname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'>Referência do pedido: {order.costumer_reference}</Typography>
            </div>
            <br/>
            <Button component={Link} to='/' variant="outlined" type='button'>Voltar à tela inicial</Button>
        </>
    ) : isFinished ? (
        <>
        <Typography variant='h5'>Obrigado por Allugar!</Typography>
        <Divider className={classes.divider}/>
        <br/>
        <Button component={Link} to='/' variant="outlined" type='button'>Voltar à tela inicial</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );
    const Form = () => activeStep === 0
      //  ? <DeliveryForm checkoutToken={checkoutToken} next={next} backStep={backStep} timeout={timeout} />
      //  : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} />

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Finalizar Pedido</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>

        </>
    )
}
export default Checkout;