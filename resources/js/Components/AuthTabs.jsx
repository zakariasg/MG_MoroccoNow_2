import { Link } from '@inertiajs/react';

export default function AuthTabs({ active }) {
    const tabClass = (name) =>
        `flex-1 text-center pb-3 text-base font-semibold transition-colors ${
            active === name
                ? 'text-gray-900 border-b-2 border-teal-700'
                : 'text-gray-400 border-b-2 border-transparent hover:text-gray-600'
        }`;

    return (
        <div className="flex mb-8">
            <Link href={route('login')} className={tabClass('login')}>
                Login
            </Link>
            <Link href={route('register')} className={tabClass('register')}>
                Create account
            </Link>
        </div>
    );
}