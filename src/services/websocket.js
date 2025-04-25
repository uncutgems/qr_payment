// src/services/websocket.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Azure_URL } from "./envConstant";

export const connectToPaymentNotifications = (billId, onPaymentReceived) => {
    let stompClient = null;

    // Create a disconnect function we can return immediately
    const disconnect = () => {
        if (stompClient && stompClient.connected) {
            stompClient.deactivate();
            console.log('Disconnected from WebSocket');
        }
    };

    // Handle the connection asynchronously
    const connect = async () => {
        try {
            // Resolve billId if it's a Promise
            const resolvedBillId = billId instanceof Promise ? await billId : billId;
            console.log('Connecting to WebSocket with bill ID:', resolvedBillId);

            const socket = new SockJS(`${Azure_URL}/ws`);

            // Create a new STOMP client instance
            stompClient = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                debug: (str) => {
                    console.log(str);
                }
            });

            // Define connect callback
            stompClient.onConnect = () => {
                console.log('Connected to WebSocket');
                console.log(`Subscribing to /topic/payments/${resolvedBillId}`);

                stompClient.subscribe(`/topic/payments/${resolvedBillId}`, (message) => {
                    console.log('Received message:', message);
                    try {
                        const paymentResponse = JSON.parse(message.body);
                        onPaymentReceived(paymentResponse);
                    } catch (error) {
                        console.error('Error parsing message:', error);
                    }
                });
            };

            // Define error callback
            stompClient.onStompError = (error) => {
                console.error('WebSocket connection error:', error);
            };

            // Activate client
            stompClient.activate();
        } catch (error) {
            console.error('Error setting up WebSocket connection:', error);
        }
    };

    // Start the connection process
    connect();

    // Return the disconnect function immediately
    return {
        disconnect
    };
};