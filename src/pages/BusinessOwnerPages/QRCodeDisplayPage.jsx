import React from 'react';
import GeneratedQRCode from '../../components/BusinessOwner/GeneratedQRCode';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';

const QRCodeDisplayPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Payment QR Code</h1>
                <GeneratedQRCode />
            </main>
            <Footer />
        </div>
    );
};

export default QRCodeDisplayPage;