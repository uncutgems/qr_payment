import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { generatePaymentQR } from '../services/api';

const BusinessOwnerPage = () => {
    const [businessInfo, setBusinessInfo] = useState({
        businessName: '',
        businessEmail: '',
        amount: ''
    });

    const [paymentInfo, setPaymentInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusinessInfo({
            ...businessInfo,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // For demo purposes without backend
            // In a real app, this would call the API
            // const data = await generatePaymentQR(businessInfo.businessEmail, parseFloat(businessInfo.amount));

            // Simulate API response
            const mockData = {
                paymentId: 'PID-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
                businessEmail: businessInfo.businessEmail,
                amount: parseFloat(businessInfo.amount),
                status: 'PENDING',
                createdAt: new Date().toISOString()
            };

            // Create QR data with all needed information
            const qrData = JSON.stringify({
                transactionId: mockData.paymentId,
                recipientName: businessInfo.businessName,
                recipientEmail: businessInfo.businessEmail,
                amount: businessInfo.amount
            });

            setPaymentInfo({
                ...mockData,
                qrData,
                businessName: businessInfo.businessName
            });
        } catch (err) {
            setError(err.message || 'Failed to generate QR code');
        } finally {
            setLoading(false);
        }
    };

    const downloadQRCode = () => {
        const canvas = document.getElementById('qr-code');
        if (canvas) {
            const pngUrl = canvas
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');

            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `payment-qr-${paymentInfo.paymentId}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    return (
        <div className="business-page">
            <h2>Business QR Payment Generator</h2>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="businessName">Business Name</label>
                        <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            className="form-control"
                            value={businessInfo.businessName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="businessEmail">Business Email</label>
                        <input
                            type="email"
                            id="businessEmail"
                            name="businessEmail"
                            className="form-control"
                            value={businessInfo.businessEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount">Amount ($)</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            className="form-control"
                            value={businessInfo.amount}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn"
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate Payment QR Code'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                {paymentInfo && (
                    <div className="qr-container">
                        <h3>Payment QR Code Generated</h3>

                        <div className="qr-code">
                            <QRCodeSVG
                                id="qr-code"
                                value={paymentInfo.qrData}
                                size={250}
                                level="H"
                                includeMargin={true}
                            />
                        </div>

                        <button className="btn" onClick={downloadQRCode}>
                            Download QR Code
                        </button>

                        <div className="payment-details">
                            <p><strong>Business:</strong> {paymentInfo.businessName}</p>
                            <p><strong>Payment ID:</strong> {paymentInfo.paymentId}</p>
                            <p><strong>Amount:</strong> ${businessInfo.amount}</p>
                            <p><strong>Created:</strong> {new Date(paymentInfo.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessOwnerPage;