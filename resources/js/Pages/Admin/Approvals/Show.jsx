import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ beneficiary }) {
    const approve = () => router.post(route('admin.approvals.approve', beneficiary.id));
    const reject = () => router.post(route('admin.approvals.reject', beneficiary.id));

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Request details</h2>}>
            <Head title={beneficiary.name} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow p-8">
                        <p><strong>Name:</strong> {beneficiary.name}</p>
                        <p><strong>Email:</strong> {beneficiary.email}</p>
                        <p><strong>Phone:</strong> {beneficiary.phone}</p>
                        <p><strong>Address:</strong> {beneficiary.address}</p>
                        <p><strong>Requested role:</strong> {beneficiary.role}</p>
                        <p><strong>Status:</strong> {beneficiary.status}</p>

                        <div className="flex gap-3 mt-6">
                            <button onClick={approve} className="px-5 py-2 rounded-full bg-emerald-500 text-white">
                                Approve
                            </button>
                            <button onClick={reject} className="px-5 py-2 rounded-full bg-red-500 text-white">
                                Reject
                            </button>
                            <Link href={route('admin.approvals.index')} className="px-5 py-2 rounded-full border">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}