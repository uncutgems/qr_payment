export const qrCodeService = {
    // Generate QR code data for a payment
    generateQRCodeData: (paymentId, amount, email, businessName) => {
        // Create a JSON object with all payment details
        const paymentData = {
            paymentId,
            amount,
            businessOwnerEmail: email,
            businessName,
            timestamp: new Date().toISOString()
        };

        // Convert to string and return (in real implementation, you might want to encrypt this)
        return JSON.stringify(paymentData);
    }
};