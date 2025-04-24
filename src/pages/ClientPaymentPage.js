import React, { useState } from 'react';
import { submitPayment } from '../services/api';

const ClientPaymentPage = () => {
    const [formData, setFormData] = useState({
        transactionId: '',
        recipientName: '',
        recipientEmail: '',
        amount: '',
        payer: {
            name: '',
            email: ''
        }
    });

    const [showScanner, setShowScanner] = useState(false);
    const [scanSuccess, setScanSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            // Handle nested properties (e.g., payer.name)
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    // Simulate QR scanning
    const scanQRCode = () => {
        // In a real app, this would use the device camera to scan a QR code
        // For this demo, we'll simulate scanning with predefined data
        const simulatedQRData = JSON.stringify({
            transactionId: 'TXN-' + Math.floor(Math.random() * 1000000),
            recipientName: 'Acme Corporation',
            recipientEmail: 'payments@acmecorp.com',
            amount: '1250.00'
        });

        setTimeout(() => {
            setScanSuccess(true);
            setShowScanner(false);

            try {
                const parsedData = JSON.parse(simulatedQRData);
                setFormData({
                    ...formData,
                    ...parsedData
                });
            } catch (error) {
                setError("Invalid QR code format!");
            }
        }, 2000);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            // Format the data for submission
            const paymentSubmission = {
                paymentId: formData.transactionId,
                payerName: formData.payer.name,
                payerEmail: formData.payer.email,
                amount: parseFloat(formData.amount),
                recipientEmail: formData.recipientEmail
            };

            // For demo purposes without backend
            // In a real app, this would call the API
            // await submitPayment(paymentSubmission);

            // Simulate successful API response
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSubmitSuccess(true);

            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    transactionId: '',
                    recipientName: '',
                    recipientEmail: '',
                    amount: '',
                    payer: {
                        name: '',
                        email: ''
                    }
                });
                setSubmitSuccess(false);
                setScanSuccess(false);
            }, 5000);
        } catch (err) {
            setError(err.message || 'Failed to submit payment');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="client-page">
            <h2>Client Payment Form</h2>

            {/* QR Scanner button */}
            <button
                onClick={() => {
                    setShowScanner(true);
                    setScanSuccess(false);
                    scanQRCode();
                }}
                className="btn"
                style={{ marginBottom: '20px' }}
            >
                Scan QR Code to Autofill
            </button>

            {/* Simulated QR Scanner */}
            {showScanner && (
                <div className="card">
                    <div style={{ backgroundColor: '#f5f5f5', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    border: '4px solid #3498db',
                                    borderTopColor: 'transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                    margin: '0 auto 15px'
                                }}
                            ></div>
                            <p>Scanning QR Code...</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Success message for QR scan */}
            {scanSuccess && !showScanner && (
                <div className="success-message">
                    QR Code scanned successfully! Form fields have been populated.
                </div>
            )}

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="transactionId">Transaction ID</label>
                        <input
                            type="text"
                            id="transactionId"
                            name="transactionId"
                            className="form-control"
                            value={formData.transactionId}
                            onChange={handleChange}
                            required
                            readOnly={scanSuccess}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="recipientName">Recipient</label>
                        <input
                            type="text"
                            id="recipientName"
                            name="recipientName"
                            className="form-control"
                            value={formData.recipientName}
                            onChange={handleChange}
                            placeholder="Person or Business Name"
                            required
                            readOnly={scanSuccess}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="recipientEmail">Recipient Email</label>
                        <input
                            type="email"
                            id="recipientEmail"
                            name="recipientEmail"
                            className="form-control"
                            value={formData.recipientEmail}
                            onChange={handleChange}
                            required
                            readOnly={scanSuccess}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount">Amount ($)</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            className="form-control"
                            value={formData.amount}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            required
                            readOnly={scanSuccess}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="payer.name">Your Name</label>
                        <input
                            type="text"
                            id="payer.name"
                            name="payer.name"
                            className="form-control"
                            value={formData.payer.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="payer.email">Your Email</label>
                        <input
                            type="email"
                            id="payer.email"
                            name="payer.email"
                            className="form-control"
                            value={formData.payer.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn"
                        disabled={submitting}
                    >
                        {submitting ? 'Processing...' : 'Submit Payment'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                {submitSuccess && (
                    <div className="success-message">
                        Payment submitted successfully! Thank you for your payment.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientPaymentPage;