export const clientPaymentService = {
    // Process a payment from QR code data
    processPayment: async (paymentData, customerInfo) => {
        try {
            const response = await fetch('https://api.yourpaymentservice.com/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentId: paymentData.paymentId,
                    amount: paymentData.amount,
                    recipientEmail: paymentData.businessOwnerEmail,
                    recipientName: paymentData.businessName,
                    customerName: customerInfo.name,
                    customerEmail: customerInfo.email,
                    customerAccountNumber: customerInfo.accountNumber,
                    timestamp: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Payment processing failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Error processing payment:', error);
            throw error;
        }
    },

    // Validate QR code data
    validateQRData: (qrData) => {
        try {
            // Parse QR data
            const data = JSON.parse(qrData);

            // Check required fields
            if (!data.paymentId || !data.amount || !data.businessOwnerEmail || !data.businessName) {
                throw new Error('Invalid QR code: missing required fields');
            }

            return data;
        } catch (error) {
            console.error('QR validation error:', error);
            throw new Error('Invalid QR code format');
        }
    }
};
