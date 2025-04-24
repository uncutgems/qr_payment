import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../../context/PaymentContext';
import { qrCodeService } from '../../services/qrCodeService';
import { connectToPaymentNotifications } from '../../services/websocket';
import QRCode from 'qrcode.react';

const GeneratedQRCode = () => {
    const { currentPayment, updatePaymentStatus } = usePayment();
    const [qrCodeData, setQrCodeData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Ensure we have payment data
        if (!currentPayment) {
            navigate('/business/create-payment');
            return;
        }

        // Generate QR code data
        const data = qrCodeService.generateQRCodeData(
            currentPayment.paymentId,
            currentPayment.amount,
            currentPayment.email,
            currentPayment.businessName
        );
        setQrCodeData(data);

        // Set up a WebSocket connection for payment notifications
        const websocketConnection = connectToPaymentNotifications(
            currentPayment.paymentId,
            (paymentResponse) => {
                console.log('Payment response received:', paymentResponse);
                if (paymentResponse.status === 'success') {
                    updatePaymentStatus('success');
                    navigate('/business/payment-success');
                }
            }
        );

        // Clean up when unmounting
        return () => {
            if (websocketConnection) {
                websocketConnection.disconnect();
            }
        };
    }, [currentPayment, navigate, updatePaymentStatus]);

    const handleCancel = async () => {
        try {
            if (!currentPayment) return;

            // For demo: Just show a brief loading state before navigating
            await new Promise(resolve => setTimeout(resolve, 500));

            updatePaymentStatus('cancelled');
            navigate('/business/create-payment');
        } catch (error) {
            console.error('Error cancelling payment:', error);
        }
    };

    if (!currentPayment) {
        return <div className="text-center p-8">No active payment found.</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 text-left" role="alert">
                <p className="font-bold">Demo Mode</p>
                <p>In a real app, the customer would scan this QR code with their device.</p>
            </div>

            <h2 className="text-xl font-bold mb-4">Payment QR Code</h2>

            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-center mb-4">
                    {qrCodeData && (
                        <QRCode
                            value={qrCodeData}
                            size={200}
                            level="H"
                            includeMargin={true}
                            renderAs="svg"
                        />
                    )}
                </div>

                <p className="text-sm text-gray-600 mb-2">
                    Show this QR code to your customer for payment
                </p>
                <p className="text-xs text-green-600">
                    Connected to payment service. Waiting for payment...
                </p>
            </div>

            <div className="mb-6 text-left">
                <h3 className="font-bold mb-2">Payment Details:</h3>
                <p><span className="font-semibold">Amount:</span> ${currentPayment.amount.toFixed(2)}</p>
                <p><span className="font-semibold">Business:</span> {currentPayment.businessName}</p>
                <p><span className="font-semibold">Email:</span> {currentPayment.email}</p>
                <p><span className="font-semibold">Payment ID:</span> {currentPayment.paymentId}</p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
                <button
                    onClick={handleCancel}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                    Cancel Payment
                </button>
            </div>
        </div>
    );
};

export default GeneratedQRCode;