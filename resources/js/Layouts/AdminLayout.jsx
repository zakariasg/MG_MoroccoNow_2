import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navSections = [
    {
        title: null,
        items: [
            {
                name: 'Dashboard',
                routeName: 'admin.dashboard',
                icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                ),
            },
            {
                name: 'Registration requests',
                routeName: 'admin.approvals.index',
                icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                ),
            },
        ],
    },
    {
        title: 'Public Content Management',
        items: [
            {
                name: 'Public Content Management',
                routeName: 'admin.content.index',
                icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2z" />
                    </svg>
                ),
            },
            {
                name: 'Homepage Content',
                routeName: 'admin.home-content.edit',
                icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                ),
            },
        ],
    },
    {
        title: 'Beneficiary Space Content',
        items: [
            {
                name: 'Exporter Content Management',
                routeName: 'admin.exporter-content.index',
                icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                ),
            },
            {
                name: 'Investor Content Management',
                routeName: 'admin.investor-content.index',
                icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ),
            },
        ],
    },
];

function SidebarContent({ onNavigate }) {
    const user = usePage().props.auth.user;

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center h-16 px-6 border-b border-gray-100">
                <Link href="/" onClick={onNavigate}>
                    <ApplicationLogo className="h-8 w-auto" />
                </Link>
            </div>

            <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
                {navSections.map((section, sIndex) => (
                    <div key={sIndex}>
                        {section.title && (
                            <p className="px-4 mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                {section.title}
                            </p>
                        )}
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const active =
                                    route().current(item.routeName) || route().current(item.routeName + '.*');
                                return (
                                    <Link
                                        key={item.routeName}
                                        href={route(item.routeName)}
                                        onClick={onNavigate}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                                            active
                                                ? 'bg-teal-700 text-white'
                                                : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                                        }`}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="px-3 py-4 border-t border-gray-100 space-y-2">
                <Link
                    href={route('profile.edit')}
                    onClick={onNavigate}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.name}
                </Link>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Log Out
                </Link>
            </div>
        </div>
    );
}

export default function AdminLayout({ header, children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 lg:flex">
            {/* Sidebar - desktop */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-white border-r border-gray-100">
                <SidebarContent />
            </aside>

            {/* Sidebar - mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/40"
                        onClick={() => setMobileOpen(false)}
                    />
                    <aside className="relative flex flex-col w-64 h-full bg-white shadow-xl">
                        <SidebarContent onNavigate={() => setMobileOpen(false)} />
                    </aside>
                </div>
            )}

            <div className="flex-1 min-w-0">
                <nav className="border-b border-gray-100 bg-white sticky top-0 z-30">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <button
                                onClick={() => setMobileOpen(true)}
                                className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div />
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}
