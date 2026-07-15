// resources/js/Components/InvestExportSplit.jsx
import { useState } from 'react';

const investReasons = [
    { title: 'FAVORABLE DEMOGRAPHICS', text: 'Young and dynamic population with half under 33.5 years old' },
    // ... autres raisons
];

const exportReasons = [
    { title: 'STRATEGIC LOCATION', text: '...' },
    // ...
];

function Panel({ side, image, label, reasons, hovered, onHover, onLeave }) {
    return (
        <div
            className="relative flex-1 h-[600px] overflow-hidden cursor-pointer"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <img src={image} className="absolute inset-0 w-full h-full object-cover" alt={label} />
            <div className="absolute inset-0 bg-black/40" />

            {/* Label centré, visible seulement au repos */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    hovered ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <span className="text-white text-2xl font-bold uppercase">
                    &rsaquo; I'M {label}
                </span>
            </div>

            {/* Contenu détaillé, visible au survol */}
            <div
                className={`absolute inset-0 bg-emerald-800/90 p-10 overflow-y-auto transition-opacity duration-300 ${
                    hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                <h3 className="text-white text-3xl font-bold mb-8">
                    Reasons To {side === 'invest' ? 'Invest' : 'Export'}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    {reasons.map((r, i) => (
                        <div key={i} className="text-white">
                            <p className="font-bold uppercase">{r.title}</p>
                            <p className="text-sm opacity-80">{r.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function InvestExportSplit() {
    const [hoveredSide, setHoveredSide] = useState(null); // 'invest' | 'export' | null

    return (
        <section className="flex flex-col md:flex-row">
            <Panel
                side="invest"
                image="/assets/images/invest.png"
                label="INVESTOR"
                reasons={investReasons}
                hovered={hoveredSide === 'invest'}
                onHover={() => setHoveredSide('invest')}
                onLeave={() => setHoveredSide(null)}
            />
            <Panel
                side="export"
                image="/assets/images/export.png"
                label="EXPORTER"
                reasons={exportReasons}
                hovered={hoveredSide === 'export'}
                onHover={() => setHoveredSide('export')}
                onLeave={() => setHoveredSide(null)}
            />
        </section>
    );
}