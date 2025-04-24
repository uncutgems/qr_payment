// src/services/paymentService.js
import {Local_URL} from "./envConstant";

export const paymentService = {
    // Request a unique payment ID from the server
    requestPaymentId: async (amount, email, businessName) => {
        try {
            // In a real implementation, this would be an API call to your backend
            const response = await fetch(`${Local_URL}/api/bills`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    businessOwnerEmail: email,
                    businessName
                }),
            });

            if (!response.ok) throw new Error('Failed to get payment ID');

            const data = await response.json();
            return data.paymentId;
        } catch (error) {
            console.error('Error requesting payment ID:', error);
            throw error;
        }
    },

    // Cancel a payment request
    cancelPayment: async (paymentId) => {
        try {
            const response = await fetch(`https://api.yourpaymentservice.com/cancel-payment/${paymentId}`, {
                method: 'POST',
            });

            if (!response.ok) throw new Error('Failed to cancel payment');

            return await response.json();
        } catch (error) {
            console.error('Error canceling payment:', error);
            throw error;
        }
    },

    // Check payment status (as fallback if SSE doesn't work)
    checkPaymentStatus: async (paymentId) => {
        try {
            const response = await fetch(`https://api.yourpaymentservice.com/payment-status/${paymentId}`);

            if (!response.ok) throw new Error('Failed to check payment status');

            return await response.json();
        } catch (error) {
            console.error('Error checking payment status:', error);
            throw error;
        }
    },

    // Create SSE connection for real-time payment updates
    subscribeToPaymentUpdates: (paymentId, onPaymentConfirmed, onPaymentCancelled, onError) => {
        try {
            const eventSource = new EventSource(`https://api.yourpaymentservice.com/payment-events/${paymentId}`);

            // Handle payment confirmation
            eventSource.addEventListener('payment_confirmed', (event) => {
                const paymentData = JSON.parse(event.data);
                if (onPaymentConfirmed) onPaymentConfirmed(paymentData);
            });

            // Handle payment cancellation
            eventSource.addEventListener('payment_cancelled', (event) => {
                if (onPaymentCancelled) onPaymentCancelled();
            });

            // Handle errors
            eventSource.onerror = (error) => {
                console.error('SSE Error:', error);
                if (onError) onError(error);
            };

            return eventSource;
        } catch (error) {
            console.error('Error setting up SSE connection:', error);
            throw error;
        }
    }
};