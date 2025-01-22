import ReactConfetti from "react-confetti";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();
    const { transactionId } = location.state || {};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <ReactConfetti />
            <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
            <p className="mt-4 text-lg">Your transaction ID: <span className="font-mono">{transactionId}</span></p>
        </div>
    );
};

export default PaymentSuccess;
