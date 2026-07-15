import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function WaitingApproval({ status }) {
    const isPending = status === 'pending';

    return (
        <div className="min-h-screen bg-[#001216] flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#05c46b]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#00d8d6]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl relative z-10">
                {/* Logo */}
                <div className="mb-8 flex justify-center">
                    <img src="/images/Logo/logo-Morocco-now.png" alt="Morocco Now" className="h-16 object-contain" />
                </div>

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    {isPending ? (
                        <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/30">
                            <svg className="w-8 h-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/30">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-4">
                    {isPending ? "Account pending approval" : "Registration Rejected"}
                </h2>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-8">
                    {isPending 
                        ? "Your beneficiary account (investor or exporter) has been created successfully. An administrator is currently reviewing your request. You'll get full access once approved."
                        : "Your registration request for the beneficiary space has been rejected by our moderation team."
                    }
                </p>

                {/* Actions */}
                <div className="space-y-3">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
                    >
                        Log out
                    </Link>

                    <Link
                        href="/"
                        className="block w-full py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all duration-300 border border-white/5 text-center"
                    >
                        Back to public home
                    </Link>
                </div>
            </div>

            {/* Footer info */}
            <div className="absolute bottom-6 text-gray-500 text-xs">
                © {new Date().getFullYear()}Morocco Now. All rights reserved.
            </div>
        </div>
    );
}
