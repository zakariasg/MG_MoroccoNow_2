import { Link } from '@inertiajs/react';

export default function AuthSplitLayout({ children }) {
    return (
        <div className="min-h-screen flex">
            {/* Left: full-height background image (hidden on small screens) */}
            <div
                className="hidden lg:block lg:w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/Login/bg.jpg')" }}
            />

            {/* Right: logo + form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12 sm:px-10">
                <div className="w-full max-w-sm">
                    <div className="flex justify-center mb-8">
                        <Link href="/">
                            <img
                                src="/images/Logo/logo-Morocco-Now-black.png"
                                alt="Morocco Now"
                                className="h-16 w-auto"
                            />
                        </Link>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}