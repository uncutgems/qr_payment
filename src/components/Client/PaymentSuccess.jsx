import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get payment details from navigation state or show error
    const paymentDetails = location.state?.paymentDetails;

    if (!paymentDetails) {
        // Redirect if no payment details found
        navigate('/client');
        return null;
    }

    const handleDone = () => {
        navigate('/client');
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
            <div className="text-green-500 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>

            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
                Your payment has been processed successfully
            </p>

            <div className="mb-6 text-left bg-gray-50 p-4 rounded-md">
                <h3 className="font-bold mb-2">Payment Details:</h3>
                <p><span className="font-semibold">Amount:</span> ${parseFloat(paymentDetails.amount).toFixed(2)}</p>
                <p><span className="font-semibold">Recipient:</span> {paymentDetails.businessName}</p>
                <p><span className="font-semibold">Payment ID:</span> {paymentDetails.paymentId}</p>
                <p><span className="font-semibold">Date:</span> {new Date(paymentDetails.timestamp).toLocaleString()}</p>
            </div>

            <button
                onClick={handleDone}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none"
            >
                Done
            </button>
        </div>
    );
};

export default PaymentSuccess;