import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {Local_URL} from "./envConstant";


export const connectToPaymentNotifications = (billId, onPaymentReceived) => {
    const socket = new SockJS(`${Local_URL}/ws`);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        console.log('Connected to WebSocket');
        stompClient.subscribe(`/topic/payments/${billId}`, (message) => {
            const paymentResponse = JSON.parse(message.body);
            onPaymentReceived(paymentResponse);
        });
    }, (error) => {
        console.error('WebSocket connection error:', error);
    });

    return {
        disconnect: () => {
            if (stompClient !== null) {
                stompClient.disconnect();
                console.log('Disconnected from WebSocket');
            }
        }
    };
};
