import axios from 'axios';

const Local_URL = 'http://localhost:8080/api';

export const generatePaymentQR = async (businessEmail, amount) => {
    try {
        const response = await axios.post(`${Local_URL}/payments/generate`, {
            businessEmail,
            amount
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to generate payment QR code' };
    }
};

export const submitPayment = async (paymentData) => {
    try {
        const response = await axios.post(`${Local_URL}/payments/submit`, paymentData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to submit payment' };
    }
};