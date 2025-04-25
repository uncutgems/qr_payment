export const qrCodeService = {
    // Generate QR code data for a payment
    generateQRCodeData: (paymentId, amount, email, businessName) => {
        // Create a JSON object with payment details matching client expectations
        const paymentData = {
            transactionId: paymentId,
            recipientName: businessName,
            recipientEmail: email,
            amount: amount.toString(), // Convert to string to match client expectation
            timestamp: new Date().toISOString()
        };

        // Convert to string and return
        return JSON.stringify(paymentData);
    }
};