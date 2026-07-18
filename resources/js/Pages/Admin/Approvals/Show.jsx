import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Show({ beneficiary }) {
    const { data, setData, put, processing, errors } = useForm({
        name: beneficiary.name || '',
        email: beneficiary.email || '',
        phone: beneficiary.phone || '',
        address: beneficiary.address || '',
        role: beneficiary.role || 'investisseur',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.approvals.update', beneficiary.id));
    };

    const approve = () => router.post(route('admin.approvals.approve', beneficiary.id));
    const reject = () => router.post(route('admin.approvals.reject', beneficiary.id));

    const destroy = () => {
        if (confirm('Are you sure you want to permanently delete this user? This cannot be undone.')) {
            router.delete(route('admin.approvals.destroy', beneficiary.id));
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Request details</h2>}>
            <Head title={beneficiary.name} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow p-8">
                        <div className="flex items-center justify-between mb-6">
                            <span className="px-3 py-1.5 text-xs font-bold uppercase rounded-full bg-gray-100 text-gray-600">
                                Status: {beneficiary.status}
                            </span>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm"
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Account type
                                </label>
                                <select
                                    value={data.role}
                                    onChange={e => setData('role', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/10 transition text-sm cursor-pointer"
                                >
                                    <option value="investisseur">Investor</option>
                                    <option value="exportateur">Exporter</option>
                                </select>
                                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full shadow-lg shadow-teal-700/10 transition cursor-pointer disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save changes'}
                            </button>
                        </form>

                        <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-100">
                            {beneficiary.status !== 'approved' && (
                                <button onClick={approve} className="px-5 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold">
                                    Approve
                                </button>
                            )}
                            {beneficiary.status !== 'rejected' && (
                                <button onClick={reject} className="px-5 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold">
                                    Reject
                                </button>
                            )}
                            <button onClick={destroy} className="px-5 py-2 rounded-full bg-red-600 text-white text-sm font-semibold">
                                Delete
                            </button>
                            <Link href={route('admin.approvals.index')} className="px-5 py-2 rounded-full border text-sm font-semibold">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
