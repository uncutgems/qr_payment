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
    // In clientPaymentService.js
    validateQRData: (qrData) => {
        try {
            console.log("Print QR Data:", qrData);
            const parsedData = typeof qrData === 'string'
                ? JSON.parse(qrData)
                : qrData;

            // Log for debugging
            console.log("Validating QR data:", parsedData);

            // Ensure fields are properly extracted as primitives
            return {
                paymentId: String(parsedData.transactionId || ''),
                recipientName: String(parsedData.recipientName || ''),
                recipientEmail: String(parsedData.recipientEmail || ''),
                customerEmail: String('customer@demo.com'),
                customerName: String('Demo Customer'),
                amount: String(parsedData.amount || ''),
                timestamp: parsedData.timestamp || new Date().toISOString()
            };
        } catch (error) {
            console.error("QR data validation error:", error);
            throw new Error('Invalid QR code format');
        }
    }
};
