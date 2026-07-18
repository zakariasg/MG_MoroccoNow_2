import { useState } from 'react';
import { Link } from '@inertiajs/react';

const investReasons = [
    { icon: '/images/orientation/icons/group.svg', title: 'Favorable Demographics', text: 'Young and dynamic population with half under 33.5 years old.' },
    { icon: '/images/orientation/icons/group2.svg', title: 'Strategic Location', text: 'Direct access to Europe, Africa and the Middle East via ports and trade agreements.' },
    { icon: '/images/orientation/icons/group3.svg', title: 'Competitive Costs', text: 'Skilled workforce and attractive operating costs compared to Europe and North America.' },
    { icon: '/images/orientation/icons/group4.svg', title: 'Tax Incentives', text: 'Free zones and tax benefits dedicated to foreign investors.' },
    { icon: '/images/orientation/icons/group5.svg', title: 'Modern Infrastructure', text: 'Constantly expanding logistics, energy and digital infrastructure.' },
    { icon: '/images/orientation/icons/group6.svg', title: 'Economic Stability', text: 'Stable macroeconomic framework and free-trade agreements with over 50 countries.' },
];

const exportReasons = [
    { icon: '/images/orientation/icons/group.svg', title: 'Free Trade Agreements', text: 'Preferential access to over a billion consumers through agreements with the EU, US and Africa.' },
    { icon: '/images/orientation/icons/group2.svg', title: 'Competitive Sectors', text: 'Agri-food, textile, automotive and aeronautics among the most dynamic export industries.' },
    { icon: '/images/orientation/icons/group3.svg', title: 'Port Logistics', text: 'Tanger Med, one of the largest ports in Africa, as an export platform to the world.' },
    { icon: '/images/orientation/icons/group4.svg', title: 'Export Support', text: 'Public and private programs to support exporters at every stage.' },
];

function OrientationPanel({ id, image, label, title, reasons, active, onSelect, onClose, ctaLabel, ctaType }) {
    const isActive = active === id;
    // Rien n'est actif => les deux panneaux affichent leur label (état "neutre" 50/50)
    const isNeutral = active === null;

    return (
        <div
            className="relative overflow-hidden transition-[flex-basis] duration-500 ease-in-out h-full cursor-pointer"
            style={{ flexBasis: isNeutral ? '50%' : isActive ? '100%' : '0%', flexGrow: 0 }}
            onClick={() => onSelect(id)}
        >
            <img
                src={image}
                alt={title}
                className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-700 ${isActive ? 'blur-md' : ''}`}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,194,148,0.6)', mixBlendMode: 'color' }} />

            {/* Label centré, visible tant que ce panneau n'est pas actif */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <span className="flex items-center whitespace-nowrap text-white font-bold text-2xl md:text-4xl uppercase">
                    <img src="/images/shapes/arrow.svg" alt="" className="h-8 md:h-10 w-auto mr-3 flex-shrink-0" />
                    {label}
                </span>
            </div>

            {/* Contenu détaillé, visible uniquement quand ce panneau est actif */}
            <div
                className={`absolute inset-0 overflow-y-auto flex items-center justify-center transition-opacity duration-300 z-20 ${
                    isActive ? 'opacity-100 pointer-events-auto delay-200' : 'opacity-0 pointer-events-none'
                }`}
            >
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    aria-label="Close"
                    className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 text-white text-xl hover:bg-white/30"
                >
                    ×
                </button>
                <div className="max-w-5xl w-full mx-auto px-6 md:px-10 py-10 my-auto">
                    <h3 className="text-white font-bold text-2xl md:text-[1.875rem] uppercase text-center mb-10">
                        {title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-10">
                        {reasons.map((r) => (
                            <div key={r.title} className="flex items-start gap-4">
                                <img src={r.icon} alt="" className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0" />
                                <div>
                                    <p className="text-white font-bold uppercase text-[1.125rem] mb-1">{r.title}</p>
                                    <p className="text-white text-sm leading-snug">{r.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href={route('register', { type: ctaType })}
                            onClick={(e) => e.stopPropagation()}
                            className="px-10 py-4 rounded-full bg-white text-teal-700 font-bold uppercase text-base md:text-lg tracking-wide transition hover:bg-teal-700 hover:text-white"
                        >
                            {ctaLabel}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OrientationSection() {
    const [active, setActive] = useState(null);

    // Clique sur un panneau déjà actif => referme (toggle)
    const handleSelect = (id) => {
        setActive((current) => (current === id ? null : id));
    };

    return (
        <>
            <section className="my-5 py-10 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="font-bold text-2xl md:text-4xl uppercase mb-6">
                        Choose Your Orientation
                    </h2>
                    <img src="/images/shapes/chose.svg" alt="" className="mx-auto h-16 md:h-20 w-auto" />
                </div>
            </section>

            <section className="flex flex-col lg:flex-row h-[700px] sm:h-[780px] lg:h-[830px] mb-5">
                <OrientationPanel
                    id="invest"
                    image="/images/orientation/invest.png"
                    label="I’M INVESTOR"
                    title="Reasons To Invest"
                    reasons={investReasons}
                    active={active}
                    onSelect={handleSelect}
                    onClose={() => setActive(null)}
                    ctaLabel="Be Investor"
                    ctaType="investor"
                />
                <OrientationPanel
                    id="export"
                    image="/images/orientation/export.png"
                    label="I’M EXPORTER"
                    title="Reasons To Export"
                    reasons={exportReasons}
                    active={active}
                    onSelect={handleSelect}
                    onClose={() => setActive(null)}
                    ctaLabel="Be Exporter"
                    ctaType="exporter"
                />
            </section>
        </>
    );
}