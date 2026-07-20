import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

const SECTOR_ICON_OPTIONS = [
    { value: 'aeronautique', label: 'Aéronautique ✈️' },
    { value: 'ameublement', label: 'Ameublement 🛋️' },
    { value: 'automobile', label: 'Automobile 🚗' },
    { value: 'textile', label: 'Textile 🧵' },
    { value: 'agroalimentaire', label: 'Agroalimentaire 🌾' },
    { value: 'cosmetique', label: 'Cosmétique 💄' },
    { value: 'chimie', label: 'Chimie ⚗️' },
    { value: 'electronique', label: 'Electronique 🔌' },
    { value: 'medical', label: 'Médical 🩺' },
    { value: 'folder', label: 'Autre 📁' },
];

const REGISTRATION_STATUS = {
    pending: { text: 'En attente', classes: 'bg-amber-50 text-amber-700 border border-amber-200' },
    approved: { text: 'Confirmée', classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    rejected: { text: 'Refusée', classes: 'bg-red-50 text-red-700 border border-red-200' },
};

function inputClasses() {
    return 'w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm';
}

function fileClasses() {
    return 'w-full text-xs text-gray-500 file:mr-2 file:py-2.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer';
}

export default function Index({ marketProfiles, filiereProfiles, sectors, registrations }) {
    const [activeTab, setActiveTab] = useState('marches');
    const [showModal, setShowModal] = useState(null); // 'market' | 'filiere' | 'sector' | 'document'
    const [rejectingId, setRejectingId] = useState(null);

    const marketForm = useForm({ country_name: '', year: '', slides: [], document: null });
    const filiereForm = useForm({ title: '', year: '', slides: [], document: null });
    const sectorForm = useForm({ name: '', icon: 'folder' });
    const documentForm = useForm({
        sector_id: sectors[0]?.id || '',
        notifying_member: '',
        publication_date: '',
        document_symbol: '',
        notification_type: '',
        description: '',
        hs_ics_codes: '',
        objectives: '',
        document_link: '',
    });
    const rejectForm = useForm({ admin_note: '' });

    const submitMarket = (e) => {
        e.preventDefault();
        marketForm.post(route('admin.exporter-content.market-profiles.store'), {
            forceFormData: true,
            onSuccess: () => {
                marketForm.reset();
                setShowModal(null);
            },
        });
    };

    const submitFiliere = (e) => {
        e.preventDefault();
        filiereForm.post(route('admin.exporter-content.filiere-profiles.store'), {
            forceFormData: true,
            onSuccess: () => {
                filiereForm.reset();
                setShowModal(null);
            },
        });
    };

    const submitSector = (e) => {
        e.preventDefault();
        sectorForm.post(route('admin.exporter-content.sectors.store'), {
            onSuccess: () => {
                sectorForm.reset();
                setShowModal(null);
            },
        });
    };

    const submitDocument = (e) => {
        e.preventDefault();
        documentForm.post(route('admin.exporter-content.regulatory-documents.store'), {
            onSuccess: () => {
                documentForm.reset();
                setShowModal(null);
            },
        });
    };

    const submitReject = (e) => {
        e.preventDefault();
        rejectForm.post(route('admin.exporter-content.registrations.reject', rejectingId), {
            onSuccess: () => {
                rejectForm.reset();
                setRejectingId(null);
            },
        });
    };

    const tabs = [
        { key: 'marches', label: `Profils marchés (${marketProfiles.length})` },
        { key: 'filieres', label: `Profils filières (${filiereProfiles.length})` },
        { key: 'veille', label: `Veille réglementaire (${sectors.length})` },
        { key: 'inscriptions', label: `Inscriptions événements (${registrations.length})` },
    ];

    const addButtonLabel = {
        marches: '+ Ajouter un profil marché',
        filieres: '+ Ajouter un profil filière',
        veille: '+ Ajouter',
        inscriptions: null,
    }[activeTab];

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold leading-tight text-gray-900">Exporter Content Management</h2>
                    {addButtonLabel && activeTab !== 'veille' && (
                        <button
                            onClick={() => setShowModal(activeTab === 'marches' ? 'market' : 'filiere')}
                            className="inline-flex items-center px-4 py-2.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition shadow-md shadow-teal-700/10 cursor-pointer"
                        >
                            {addButtonLabel}
                        </button>
                    )}
                    {activeTab === 'veille' && (
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal('sector')}
                                className="inline-flex items-center px-4 py-2.5 rounded-full bg-white border border-teal-700 text-teal-700 hover:bg-teal-50 font-semibold text-sm transition cursor-pointer"
                            >
                                + Secteur
                            </button>
                            <button
                                onClick={() => setShowModal('document')}
                                disabled={sectors.length === 0}
                                className="inline-flex items-center px-4 py-2.5 rounded-full bg-teal-700 hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition shadow-md shadow-teal-700/10 cursor-pointer"
                            >
                                + Notification
                            </button>
                        </div>
                    )}
                </div>
            }
        >
            <Head title="Exporter Content Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 bg-white px-6 pt-4 rounded-t-2xl shadow-sm overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`pb-4 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                                    activeTab === tab.key
                                        ? 'border-teal-700 text-teal-700'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-b-2xl shadow-sm border-t border-gray-100">
                        {/* Profils marchés */}
                        {activeTab === 'marches' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {marketProfiles.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic col-span-3 py-6 text-center">
                                        Aucun profil marché.
                                    </p>
                                ) : (
                                    marketProfiles.map((p) => (
                                        <div
                                            key={p.id}
                                            className="border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition"
                                        >
                                            <div className="h-32 w-full bg-gray-900 relative">
                                                {p.slides?.[0] ? (
                                                    <img src={p.slides[0]} alt={p.country_name} className="h-full w-full object-cover opacity-80" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-white/40 text-xs">
                                                        Pas d'image
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col">
                                                <h3 className="font-bold text-gray-900 mb-1">{p.country_name}</h3>
                                                <p className="text-gray-400 text-xs mb-1">{p.year}</p>
                                                <p className="text-gray-400 text-xs mb-4">
                                                    {(p.slides?.length || 0)} slide(s)
                                                    {p.document_path ? ' · PDF joint' : ''}
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Supprimer ce profil marché ?')) {
                                                            router.delete(route('admin.exporter-content.market-profiles.destroy', p.id));
                                                        }
                                                    }}
                                                    className="text-red-600 hover:text-red-800 text-xs font-semibold mt-auto self-start cursor-pointer"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Profils filières */}
                        {activeTab === 'filieres' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filiereProfiles.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic col-span-3 py-6 text-center">
                                        Aucun profil filière.
                                    </p>
                                ) : (
                                    filiereProfiles.map((p) => (
                                        <div
                                            key={p.id}
                                            className="border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition"
                                        >
                                            <div className="h-32 w-full bg-gray-900 relative">
                                                {p.slides?.[0] ? (
                                                    <img src={p.slides[0]} alt={p.title} className="h-full w-full object-cover opacity-80" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-white/40 text-xs">
                                                        Pas d'image
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col">
                                                <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                                                <p className="text-gray-400 text-xs mb-1">{p.year}</p>
                                                <p className="text-gray-400 text-xs mb-4">
                                                    {(p.slides?.length || 0)} slide(s)
                                                    {p.document_path ? ' · PDF joint' : ''}
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Supprimer ce profil filière ?')) {
                                                            router.delete(route('admin.exporter-content.filiere-profiles.destroy', p.id));
                                                        }
                                                    }}
                                                    className="text-red-600 hover:text-red-800 text-xs font-semibold mt-auto self-start cursor-pointer"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Veille réglementaire */}
                        {activeTab === 'veille' && (
                            <div className="space-y-6">
                                {sectors.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic py-6 text-center">
                                        Aucun secteur. Commencez par ajouter un secteur.
                                    </p>
                                ) : (
                                    sectors.map((sector) => (
                                        <div key={sector.id} className="border border-gray-100 rounded-2xl p-5">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-bold text-gray-900">
                                                    {SECTOR_ICON_OPTIONS.find((o) => o.value === sector.icon)?.label.split(' ').pop() || '📁'}{' '}
                                                    {sector.name}
                                                </h3>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Supprimer ce secteur et toutes ses notifications ?')) {
                                                            router.delete(route('admin.exporter-content.sectors.destroy', sector.id));
                                                        }
                                                    }}
                                                    className="text-red-600 hover:text-red-800 text-xs font-semibold cursor-pointer"
                                                >
                                                    Supprimer le secteur
                                                </button>
                                            </div>

                                            {sector.regulatoryDocuments.length === 0 ? (
                                                <p className="text-gray-400 text-xs italic">Aucune notification.</p>
                                            ) : (
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-xs border-collapse">
                                                        <thead>
                                                            <tr className="text-left text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                                                <th className="py-2 pr-4">Membre notifiant</th>
                                                                <th className="py-2 pr-4">Publication</th>
                                                                <th className="py-2 pr-4">HS/ICS</th>
                                                                <th className="py-2 pr-4">Lien</th>
                                                                <th className="py-2 pr-4"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {sector.regulatoryDocuments.map((d) => (
                                                                <tr key={d.id} className="border-b border-gray-50">
                                                                    <td className="py-2 pr-4 font-semibold text-gray-700">{d.notifying_member}</td>
                                                                    <td className="py-2 pr-4 text-gray-500">{d.publication_date || '—'}</td>
                                                                    <td className="py-2 pr-4 text-gray-500">{d.hs_ics_codes || '—'}</td>
                                                                    <td className="py-2 pr-4">
                                                                        {d.document_link ? (
                                                                            <a href={d.document_link} target="_blank" rel="noopener noreferrer" className="text-teal-700 font-semibold">
                                                                                Lien
                                                                            </a>
                                                                        ) : '—'}
                                                                    </td>
                                                                    <td className="py-2 pr-4">
                                                                        <button
                                                                            onClick={() => {
                                                                                if (confirm('Supprimer cette notification ?')) {
                                                                                    router.delete(route('admin.exporter-content.regulatory-documents.destroy', d.id));
                                                                                }
                                                                            }}
                                                                            className="text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                                                                        >
                                                                            Supprimer
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Inscriptions événements */}
                        {activeTab === 'inscriptions' && (
                            <div className="overflow-x-auto">
                                {registrations.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic py-6 text-center">
                                        Aucune demande d'inscription pour le moment.
                                    </p>
                                ) : (
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="text-left text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
                                                <th className="py-2 pr-4">Événement</th>
                                                <th className="py-2 pr-4">Entreprise</th>
                                                <th className="py-2 pr-4">Représentant</th>
                                                <th className="py-2 pr-4">Contact</th>
                                                <th className="py-2 pr-4">Statut</th>
                                                <th className="py-2 pr-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {registrations.map((r) => (
                                                <tr key={r.id} className="border-b border-gray-50 align-top">
                                                    <td className="py-3 pr-4 font-semibold text-gray-800">{r.event?.title}</td>
                                                    <td className="py-3 pr-4 text-gray-600">{r.company_name}</td>
                                                    <td className="py-3 pr-4 text-gray-600">
                                                        {r.contact_first_name} {r.contact_last_name}
                                                        <div className="text-gray-400 text-xs">{r.contact_title}</div>
                                                    </td>
                                                    <td className="py-3 pr-4 text-gray-600">
                                                        <div>{r.email}</div>
                                                        <div className="text-gray-400 text-xs">{r.phone}</div>
                                                    </td>
                                                    <td className="py-3 pr-4">
                                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${REGISTRATION_STATUS[r.status].classes}`}>
                                                            {REGISTRATION_STATUS[r.status].text}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 pr-4">
                                                        {r.status === 'pending' && (
                                                            <div className="flex gap-3">
                                                                <button
                                                                    onClick={() => router.post(route('admin.exporter-content.registrations.approve', r.id))}
                                                                    className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold cursor-pointer"
                                                                >
                                                                    Confirmer
                                                                </button>
                                                                <button
                                                                    onClick={() => setRejectingId(r.id)}
                                                                    className="text-red-600 hover:text-red-800 text-xs font-semibold cursor-pointer"
                                                                >
                                                                    Refuser
                                                                </button>
                                                            </div>
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
                </div>
            </div>

            {/* Modal: create market profile */}
            {showModal === 'market' && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
                        <button onClick={() => setShowModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl cursor-pointer">✕</button>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Ajouter un profil marché</h3>
                        <form onSubmit={submitMarket} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pays</label>
                                <input type="text" required value={marketForm.data.country_name} onChange={(e) => marketForm.setData('country_name', e.target.value)} className={inputClasses()} placeholder="Ex : Allemagne" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Année</label>
                                <input type="text" value={marketForm.data.year} onChange={(e) => marketForm.setData('year', e.target.value)} className={inputClasses()} placeholder="2024" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Images du slider (drapeau, visuels...)</label>
                                <input type="file" multiple accept="image/*" onChange={(e) => marketForm.setData('slides', Array.from(e.target.files))} className={fileClasses()} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Document PDF (optionnel)</label>
                                <input type="file" accept="application/pdf" onChange={(e) => marketForm.setData('document', e.target.files[0])} className={fileClasses()} />
                            </div>
                            <button type="submit" disabled={marketForm.processing} className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full shadow-lg shadow-teal-700/10 transition cursor-pointer">
                                {marketForm.processing ? 'Ajout...' : 'Ajouter'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: create filiere profile */}
            {showModal === 'filiere' && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
                        <button onClick={() => setShowModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl cursor-pointer">✕</button>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Ajouter un profil filière</h3>
                        <form onSubmit={submitFiliere} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Filière</label>
                                <input type="text" required value={filiereForm.data.title} onChange={(e) => filiereForm.setData('title', e.target.value)} className={inputClasses()} placeholder="Ex : Chaussures" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Année</label>
                                <input type="text" value={filiereForm.data.year} onChange={(e) => filiereForm.setData('year', e.target.value)} className={inputClasses()} placeholder="2024" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Images du slider</label>
                                <input type="file" multiple accept="image/*" onChange={(e) => filiereForm.setData('slides', Array.from(e.target.files))} className={fileClasses()} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Document PDF (optionnel)</label>
                                <input type="file" accept="application/pdf" onChange={(e) => filiereForm.setData('document', e.target.files[0])} className={fileClasses()} />
                            </div>
                            <button type="submit" disabled={filiereForm.processing} className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full shadow-lg shadow-teal-700/10 transition cursor-pointer">
                                {filiereForm.processing ? 'Ajout...' : 'Ajouter'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: create sector */}
            {showModal === 'sector' && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
                        <button onClick={() => setShowModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl cursor-pointer">✕</button>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Ajouter un secteur</h3>
                        <form onSubmit={submitSector} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom du secteur</label>
                                <input type="text" required value={sectorForm.data.name} onChange={(e) => sectorForm.setData('name', e.target.value)} className={inputClasses()} placeholder="Ex : Automobile" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Icône</label>
                                <select value={sectorForm.data.icon} onChange={(e) => sectorForm.setData('icon', e.target.value)} className={inputClasses() + ' cursor-pointer'}>
                                    {SECTOR_ICON_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" disabled={sectorForm.processing} className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full shadow-lg shadow-teal-700/10 transition cursor-pointer">
                                {sectorForm.processing ? 'Ajout...' : 'Ajouter le secteur'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: create regulatory document */}
            {showModal === 'document' && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl relative my-8">
                        <button onClick={() => setShowModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl cursor-pointer">✕</button>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Ajouter une notification réglementaire</h3>
                        <form onSubmit={submitDocument} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Secteur</label>
                                <select required value={documentForm.data.sector_id} onChange={(e) => documentForm.setData('sector_id', e.target.value)} className={inputClasses() + ' cursor-pointer'}>
                                    {sectors.map((s) => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Membre notifiant</label>
                                <input type="text" required value={documentForm.data.notifying_member} onChange={(e) => documentForm.setData('notifying_member', e.target.value)} className={inputClasses()} placeholder="Ex : Arabie saoudite" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date de publication</label>
                                    <input type="date" value={documentForm.data.publication_date} onChange={(e) => documentForm.setData('publication_date', e.target.value)} className={inputClasses() + ' cursor-pointer'} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Symbole du document</label>
                                    <input type="text" value={documentForm.data.document_symbol} onChange={(e) => documentForm.setData('document_symbol', e.target.value)} className={inputClasses()} placeholder="G/TBT/N/SAU/1035" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Type de notification</label>
                                <input type="text" value={documentForm.data.notification_type} onChange={(e) => documentForm.setData('notification_type', e.target.value)} className={inputClasses()} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                                <textarea value={documentForm.data.description} onChange={(e) => documentForm.setData('description', e.target.value)} className={inputClasses() + ' h-20 resize-none'} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">HS/ICS code(s)</label>
                                <input type="text" value={documentForm.data.hs_ics_codes} onChange={(e) => documentForm.setData('hs_ics_codes', e.target.value)} className={inputClasses()} placeholder="7009; 8301; 8302..." />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Objectifs</label>
                                <textarea value={documentForm.data.objectives} onChange={(e) => documentForm.setData('objectives', e.target.value)} className={inputClasses() + ' h-20 resize-none'} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lien du document</label>
                                <input type="url" value={documentForm.data.document_link} onChange={(e) => documentForm.setData('document_link', e.target.value)} className={inputClasses()} placeholder="https://..." />
                            </div>
                            <button type="submit" disabled={documentForm.processing} className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full shadow-lg shadow-teal-700/10 transition cursor-pointer">
                                {documentForm.processing ? 'Ajout...' : 'Ajouter la notification'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: reject registration */}
            {rejectingId && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
                        <button onClick={() => setRejectingId(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl cursor-pointer">✕</button>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Refuser l'inscription</h3>
                        <form onSubmit={submitReject} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Motif (optionnel)</label>
                                <textarea value={rejectForm.data.admin_note} onChange={(e) => rejectForm.setData('admin_note', e.target.value)} className={inputClasses() + ' h-24 resize-none'} />
                            </div>
                            <button type="submit" disabled={rejectForm.processing} className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-lg transition cursor-pointer">
                                {rejectForm.processing ? 'Envoi...' : 'Confirmer le refus'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
