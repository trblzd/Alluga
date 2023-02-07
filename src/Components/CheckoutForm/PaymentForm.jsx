import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review.jsx';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, backStep, onCaptureCheckout, nextStep }) => {
    const handleSubmit = async(event, elements, stripe => {
        e.event.preventDefault();
        if (!stripe || !elements) return;
    })
    const cardElement = elements.getElement(CardElement);
    //AWAIT NAO VAI FICA DANDO ERRO MESMO SENDO ASYNC
    const { error, PaymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
        console.log(error);
    } else {
        const orderData = {
            line_items: checkoutToken.live.line_items,
            customer = {
                firstname: shippingData.firstname,
                lastname: shippingData.lastname,
                email: shippingData.email
            },
            fulfillment: { shipping_method: shippingData.shippingOption },
            payment: {
                gateway: 'stipe',
                stripe: {
                    payment_method_id: PaymentMethod.id
                }
            }
        }
        onCaptureCheckout(checkoutToken.id, orderData);
        nextStep();
    }
}
return (
    <>
        <Review checkoutToken={checkoutToken} />
        <Divider />
        <Typography varient="h6" gutterBottom style={{ margin: '20px 0' }}>Metodo de pagamento</Typography>
        <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {({ elements, stripe }) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement />
                        <br /> <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant='outlined' onClick={backStep}>Voltar</Button>
                            <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                Finalizar {checkoutToken.subtotal.formated_with_symbol}
                            </Button>
                        </div>
                    </form>
                )}
            </ElementsConsumer>
        </Elements>
    </>
)
}

export default PaymentForm;