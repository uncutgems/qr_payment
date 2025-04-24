import React from 'react';
import QRScanner from '../../components/Client/QRScanner';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';

const ScanQRPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Scan Payment QR Code</h1>
                <QRScanner />
            </main>
            <Footer />
        </div>
    );
};

export default ScanQRPage;