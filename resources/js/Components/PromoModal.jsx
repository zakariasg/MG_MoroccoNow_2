// resources/js/Components/PromoModal.jsx
import { useState } from 'react';

export default function PromoModal() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="relative w-full max-w-2xl bg-emerald-700 rounded-lg overflow-hidden">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-white text-2xl"
                >
                    &times;
                </button>
                <div className="p-10">
                    <img src="/assets/images/logo/logo-mark.png" className="w-24 mb-6" alt="" />
                    <h2 className="text-white text-4xl font-bold mb-4">The Directory</h2>
                    <p className="text-white text-lg mb-8">
                        Make your company known to investors supported by Amdie
                    </p>
                </div>
                <img
                    src="/assets/images/promo-field.jpg"
                    className="w-full h-64 object-cover"
                    alt=""
                />
                <div className="p-6">
                    <img src="/assets/images/amdie-logo.png" className="h-8" alt="AMDIE" />
                </div>
            </div>
        </div>
    );
}