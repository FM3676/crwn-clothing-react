import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";

import "./payment-form.styles.scss";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 10000 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Fan",
        },
      },
    });

    if (paymentResult.error) alert(paymentResult.error);
    else if (paymentResult.paymentIntent.status === "succeeded")
      alert("Payent Successful");
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={paymentHandler} className="form-container">
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPES_CLASSES.inverted}>PAY NOW</Button>
      </form>
    </div>
  );
};

export default PaymentForm;
