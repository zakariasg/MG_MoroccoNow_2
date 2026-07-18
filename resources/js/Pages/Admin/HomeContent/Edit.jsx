import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        hero_line_1: settings.hero_line_1 || '',
        hero_line_2: settings.hero_line_2 || '',
        hero_line_3: settings.hero_line_3 || '',
        hero_slide_1: null,
        hero_slide_2: null,
        hero_slide_3: null,
        stat_companies: settings.stat_companies ?? 0,
        stat_jobs: settings.stat_jobs ?? 0,
        stat_smes: settings.stat_smes ?? 0,
        stat_partners: settings.stat_partners ?? 0,
        vision_text: settings.vision_text || '',
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.home-content.update'), { forceFormData: true });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Homepage Content</h2>}>
            <Head title="Homepage Content" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-10">

                        {/* Hero section */}
                        <div className="bg-white rounded-2xl shadow p-8">
                            <h3 className="text-lg font-bold mb-6">Hero Banner</h3>

                            <div className="grid grid-cols-1 gap-4 mb-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Line 1</label>
                                    <input
                                        type="text"
                                        value={data.hero_line_1}
                                        onChange={e => setData('hero_line_1', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Line 2</label>
                                    <input
                                        type="text"
                                        value={data.hero_line_2}
                                        onChange={e => setData('hero_line_2', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Line 3</label>
                                    <input
                                        type="text"
                                        value={data.hero_line_3}
                                        onChange={e => setData('hero_line_3', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[1, 2, 3].map((n) => (
                                    <div key={n}>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Slide {n} image
                                        </label>
                                        {settings[`hero_slide_${n}`] && (
                                            <img src={settings[`hero_slide_${n}`]} alt="" className="h-20 w-full object-cover rounded-lg mb-2" />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData(`hero_slide_${n}`, e.target.files[0])}
                                            className="w-full text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats section */}
                        <div className="bg-white rounded-2xl shadow p-8">
                            <h3 className="text-lg font-bold mb-6">Stats Numbers</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Companies Supported</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.stat_companies}
                                        onChange={e => setData('stat_companies', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Jobs</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.stat_jobs}
                                        onChange={e => setData('stat_jobs', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Of SMEs</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.stat_smes}
                                        onChange={e => setData('stat_smes', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Partners</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.stat_partners}
                                        onChange={e => setData('stat_partners', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vision section */}
                        <div className="bg-white rounded-2xl shadow p-8">
                            <h3 className="text-lg font-bold mb-6">Vision Statement</h3>
                            <textarea
                                value={data.vision_text}
                                onChange={e => setData('vision_text', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm h-28 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full shadow-lg shadow-teal-700/10 transition cursor-pointer disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save homepage content'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
