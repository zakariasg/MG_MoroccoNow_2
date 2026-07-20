import { useForm } from '@inertiajs/react';

export default function EventRegisterModal({ event, onClose }) {
    const form = useForm({
        company_name: '',
        contact_last_name: '',
        contact_first_name: '',
        contact_title: '',
        phone: '',
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('exporter.events.register', event.id), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl relative">
                <div className="bg-gray-50 rounded-t-3xl px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Demande d'inscription</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer">
                        ✕
                    </button>
                </div>

                <form onSubmit={submit} className="p-8 space-y-5">
                    <p className="text-sm text-gray-700">
                        Evénement :{' '}
                        <span className="font-bold underline">{event.title}</span>
                        {' '}Du{' '}
                        <span className="font-bold underline">
                            {new Date(event.event_date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                        {event.end_date && (
                            <>
                                {' '}Au{' '}
                                <span className="font-bold underline">
                                    {new Date(event.end_date).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </>
                        )}
                        {event.location && <>, {event.location}</>}
                    </p>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Raison sociale *
                        </label>
                        <input
                            type="text"
                            required
                            value={form.data.company_name}
                            onChange={(e) => form.setData('company_name', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition text-sm"
                        />
                        {form.errors.company_name && (
                            <p className="text-red-600 text-xs mt-1">{form.errors.company_name}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Nom du représentant *
                            </label>
                            <input
                                type="text"
                                required
                                value={form.data.contact_last_name}
                                onChange={(e) => form.setData('contact_last_name', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Prénom du représentant *
                            </label>
                            <input
                                type="text"
                                required
                                value={form.data.contact_first_name}
                                onChange={(e) => form.setData('contact_first_name', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Qualité du représentant *
                        </label>
                        <input
                            type="text"
                            required
                            value={form.data.contact_title}
                            onChange={(e) => form.setData('contact_title', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            N° GSM *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Phone / Téléphone"
                            value={form.data.phone}
                            onChange={(e) => form.setData('phone', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Email / Courriel *
                        </label>
                        <input
                            type="email"
                            required
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={form.processing}
                        className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                    >
                        {form.processing ? 'Envoi...' : "SOUMETTRE LA DEMANDE D'INSCRIPTION"}
                    </button>
                </form>
            </div>
        </div>
    );
}