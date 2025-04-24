import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
            <header className="bg-blue-600 text-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-center">QR Pay Demo</h1>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
                <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-8 text-center">
                        <h2 className="text-3xl font-bold mb-6">Welcome to QR Pay</h2>
                        <p className="text-gray-600 mb-8">
                            A simple and secure way to make and receive payments using QR codes.
                            Choose your role to get started:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                                <div className="text-blue-500 mb-4">
                                    <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Customer</h3>
                                <p className="text-gray-600 mb-4">
                                    Scan QR codes and make payments quickly and securely
                                </p>
                                <Link
                                    to="/client"
                                    className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Continue as Customer
                                </Link>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                                <div className="text-blue-500 mb-4">
                                    <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1.586l-1.707-1.707A1 1 0 0012 2h-4a1 1 0 00-.707.293L5.586 4H4zm10 10a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Business Owner</h3>
                                <p className="text-gray-600 mb-4">
                                    Create QR codes for payments and track transactions
                                </p>
                                <Link
                                    to="/business"
                                    className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Continue as Business
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
                        <p>This is a demo application. No real payments will be processed.</p>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} QR Pay Demo</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;