import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} QR Pay. All rights reserved.</p>
                <p className="text-gray-400 mt-2 text-sm">Secure payments made simple.</p>
            </div>
        </footer>
    );
};

export default Footer;