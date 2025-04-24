import React from 'react';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Make a Payment</h1>

            <div className="space-y-4">
                <Link
                    to="/client/scan-qr"
                    className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded text-center"
                >
                    Scan QR Code
                </Link>

                <Link
                    to="/client/payment-form"
                    className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded text-center"
                >
                    Enter Payment Details Manually
                </Link>

                <div className="bg-gray-100 p-4 rounded-lg mt-6">
                    <h2 className="font-bold mb-2">How It Works</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Scan the QR code provided by the business</li>
                        <li>Verify the payment details on your screen</li>
                        <li>Enter your payment information</li>
                        <li>Complete the payment securely</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;