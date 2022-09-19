import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";

import "./payment-form.styles.scss";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

      if (!stripe || !elements) return;
      
  };

  return (
    <div className="payment-form-container">
      <form action="" className="form-container">
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPES_CLASSES.inverted}></Button>
      </form>
    </div>
  );
};

export default PaymentForm;
