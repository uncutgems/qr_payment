import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">QR Pay</Link>

                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/business" className="hover:text-blue-200">Business</Link>
                        </li>
                        <li>
                            <Link to="/client" className="hover:text-blue-200">Client</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
