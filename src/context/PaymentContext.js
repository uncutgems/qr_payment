import React, { createContext, useState, useContext } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [currentPayment, setCurrentPayment] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, success, cancelled, failed

    const createNewPayment = (paymentDetails) => {
        setCurrentPayment(paymentDetails);
        setPaymentStatus('pending');
    };

    const updatePaymentStatus = (status) => {
        setPaymentStatus(status);
    };

    const clearPayment = () => {
        setCurrentPayment(null);
        setPaymentStatus('pending');
    };

    return (
        <PaymentContext.Provider value={{
            currentPayment,
            paymentStatus,
            createNewPayment,
            updatePaymentStatus,
            clearPayment
        }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => useContext(PaymentContext);