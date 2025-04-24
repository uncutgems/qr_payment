import React from 'react';
import CreatePaymentForm from '../../components/BusinessOwner/CreatePaymentForm';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';

const CreatePaymentPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Payment Request</h1>
                <CreatePaymentForm />
            </main>
            <Footer />
        </div>
    );
};

export default CreatePaymentPage;