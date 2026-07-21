import { Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import Footer from '@/Components/Footer';

function ChevronIcon({ open }) {
    return (
        <svg
            className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

function NavDropdown({ label, items }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 text-white uppercase text-base font-semibold cursor-pointer"
            >
                <span>{label}</span>
                <ChevronIcon open={open} />
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#2a2a2a] rounded-lg shadow-lg py-2 z-50">
                    {items.map((item, i) => (
                        <Link key={i} href={item.href || '#'} className="block px-5 py-2.5 text-white text-sm hover:bg-white/10">
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

function MobileNavItem({ label, items }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full text-left cursor-pointer"
            >
                <span>{label}</span>
                <ChevronIcon open={open} />
            </button>

            {open && (
                <div className="pl-4 mt-2 flex flex-col gap-2 normal-case font-normal">
                    {items.map((item, i) => (
                        <Link key={i} href={item.href || '#'} className="text-sm text-white/80">
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function GuestLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const investorItems = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }];
    const exporterItems = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }];
    const whyMoroccoItems = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }];
    const resourcesItems = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }];
    const newsItems = [
        { label: 'Latest News', href: route('news.index') },
        { label: 'Press Releases', href: route('news.index') },
        { label: 'Announcements', href: route('news.index') },
    ];

    return (
        <div className="min-h-screen bg-white">
            <nav className="bg-[#001216] px-8 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="ml-16">
                        <img src="/images/Logo/logo-Morocco-now.png" alt="Morocco Now" className="h-14" />
                    </Link>

                    <div className="hidden md:flex items-center gap-10 ml-8">
                        <NavDropdown label="Investor" items={investorItems} />
                        <NavDropdown label="Exporter" items={exporterItems} />
                        <NavDropdown label="Why Morocco" items={whyMoroccoItems} />
                        <NavDropdown label="News" items={newsItems} />
                        <Link href={route('events.index')} className="text-white uppercase text-base font-semibold cursor-pointer">
                            Events
                        </Link>
                        <NavDropdown label="Resources" items={resourcesItems} />
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href={route('login')} className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-base">
                            Login
                        </Link>
                        <Link href={route('register')} className="px-6 py-2.5 rounded-full bg-emerald-500 text-white font-semibold text-base">
                            Register
                        </Link>
                    </div>

                    <button className="md:hidden text-white text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden flex flex-col gap-4 mt-4 text-white uppercase text-sm font-semibold">
                        <MobileNavItem label="Investor" items={investorItems} />
                        <MobileNavItem label="Exporter" items={exporterItems} />
                        <MobileNavItem label="Why Morocco" items={whyMoroccoItems} />
                        <MobileNavItem label="News" items={newsItems} />
                        <Link href={route('events.index')} className="text-left">
                            Events
                        </Link>
                        <MobileNavItem label="Resources" items={resourcesItems} />

                        <div className="flex flex-col gap-3 pt-4 border-t border-white/20">
                            <Link href={route('login')} className="px-5 py-2 rounded-full bg-white text-black font-semibold text-sm text-center">
                                Login
                            </Link>
                            <Link href={route('register')} className="px-5 py-2 rounded-full bg-emerald-500 text-white font-semibold text-sm text-center">
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            <main>{children}</main>
            <Footer />
        </div>
    );
}