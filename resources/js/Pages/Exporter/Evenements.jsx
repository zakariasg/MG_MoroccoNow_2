import { useState } from 'react';
import ExporterSpaceLayout from '@/Layouts/ExporterSpaceLayout';
import EventRegisterModal from '@/Components/Exporter/EventRegisterModal';
import { Head } from '@inertiajs/react';

function formatDate(dateString) {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

function isExpired(event) {
    if (!event.registration_deadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(event.registration_deadline) < today;
}

const STATUS_LABELS = {
    pending: { text: "En attente de confirmation", classes: 'bg-amber-50 text-amber-700 border border-amber-200' },
    approved: { text: 'Inscription confirmée', classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    rejected: { text: 'Inscription refusée', classes: 'bg-red-50 text-red-700 border border-red-200' },
};

export default function Evenements({ events, myRegistrations }) {
    const [registeringEvent, setRegisteringEvent] = useState(null);

    return (
        <ExporterSpaceLayout>
            <Head title="Evénements" />

            {events.length === 0 ? (
                <p className="text-gray-400 text-sm italic py-10 text-center">
                    Aucun événement programmé pour le moment.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((ev) => {
                        const expired = isExpired(ev);
                        const registration = myRegistrations?.[ev.id];

                        return (
                            <div
                                key={ev.id}
                                className="border border-gray-200 rounded-2xl overflow-hidden flex flex-col bg-white hover:shadow-lg transition"
                            >
                                {ev.image_path ? (
                                    <img src={ev.image_path} alt={ev.title} className="h-40 w-full object-cover" />
                                ) : (
                                    <div className="h-40 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">
                                        Morocco Now Event
                                    </div>
                                )}

                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-gray-900 mb-1">{ev.title}</h3>
                                    {ev.location && (
                                        <p className="text-emerald-600 text-xs font-semibold mb-3">{ev.location}</p>
                                    )}

                                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                                        <p>
                                            <span className="text-gray-400">Date de début : </span>
                                            {formatDate(ev.event_date)}
                                        </p>
                                        {ev.end_date && (
                                            <p>
                                                <span className="text-gray-400">Date de fin : </span>
                                                {formatDate(ev.end_date)}
                                            </p>
                                        )}
                                        {ev.registration_deadline && (
                                            <p>
                                                <span className="text-gray-400">Clôture d'inscription : </span>
                                                {formatDate(ev.registration_deadline)}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-auto">
                                        {registration ? (
                                            <span
                                                className={`inline-block px-4 py-2 rounded-full text-xs font-semibold ${STATUS_LABELS[registration.status].classes}`}
                                            >
                                                {STATUS_LABELS[registration.status].text}
                                            </span>
                                        ) : expired ? (
                                            <span className="inline-block px-4 py-2 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                                                Inscription expirée
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => setRegisteringEvent(ev)}
                                                className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wide transition cursor-pointer"
                                            >
                                                Formulaire d'inscription
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {registeringEvent && (
                <EventRegisterModal event={registeringEvent} onClose={() => setRegisteringEvent(null)} />
            )}
        </ExporterSpaceLayout>
    );
}
