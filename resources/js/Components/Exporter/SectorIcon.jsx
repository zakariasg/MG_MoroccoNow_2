export const SECTOR_ICONS = {
    aeronautique: '✈️',
    ameublement: '🛋️',
    automobile: '🚗',
    textile: '🧵',
    agroalimentaire: '🌾',
    cosmetique: '💄',
    chimie: '⚗️',
    electronique: '🔌',
    medical: '🩺',
    folder: '📁',
};

export default function SectorIcon({ icon, className = 'text-xl' }) {
    return <span className={className}>{SECTOR_ICONS[icon] || SECTOR_ICONS.folder}</span>;
}