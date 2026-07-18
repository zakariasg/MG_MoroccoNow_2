import GuestLayout from '@/Layouts/GuestLayout';

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function Events({ events }) {
    return (
        <GuestLayout>
            {/* Hero banner - same visual theme as the homepage */}
            <section className="relative h-[420px] overflow-hidden">
                <img
                    src="/images/Hero/slider1.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 h-full flex items-center justify-center text-center px-8">
                    <h1 className="text-white text-4xl md:text-6xl font-bold">
                        Upcoming Events
                    </h1>
                </div>
            </section>

            {/* Events grid */}
            <section className="py-16 px-4">
                <div className="mx-auto max-w-6xl">
                    {events.length === 0 ? (
                        <p className="text-center text-gray-500">No upcoming events at the moment.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((ev) => (
                                <div
                                    key={ev.id}
                                    className="border border-gray-200 rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition"
                                >
                                    {ev.image_path ? (
                                        <img src={ev.image_path} alt={ev.title} className="h-48 w-full object-cover" />
                                    ) : (
                                        <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">
                                            Morocco Now Event
                                        </div>
                                    )}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="font-bold text-gray-900 text-xl mb-4">{ev.title}</h3>
                                        <p className="text-gray-700 mb-2">{formatDate(ev.event_date)}</p>
                                        <p className="text-gray-700 mb-6">{ev.location}</p>

                                        <div className="mt-auto">
                                            {ev.link ? (
                                                <a
                                                    href={ev.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block px-6 py-2.5 rounded-lg bg-[#001a3d] text-white text-sm font-semibold hover:bg-[#00234f] transition"
                                                >
                                                    Learn more
                                                </a>
                                            ) : (
                                                <span className="inline-block px-6 py-2.5 rounded-lg bg-gray-200 text-gray-500 text-sm font-semibold cursor-not-allowed">
                                                    Learn more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
