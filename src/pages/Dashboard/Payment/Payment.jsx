import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useLocation } from "react-router-dom";

// TODO: add publishable key
const stripePromise = loadStripe('pk_test_51QhqazC6LzziWmRMM9OheJsRmx3p930u1TjgXOx6p0aimoSHLvr6hscS7NOyENs2RMdD6AG8ZYIIrQSJqptsW8J000uW6Upqxe');
const Payment = () => {
    const location = useLocation();
  const parcel = location.state?.parcel;

  if (!parcel) {
    return <div>Parcel data is missing! Please go back and try again.</div>;
  }

    return (
        <div>
            <p className="text-center text-3xl font-bold my-10">Payment System</p>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm parcel={parcel}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;