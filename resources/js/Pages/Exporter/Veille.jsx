import { useState } from 'react';
import ExporterSpaceLayout from '@/Layouts/ExporterSpaceLayout';
import SectorIcon from '@/Components/Exporter/SectorIcon';
import { Head } from '@inertiajs/react';

function formatDate(dateString) {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

function SectorAccordion({ sector }) {
    const [open, setOpen] = useState(false);
    const docs = sector.regulatoryDocuments || [];

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-4 py-5 text-left cursor-pointer"
            >
                <span className={`text-lg font-bold ${open ? 'text-emerald-600' : 'text-emerald-500'}`}>
                    {open ? '−' : '+'}
                </span>
                <SectorIcon icon={sector.icon} />
                <span className={`font-semibold ${open ? 'text-emerald-600' : 'text-gray-700'}`}>
                    {sector.name}
                </span>
                <span className="ml-auto text-xs text-gray-400">{docs.length} notification(s)</span>
            </button>

            {open && (
                <div className="pb-6 overflow-x-auto">
                    {docs.length === 0 ? (
                        <p className="text-gray-400 text-sm italic px-10">
                            Aucune notification enregistrée pour ce secteur.
                        </p>
                    ) : (
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="text-left text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
                                    <th className="py-2 pr-4">Membre notifiant</th>
                                    <th className="py-2 pr-4">Publication</th>
                                    <th className="py-2 pr-4">Description</th>
                                    <th className="py-2 pr-4">HS/ICS code(s)</th>
                                    <th className="py-2 pr-4">Objectifs</th>
                                    <th className="py-2 pr-4">Documents</th>
                                </tr>
                            </thead>
                            <tbody>
                                {docs.map((d) => (
                                    <tr key={d.id} className="border-b border-gray-50 align-top">
                                        <td className="py-4 pr-4 font-semibold text-gray-800 whitespace-nowrap">
                                            {d.notifying_member}
                                        </td>
                                        <td className="py-4 pr-4 text-gray-600 whitespace-nowrap">
                                            <div>Date : {formatDate(d.publication_date)}</div>
                                            {d.document_symbol && <div>Symbole : {d.document_symbol}</div>}
                                            {d.notification_type && <div>Type : {d.notification_type}</div>}
                                        </td>
                                        <td className="py-4 pr-4 text-gray-600 max-w-xs">{d.description || '—'}</td>
                                        <td className="py-4 pr-4 text-gray-600 whitespace-nowrap">
                                            {d.hs_ics_codes || '—'}
                                        </td>
                                        <td className="py-4 pr-4 text-gray-600 max-w-xs">{d.objectives || '—'}</td>
                                        <td className="py-4 pr-4">
                                            {d.document_link ? (
                                                <a
                                                    href={d.document_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-emerald-600 font-semibold hover:text-emerald-700"
                                                >
                                                    Lien
                                                </a>
                                            ) : (
                                                '—'
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}

export default function Veille({ sectors }) {
    return (
        <ExporterSpaceLayout>
            <Head title="Veille réglementaire" />

            <p className="text-gray-600 leading-relaxed mb-2">
                Le dispositif de veille réglementaire mis en place dans le cadre du programme{' '}
                <span className="font-bold">EXPORT MOROCCO NOW</span> est basé sur le système de notification e-ping
                de l'Organisation Mondiale du Commerce et des besoins en la matière exprimés par les bénéficiaires de
                l'accompagnement de l'AMDIE sur la période 2024-2026.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
                Pour élargir ce dispositif de veille à d'autres produits et/ou marchés qui vous intéressent, vous êtes
                cordialement invités à nous soumettre vos propositions via l'adresse suivante :{' '}
                <a href="mailto:Exportmorocconow@amdie.gov.ma" className="text-emerald-600 font-semibold">
                    Exportmorocconow@amdie.gov.ma
                </a>
                .
            </p>

            <div className="bg-white rounded-2xl border border-gray-200 px-6">
                {sectors.length === 0 ? (
                    <p className="text-gray-400 text-sm italic py-10 text-center">
                        Aucun secteur n'a encore été configuré.
                    </p>
                ) : (
                    sectors.map((sector) => <SectorAccordion key={sector.id} sector={sector} />)
                )}
            </div>
        </ExporterSpaceLayout>
    );
}
