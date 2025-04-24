import React from 'react';
import { Link } from 'react-router-dom';

const BusinessOwnerDashboard = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Business Owner Dashboard</h1>

            <div className="space-y-4">
                <Link
                    to="/business/create-payment"
                    className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded text-center"
                >
                    Create New Payment Request
                </Link>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="font-bold mb-2">How It Works</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Create a payment request by entering the amount and your business details</li>
                        <li>Show the generated QR code to your customer</li>
                        <li>Customer scans the code and completes the payment</li>
                        <li>You'll receive instant notification when payment is complete</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default BusinessOwnerDashboard;