import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientPaymentService } from '../../services/clientPaymentService';
import jsQR from 'jsqr';

const QRScanner = () => {
    const [scanning, setScanning] = useState(true);
    const [error, setError] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const scanInterval = useRef(null);

    useEffect(() => {
        let stream = null;

        const startCamera = async () => {
            try {
                // Access user's camera
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                scanInterval.current = setInterval(() => {
                    scanQRCode();
                }, 500);

            } catch (err) {
                console.error('Error accessing camera:', err);
                setError('Unable to access camera. Please make sure you have granted camera permissions.');
                setScanning(false);
            }
        };

        if (scanning) {
            startCamera();
        }

        // Clean up function
        return () => {
            if (scanInterval.current) {
                clearInterval(scanInterval.current);
            }

            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [scanning]);

    const scanQRCode = () => {
        if (!videoRef.current || !canvasRef.current || !scanning) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Make sure video is playing
        if (video.readyState !== video.HAVE_ENOUGH_DATA) return;

        // Set canvas dimensions to match video
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data for QR code processing
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Use jsQR to detect QR codes
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "attemptBoth",
        });

        if (code) {
            console.log("QR Code detected:", code.data);
            handleQRCodeDetected(code.data);
        }
    };

    const handleQRCodeDetected = (qrData) => {
        // Stop scanning
        setScanning(false);
        if (scanInterval.current) {
            clearInterval(scanInterval.current);
        }

        try {
            // Validate QR code data
            const paymentData = clientPaymentService.validateQRData(qrData);

            // Navigate to payment form with QR data
            navigate('/client/payment-form', { state: { paymentData } });

        } catch (err) {
            setError(err.message || 'Invalid QR code');
            // Resume scanning after error
            setTimeout(() => {
                setError('');
                setScanning(true);
            }, 2000);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square bg-black rounded-lg overflow-hidden">
                {scanning && (
                    <>
                        <video
                            ref={videoRef}
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            playsInline
                            muted
                        />
                        <div className="absolute inset-0 border-2 border-white opacity-50 m-8 rounded"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3/4 h-px bg-red-500 animate-pulse"></div>
                        </div>
                    </>
                )}

                <canvas
                    ref={canvasRef}
                    className="hidden" // Hidden canvas for processing
                />
            </div>

            {error && (
                <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Position the QR code within the frame to scan
                </p>
                <button
                    onClick={() => setScanning(!scanning)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    {scanning ? 'Pause Camera' : 'Resume Camera'}
                </button>
            </div>

            {/* Manual entry option */}
            <div className="mt-8 text-center">
                <p className="text-gray-500">Having trouble scanning?</p>
                <button
                    onClick={() => navigate('/client/payment-form')}
                    className="mt-2 text-blue-500 underline"
                >
                    Enter payment details manually
                </button>
            </div>
        </div>
    );
};

export default QRScanner;