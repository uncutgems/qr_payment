import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PaymentProvider } from './context/PaymentContext';

// Landing Page
import LandingPage from './pages/LandingPage';

// Business Owner Pages
import BusinessOwnerDashboard from './components/BusinessOwner/BusinessOwnerDashboard';
import CreatePaymentPage from './pages/BusinessOwnerPages/CreatePaymentPage';
import QRCodeDisplayPage from './pages/BusinessOwnerPages/QRCodeDisplayPage';
import PaymentSuccessPage from './pages/BusinessOwnerPages/PaymentSuccessPage';

// Client Pages
import ClientDashboard from './components/Client/ClientDashboard';
import ScanQRPage from './pages/ClientPages/ScanQRPage';
import PaymentFormPage from './pages/ClientPages/PaymentFormPage';
import ClientSuccessPage from './pages/ClientPages/ClientSuccessPage';

const App = () => {
    return (
        <PaymentProvider>
            <Router>
                <Routes>
                    {/* Landing page */}
                    <Route path="/" element={<LandingPage />} />

                    {/* Business Owner Routes */}
                    <Route path="/business" element={<BusinessOwnerDashboard />} />
                    <Route path="/business/create-payment" element={<CreatePaymentPage />} />
                    <Route path="/business/qr-code" element={<QRCodeDisplayPage />} />
                    <Route path="/business/payment-success" element={<PaymentSuccessPage />} />

                    {/* Client Routes */}
                    <Route path="/client" element={<ClientDashboard />} />
                    <Route path="/client/scan-qr" element={<ScanQRPage />} />
                    <Route path="/client/payment-form" element={<PaymentFormPage />} />
                    <Route path="/client/payment-success" element={<ClientSuccessPage />} />

                    {/* 404 route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </PaymentProvider>
    );
};

export default App;