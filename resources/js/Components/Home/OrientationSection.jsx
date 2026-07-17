import { useState } from 'react';
import { Link } from '@inertiajs/react';

const investReasons = [
    {
        icon: '/images/orientation/icons/group.svg',
        title: 'Favorable Demographics',
        text: 'Young and dynamic population with half under 33.5 years old.',
    },
    {
        icon: '/images/orientation/icons/group2.svg',
        title: 'Strategic Location',
        text: 'Direct access to Europe, Africa and the Middle East via ports and trade agreements.',
    },
    {
        icon: '/images/orientation/icons/group3.svg',
        title: 'Competitive Costs',
        text: 'Skilled workforce and attractive operating costs compared to Europe and North America.',
    },
    {
        icon: '/images/orientation/icons/group4.svg',
        title: 'Tax Incentives',
        text: 'Free zones and tax benefits dedicated to foreign investors.',
    },
    {
        icon: '/images/orientation/icons/group5.svg',
        title: 'Modern Infrastructure',
        text: 'Constantly expanding logistics, energy and digital infrastructure.',
    },
    {
        icon: '/images/orientation/icons/group6.svg',
        title: 'Economic Stability',
        text: 'Stable macroeconomic framework and free-trade agreements with over 50 countries.',
    },
];

const exportReasons = [
    {
        icon: '/images/orientation/icons/group.svg',
        title: 'Free Trade Agreements',
        text: 'Preferential access to over a billion consumers through agreements with the EU, US and Africa.',
    },
    {
        icon: '/images/orientation/icons/group2.svg',
        title: 'Competitive Sectors',
        text: 'Agri-food, textile, automotive and aeronautics among the most dynamic export industries.',
    },
    {
        icon: '/images/orientation/icons/group3.svg',
        title: 'Port Logistics',
        text: 'Tanger Med, one of the largest ports in Africa, as an export platform to the world.',
    },
    {
        icon: '/images/orientation/icons/group4.svg',
        title: 'Export Support',
        text: 'Public and private programs to support exporters at every stage.',
    },
];

function OrientationPanel({ id, image, label, title, reasons, active, onClose }) {
    const isActive = active === id;

    return (
        // pointer-events-none : ce panneau n'intercepte plus jamais la souris,
        // c'est la grille fixe au-dessus qui gère le survol (voir plus bas)
        <div
            className="relative overflow-hidden transition-[flex-basis] duration-500 ease-in-out h-full pointer-events-none"
            style={{ flexBasis: isActive ? '100%' : '0%', flexGrow: isActive ? 0 : 1 }}
        >
            {/* Image de fond */}
            <img
                src={image}
                alt={title}
                className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-700 ${
                    isActive ? 'blur-md' : ''
                }`}
            />
            {/* Superpositions couleur (assombrissement + teinte verte) */}
            <div className="absolute inset-0 bg-black/50" />
            <div
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(0,194,148,0.6)', mixBlendMode: 'color' }}
            />

            {/* Titre centré (état par défaut) */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    isActive ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <span className="flex items-center whitespace-nowrap text-white font-bold text-2xl md:text-4xl uppercase">
                    <img
                        src="/images/shapes/arrow.svg"
                        alt=""
                        className="h-8 md:h-10 w-auto mr-3 flex-shrink-0"
                    />
                    {label}
                </span>
            </div>

            {/* Contenu détaillé (état actif) */}
            <div
                className={`absolute inset-0 overflow-y-auto flex items-center justify-center transition-opacity duration-300 ${
                    isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0'
                }`}
            >
                {/* Bouton de fermeture : indispensable sur tactile, où il n'y a pas de mouseleave */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    aria-label="Close"
                    className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 text-white text-xl hover:bg-white/30"
                >
                    
                </button>
                <div className="max-w-5xl w-full mx-auto px-6 md:px-10 py-10 my-auto">
                    <h3 className="text-white font-bold text-2xl md:text-[1.875rem] uppercase text-center mb-10">
                        {title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                        {reasons.map((r) => (
                            <div key={r.title} className="flex items-start gap-4">
                                <img
                                    src={r.icon}
                                    alt=""
                                    className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0"
                                />
                                <div>
                                    <p className="text-white font-bold uppercase text-[1.125rem] mb-1">
                                        {r.title}
                                    </p>
                                    <p className="text-white text-sm leading-snug">{r.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OrientationSection() {
    const [active, setActive] = useState(null);

    return (
        <>
            {/* Choisissez votre orientation */}
            <section className="my-5 py-10 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="font-bold text-2xl md:text-4xl uppercase mb-6">
                        Choose Your Orientation
                    </h2>
                    <img
                        src="/images/shapes/chose.svg"
                        alt=""
                        className="mx-auto h-16 md:h-20 w-auto"
                    />
                    <img
                        src="/images/shapes/chose.svg"
                        alt=""
                        className="mx-auto h-16 md:h-20 w-auto"
                    />

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Link
                            href={route('register', { type: 'investor' })}
                            className="w-full sm:w-auto px-8 py-3 rounded-full bg-teal-700 text-white font-semibold uppercase text-sm tracking-wide transition hover:bg-teal-800"
                        >
                            Be Investor
                        </Link>
                        <Link
                            href={route('register', { type: 'exporter' })}
                            className="w-full sm:w-auto px-8 py-3 rounded-full border-2 border-teal-700 text-teal-700 font-semibold uppercase text-sm tracking-wide transition hover:bg-teal-700 hover:text-white"
                        >
                            Be Exporter
                        </Link>
                    </div>
                </div>
            </section>

            {/*
                Panneaux investisseur / exportateur.
                `relative` : conteneur de référence pour la grille de détection ci-dessous.
            */}
            <section className="relative flex flex-col lg:flex-row h-[700px] sm:h-[780px] lg:h-[830px] mb-5">
                <OrientationPanel
                    id="invest"
                    image="/images/orientation/invest.png"
                    label="I’M INVESTOR"
                    title="Reasons To Invest"
                    reasons={investReasons}
                    active={active}
                    onClose={() => setActive(null)}
                />
                <OrientationPanel
                    id="export"
                    image="/images/orientation/export.png"
                    label="I’M EXPORTER"
                    title="Reasons To Export"
                    reasons={exportReasons}
                    active={active}
                    onClose={() => setActive(null)}
                />

                {/*
                    Grille de détection du survol : TOUJOURS 50/50, ne bouge jamais.
                    C'est elle qui reçoit la souris, jamais les panneaux animés du dessous.
                    -> plus de frontière mobile, donc plus de flicker/superposition.
                */}
                <div className="absolute inset-0 flex flex-col lg:flex-row pointer-events-none">
                    <div
                        className="flex-1 pointer-events-auto"
                        onMouseEnter={() => setActive('invest')}
                        onMouseLeave={() => setActive(null)}
                        onClick={() => setActive('invest')}
                    />
                    <div
                        className="flex-1 pointer-events-auto"
                        onMouseEnter={() => setActive('export')}
                        onMouseLeave={() => setActive(null)}
                        onClick={() => setActive('export')}
                    />
                </div>
            </section>
        </>
    );
}