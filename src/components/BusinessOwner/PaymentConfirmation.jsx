import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../../context/PaymentContext';

const PaymentConfirmation = () => {
    const { currentPayment, paymentStatus, clearPayment } = usePayment();
    const navigate = useNavigate();

    // Redirect if no payment data or not successful
    if (!currentPayment || paymentStatus !== 'success') {
        navigate('/business/create-payment');
        return null;
    }

    const handleCreateNew = () => {
        clearPayment();
        navigate('/business/create-payment');
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
            <div className="text-green-500 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>

            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>

            <div className="mb-6 text-left">
                <h3 className="font-bold mb-2">Payment Details:</h3>
                <p><span className="font-semibold">Amount:</span> ${currentPayment.amount.toFixed(2)}</p>
                <p><span className="font-semibold">Business:</span> {currentPayment.businessName}</p>
                <p><span className="font-semibold">Email:</span> {currentPayment.email}</p>
                <p><span className="font-semibold">Payment ID:</span> {currentPayment.paymentId}</p>
                <p><span className="font-semibold">Date:</span> {new Date().toLocaleString()}</p>
            </div>

            <button
                onClick={handleCreateNew}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
                Create New Payment
            </button>
        </div>
    );
};

export default PaymentConfirmation;