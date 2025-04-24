import React from 'react';
import PaymentConfirmation from '../../components/BusinessOwner/PaymentConfirmation';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';

const PaymentSuccessPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Payment Successful</h1>
                <PaymentConfirmation />
            </main>
            <Footer />
        </div>
    );
};

export default PaymentSuccessPage;