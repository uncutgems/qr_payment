import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clientPaymentService } from '../../services/clientPaymentService';

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        recipientName: '',
        recipientEmail: '',
        amount: '',
        // Pre-filled customer demo data
        customerName: 'Demo Customer',
        customerEmail: 'customer@example.com',
        customerAccountNumber: '123456789',
    });

    const [paymentId, setPaymentId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    // Check if payment data was passed from QR scanner
    useEffect(() => {
        if (location.state?.paymentData) {
            const { paymentData } = location.state;

            // Auto-fill form with QR code data
            setFormData(prevData => ({
                ...prevData,
                recipientName: paymentData.businessName || '',
                recipientEmail: paymentData.businessOwnerEmail || '',
                amount: paymentData.amount ? paymentData.amount.toString() : '',
            }));

            setPaymentId(paymentData.paymentId || '');
        } else {
            // If no QR data, fill with demo data for manual entry
            setFormData(prevData => ({
                ...prevData,
                recipientName: 'Demo Business',
                recipientEmail: 'business@example.com',
                amount: '99.99',
            }));

            // Generate a demo payment ID
            setPaymentId('MANUAL_' + Math.random().toString(36).substr(2, 9).toUpperCase());
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // For demo: Simulate API call with a delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Prepare payment data
            const paymentData = {
                paymentId: paymentId || 'DEMO_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                amount: parseFloat(formData.amount),
                businessOwnerEmail: formData.recipientEmail,
                businessName: formData.recipientName
            };

            // Prepare customer info (already pre-filled with demo data)
            const customerInfo = {
                name: formData.customerName,
                email: formData.customerEmail,
                accountNumber: formData.customerAccountNumber
            };

            // Simulate sending payment to server
            console.log('Processing payment:', { paymentData, customerInfo });

            // Simulate SSE event to business owner (in real app, the server would do this)
            // This is just for demonstration purposes to connect the two sides of the demo
            if (window.demoSSECallback) {
                window.demoSSECallback({
                    status: 'completed',
                    paymentId: paymentData.paymentId,
                    amount: paymentData.amount,
                    customerName: customerInfo.name,
                    timestamp: new Date().toISOString()
                });
            }

            // Navigate to success page with payment result
            navigate('/client/payment-success', {
                state: {
                    paymentResult: { success: true, transactionId: 'DEMO-TX-' + Date.now() },
                    paymentDetails: {
                        ...paymentData,
                        customerName: customerInfo.name,
                        timestamp: new Date().toISOString()
                    }
                }
            });

        } catch (err) {
            setError(err.message || 'Payment processing failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
                <p className="font-bold">Demo Mode</p>
                <p>Customer information is pre-filled with demo data.</p>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-bold mb-2">Payment Details</h3>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientName">
                            Business Name
                        </label>
                        <input
                            type="text"
                            id="recipientName"
                            name="recipientName"
                            className="w-full px-3 py-2 border rounded-md"
                            value={formData.recipientName}
                            onChange={handleChange}
                            readOnly={!!location.state?.paymentData}
                            placeholder="Business Name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientEmail">
                            Business Email
                        </label>
                        <input
                            type="email"
                            id="recipientEmail"
                            name="recipientEmail"
                            className="w-full px-3 py-2 border rounded-md"
                            value={formData.recipientEmail}
                            onChange={handleChange}
                            readOnly={!!location.state?.paymentData}
                            placeholder="business@example.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                            Amount ($)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            step="0.01"
                            min="0.01"
                            className="w-full px-3 py-2 border rounded-md"
                            value={formData.amount}
                            onChange={handleChange}
                            readOnly={!!location.state?.paymentData}
                            placeholder="0.00"
                        />
                    </div>

                    {paymentId && (
                        <div className="text-xs text-gray-500 mt-2">
                            Payment ID: {paymentId}
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <h3 className="font-bold mb-2">Your Information</h3>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            className="w-full px-3 py-2 border rounded-md"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="Your Full Name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerEmail">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="customerEmail"
                            name="customerEmail"
                            className="w-full px-3 py-2 border rounded-md"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerAccountNumber">
                            Account Number
                        </label>
                        <input
                            type="text"
                            id="customerAccountNumber"
                            name="customerAccountNumber"
                            className="w-full px-3 py-2 border rounded-md"
                            value={formData.customerAccountNumber}
                            onChange={handleChange}
                            placeholder="Your Account Number"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded focus:outline-none"
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Complete Payment'}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;