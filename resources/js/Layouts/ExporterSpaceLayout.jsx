import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const tabs = [
    { label: 'Profils marchés', routeName: 'exporter.marches' },
    { label: 'Profils filiéres', routeName: 'exporter.filieres' },
    { label: 'Veille reglementaire', routeName: 'exporter.veille' },
    { label: 'Evénements', routeName: 'exporter.evenements' },
];

export default function ExporterSpaceLayout({ children }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        if (flash?.success) setBanner({ type: 'success', text: flash.success });
        else if (flash?.error) setBanner({ type: 'error', text: flash.error });
        else setBanner(null);
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top header */}
            <header className="bg-[#001216]">
                <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                    <Link href="/">
                        <img src="/images/Logo/logo-Morocco-Now.png" alt="Morocco Now" className="h-10" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-white/80 text-sm hidden sm:inline">{user?.name}</span>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition cursor-pointer"
                        >
                            Se déconnecter
                        </Link>
                    </div>
                </div>
            </header>

            {/* Tab strip */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="mx-auto max-w-7xl px-6">
                    <nav className="flex gap-8 overflow-x-auto">
                        {tabs.map((tab) => {
                            const active = route().current(tab.routeName);
                            return (
                                <Link
                                    key={tab.routeName}
                                    href={route(tab.routeName)}
                                    className={`whitespace-nowrap py-4 text-sm font-semibold border-b-2 transition-colors ${
                                        active
                                            ? 'border-emerald-500 text-emerald-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {banner && (
                <div
                    className={`mx-auto max-w-7xl mt-6 px-6`}
                >
                    <div
                        className={`rounded-xl px-5 py-3 text-sm font-medium ${
                            banner.type === 'success'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                    >
                        {banner.text}
                    </div>
                </div>
            )}

            <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
        </div>
    );
}
