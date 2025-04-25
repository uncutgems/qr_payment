import {Azure_URL} from "./envConstant";

export const clientPaymentService = {
    // Process a payment from QR code data
    processPayment: async (paymentData, customerInfo) => {
        try {
            const response = await fetch(`${Azure_URL}/api/payments}`, {
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
                    accountNumber: customerInfo.accountNumber,
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
            const parsedData = JSON.parse(qrData);

            // Validate required fields - using the field names from qrCodeService.js
            if (!parsedData.transactionId ||
                !parsedData.recipientName ||
                !parsedData.recipientEmail ||
                !parsedData.amount) {
                throw new Error('Invalid QR code: missing required fields');
            }

            // Optional validation for amount format
            if (isNaN(parseFloat(parsedData.amount))) {
                throw new Error('Invalid amount format in QR code');
            }

            // Return the validated data with consistent field names
            return {
                transactionId: parsedData.transactionId,
                recipientName: parsedData.recipientName,
                recipientEmail: parsedData.recipientEmail,
                amount: parsedData.amount,
                timestamp: parsedData.timestamp || new Date().toISOString()
            };
        } catch (error) {
            console.error('QR validation error:', error);
            throw new Error('Invalid QR code format');
        }
    }
};
