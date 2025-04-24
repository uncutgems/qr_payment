import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import { usePayment } from '../../context/PaymentContext';

const CreatePaymentForm = () => {
    // Pre-filled demo data
    const [amount, setAmount] = useState('99.99');
    const [email, setEmail] = useState('business@example.com');
    const [businessName, setBusinessName] = useState('Demo Business');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { createNewPayment } = usePayment();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // For demo: Generate a simple random payment ID instead of calling real service
            const demoPaymentId = 'PAY_' + Math.random().toString(36).substr(2, 9).toUpperCase();

            // Store payment details in context
            createNewPayment({
                paymentId: demoPaymentId,
                amount: parseFloat(amount),
                email,
                businessName,
                createdAt: new Date().toISOString()
            });

            // Brief delay to simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Navigate to QR code display page
            navigate('/business/qr-code');
        } catch (error) {
            setError(error.message || 'Failed to create payment');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
                <p className="font-bold">Demo Mode</p>
                <p>This form is pre-filled with demo data. You can modify it or use as is.</p>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                        Amount ($)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        step="0.01"
                        min="0.01"
                        className="w-full px-3 py-2 border rounded-md"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Your Email (for Interac)
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="businessName">
                        Business Name
                    </label>
                    <input
                        type="text"
                        id="businessName"
                        className="w-full px-3 py-2 border rounded-md"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Your Business Name"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Generate Payment QR Code'}
                </button>
            </form>
        </div>
    );
};

export default CreatePaymentForm;