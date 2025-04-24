import React from 'react';
import PaymentForm from '../../components/Client/PaymentForm';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';

const PaymentFormPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Complete Payment</h1>
                <PaymentForm />
            </main>
            <Footer />
        </div>
    );
};

export default PaymentFormPage;