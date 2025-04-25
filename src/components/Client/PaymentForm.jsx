import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clientPaymentService } from '../../services/clientPaymentService';

const PaymentForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Initialize form data with empty values
    const [formData, setFormData] = useState({
        transactionId: '',
        recipientName: '',
        recipientEmail: '',
        amount: '',
        payerName: 'Customer Demo',
        payerEmail: 'customer@demo.com'
    });

    // Load data from QR code if available (passed through navigation state)
    useEffect(() => {
        if (location.state?.paymentData) {
            const { paymentData } = location.state;

            // Debugging: Log the incoming payment data to inspect its structure
            console.log("Received payment data:", paymentData);

            // Safely extract values with proper type handling
            setFormData(prevData => ({
                ...prevData,
                transactionId: typeof paymentData.transactionId === 'object'
                    ? JSON.stringify(paymentData.transactionId) // Convert object to string if needed
                    : String(paymentData.transactionId || ''),  // Otherwise ensure it's a string
                recipientName: String(paymentData.recipientName || ''),
                recipientEmail: String(paymentData.recipientEmail || ''),
                amount: String(paymentData.amount || '')
            }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const processPayment = async () => {
        setIsSubmitting(true);
        setError('');

        try {
            // Log the data to be sent for payment processing
            console.log("Processing payment with data:", formData);

            // Prepare payment data for clientPaymentService
            const paymentData = {
                transactionId: formData.transactionId,
                amount: formData.amount,
                recipientName: formData.recipientName,
                recipientEmail: formData.recipientEmail,
                payerName: formData.payerName,
                payerEmail: formData.payerEmail
            };

            // Process payment using clientPaymentService
            const result = await clientPaymentService.processPayment(paymentData);

            // Handle successful payment
            setSuccess(true);

            // Redirect to success page after delay
            setTimeout(() => {
                navigate('/client/payment-success', {
                    state: {
                        paymentDetails: {
                            ...paymentData,
                            confirmationId: result?.confirmationId || result?.transactionId || formData.transactionId,
                            timestamp: new Date().toISOString()
                        }
                    }
                });
            }, 1500);

        } catch (err) {
            console.error("Payment processing error:", err);
            setError(err.message || 'Failed to process payment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        processPayment();
    };

    // Validate if the form is ready to submit
    const isFormValid =
        formData.transactionId &&
        formData.recipientName &&
        formData.recipientEmail &&
        formData.amount &&
        formData.payerName &&
        formData.payerEmail;


    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            {success ? (
                <div className="text-center">
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                        <h3 className="font-bold text-lg">Payment Successful!</h3>
                        <p>Your payment has been processed.</p>
                        <p>Redirecting to confirmation page...</p>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-6 text-center">Complete Your Payment</h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Payment Details Section */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold mb-3">Payment Information</h3>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Transaction ID
                                </label>
                                <input
                                    type="text"
                                    name="transactionId"
                                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                    value={formData.transactionId}
                                    readOnly
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Recipient
                                </label>
                                <input
                                    type="text"
                                    name="recipientName"
                                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                    value={formData.recipientName}
                                    readOnly
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Recipient Email
                                </label>
                                <input
                                    type="email"
                                    name="recipientEmail"
                                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                    value={formData.recipientEmail}
                                    readOnly
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Amount ($)
                                </label>
                                <input
                                    type="text"
                                    name="amount"
                                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                                    value={formData.amount}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Payer Information Section */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">Your Information</h3>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payerName">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="payerName"
                                    name="payerName"
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.payerName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payerEmail">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="payerEmail"
                                    name="payerEmail"
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.payerEmail}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full font-bold py-2 px-4 rounded focus:outline-none ${
                                isFormValid
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!isFormValid || isSubmitting}
                        >
                            {isSubmitting ? 'Processing Payment...' : 'Pay Now'}
                        </button>
                    </form>
                </>
            )}

            {/* Optional: Back to scanner button */}
            {!success && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/client/scan')}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Back to Scanner
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;