import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ news, events, media }) {
    const [activeTab, setActiveTab] = useState('news');
    const [showCreateModal, setShowCreateModal] = useState(null); // 'news', 'event', or 'media'

    // Forms setup using Inertia useForm
    const newsForm = useForm({
        title: '',
        summary: '',
        content: '',
        image: null,
    });

    const eventForm = useForm({
        title: '',
        description: '',
        event_date: '',
        location: '',
        image: null,
    });

    const mediaForm = useForm({
        title: '',
        description: '',
        type: 'image',
        url: '',
        file: null,
    });

    const handleNewsSubmit = (e) => {
        e.preventDefault();
        newsForm.post(route('admin.content.news.store'), {
            onSuccess: () => {
                newsForm.reset();
                setShowCreateModal(null);
            }
        });
    };

    const handleEventSubmit = (e) => {
        e.preventDefault();
        eventForm.post(route('admin.content.event.store'), {
            onSuccess: () => {
                eventForm.reset();
                setShowCreateModal(null);
            }
        });
    };

    const handleMediaSubmit = (e) => {
        e.preventDefault();
        mediaForm.post(route('admin.content.media.store'), {
            onSuccess: () => {
                mediaForm.reset();
                setShowCreateModal(null);
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold leading-tight text-gray-900">
                        Gestion du Contenu Public
                    </h2>
                    <button
                        onClick={() => setShowCreateModal(activeTab)}
                        className="inline-flex items-center px-4 py-2.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition shadow-md shadow-teal-700/10 cursor-pointer"
                    >
                        + Ajouter {activeTab === 'news' ? 'une actualité' : activeTab === 'event' ? 'un événement' : 'un média'}
                    </button>
                </div>
            }
        >
            <Head title="Gestion Contenu" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-200 bg-white px-6 pt-4 rounded-t-2xl shadow-sm">
                        <button
                            onClick={() => setActiveTab('news')}
                            className={`pb-4 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                                activeTab === 'news' ? 'border-teal-700 text-teal-700' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Actualités / Annonces ({news.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('event')}
                            className={`pb-4 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                                activeTab === 'event' ? 'border-teal-700 text-teal-700' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Événements ({events.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('media')}
                            className={`pb-4 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                                activeTab === 'media' ? 'border-teal-700 text-teal-700' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Ressources Multimédias ({media.length})
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-b-2xl shadow-sm border-t border-gray-100">
                        {/* Tab Content - News */}
                        {activeTab === 'news' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {news.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic col-span-3 py-6 text-center">Aucune actualité publiée pour le moment.</p>
                                ) : (
                                    news.map((item) => (
                                        <div key={item.id} className="border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition">
                                            {item.image_path ? (
                                                <img src={item.image_path} alt={item.title} className="h-48 w-full object-cover" />
                                            ) : (
                                                <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">Morocco Now Image</div>
                                            )}
                                            <div className="p-5 flex-1 flex flex-col">
                                                <h3 className="font-bold text-gray-900 line-clamp-1 mb-2" title={item.title}>{item.title}</h3>
                                                <p className="text-gray-500 text-xs line-clamp-3 flex-1 mb-4">{item.summary || item.content}</p>
                                                <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                                                    <span className="text-gray-400 text-[10px]">{new Date(item.created_at).toLocaleDateString('fr-FR')}</span>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Voulez-vous vraiment supprimer cette actualité ?')) {
                                                                useForm().delete(route('admin.content.news.destroy', item.id));
                                                            }
                                                        }}
                                                        className="text-red-600 hover:text-red-800 text-xs font-semibold cursor-pointer"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Tab Content - Events */}
                        {activeTab === 'event' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {events.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic col-span-3 py-6 text-center">Aucun événement programmé pour le moment.</p>
                                ) : (
                                    events.map((ev) => (
                                        <div key={ev.id} className="border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition">
                                            {ev.image_path ? (
                                                <img src={ev.image_path} alt={ev.title} className="h-48 w-full object-cover" />
                                            ) : (
                                                <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">Morocco Now Event</div>
                                            )}
                                            <div className="p-5 flex-1 flex flex-col">
                                                <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">{ev.title}</h3>
                                                <div className="text-teal-700 text-xs font-semibold mb-2 flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    {ev.location}
                                                </div>
                                                <p className="text-gray-500 text-xs line-clamp-3 flex-1 mb-4">{ev.description}</p>
                                                <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                                                    <span className="text-teal-900 text-[11px] font-bold bg-teal-50 px-2.5 py-0.5 rounded-full">
                                                        {new Date(ev.event_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
                                                                    useForm().delete(route('admin.content.event.destroy', ev.id));
                                                            }
                                                        }}
                                                        className="text-red-600 hover:text-red-800 text-xs font-semibold cursor-pointer"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Tab Content - Media */}
                        {activeTab === 'media' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {media.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic col-span-3 py-6 text-center">Aucune ressource multimédia ajoutée.</p>
                                ) : (
                                    media.map((med) => (
                                        <div key={med.id} className="border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition bg-gray-50/30 p-5">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="h-10 w-10 rounded-full bg-teal-700/10 text-teal-700 flex items-center justify-center">
                                                    {med.type === 'video' ? (
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    ) : med.type === 'document' ? (
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                    ) : (
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 line-clamp-1">{med.title}</h3>
                                                    <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">{med.type}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-500 text-xs line-clamp-3 flex-1 mb-4">{med.description || 'Aucune description'}</p>
                                            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                                                {med.url || med.file_path ? (
                                                    <a
                                                        href={med.url || med.file_path}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-teal-700 hover:text-teal-900 text-xs font-semibold flex items-center gap-1"
                                                    >
                                                        Consulter
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">Aucun lien / fichier</span>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Voulez-vous vraiment supprimer ce média ?')) {
                                                                useForm().delete(route('admin.content.media.destroy', med.id));
                                                        }
                                                    }}
                                                    className="text-red-600 hover:text-red-800 text-xs font-semibold cursor-pointer"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals for creation */}
            {showCreateModal === 'news' && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
                        <button onClick={() => setShowCreateModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl cursor-pointer">✕</button>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Ajouter une actualité / annonce</h3>
                        <form onSubmit={handleNewsSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Titre</label>
                                <input
                                    type="text"
                                    required
                                    value={newsForm.data.title}
                                    onChange={e => newsForm.setData('title', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Résumé</label>
                                <textarea
                                    value={newsForm.data.summary}
                                    onChange={e => newsForm.setData('summary', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm h-20 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contenu</label>
                                <textarea
                                    required
                                    value={newsForm.data.content}
                                    onChange={e => newsForm.setData('content', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm h-32 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Image de couverture</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => newsForm.setData('image', e.target.files[0])}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={newsForm.processing}
                                className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full shadow-lg shadow-teal-700/10 transition cursor-pointer"
                            >
                                {newsForm.processing ? 'Publication...' : 'Publier'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showCreateModal === 'event' && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
                        <button onClick={() => setShowCreateModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl cursor-pointer">✕</button>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Programmer un événement</h3>
                        <form onSubmit={handleEventSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Titre de l'événement</label>
                                <input
                                    type="text"
                                    required
                                    value={eventForm.data.title}
                                    onChange={e => eventForm.setData('title', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                                <textarea
                                    required
                                    value={eventForm.data.description}
                                    onChange={e => eventForm.setData('description', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm h-24 resize-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date & Heure</label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={eventForm.data.event_date}
                                        onChange={e => eventForm.setData('event_date', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lieu / Ville</label>
                                    <input
                                        type="text"
                                        required
                                        value={eventForm.data.location}
                                        onChange={e => eventForm.setData('location', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Image d'illustration</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => eventForm.setData('image', e.target.files[0])}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={eventForm.processing}
                                className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full shadow-lg shadow-teal-700/10 transition cursor-pointer"
                            >
                                {eventForm.processing ? 'Création...' : 'Créer l\'événement'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showCreateModal === 'media' && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
                        <button onClick={() => setShowCreateModal(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl cursor-pointer">✕</button>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Ajouter une ressource multimédia</h3>
                        <form onSubmit={handleMediaSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Titre du média</label>
                                <input
                                    type="text"
                                    required
                                    value={mediaForm.data.title}
                                    onChange={e => mediaForm.setData('title', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                                <textarea
                                    value={mediaForm.data.description}
                                    onChange={e => mediaForm.setData('description', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm h-20 resize-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Type de média</label>
                                    <select
                                        value={mediaForm.data.type}
                                        onChange={e => mediaForm.setData('type', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm cursor-pointer"
                                    >
                                        <option value="image">Image</option>
                                        <option value="video">Vidéo (Youtube, etc.)</option>
                                        <option value="document">Document (PDF, Guide)</option>
                                    </select>
                                </div>
                                {mediaForm.data.type === 'video' ? (
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">URL de la vidéo</label>
                                        <input
                                            type="url"
                                            required
                                            value={mediaForm.data.url}
                                            onChange={e => mediaForm.setData('url', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                            placeholder="https://youtube.com/..."
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Fichier à téléverser</label>
                                        <input
                                            type="file"
                                            required={mediaForm.data.type === 'document'}
                                            onChange={e => mediaForm.setData('file', e.target.files[0])}
                                            className="w-full text-xs text-gray-500 file:mr-2 file:py-2.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                                        />
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={mediaForm.processing}
                                className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full shadow-lg shadow-teal-700/10 transition cursor-pointer"
                            >
                                {mediaForm.processing ? 'Ajout...' : 'Ajouter le média'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
