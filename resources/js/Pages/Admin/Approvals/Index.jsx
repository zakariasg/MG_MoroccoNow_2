import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ pendingUsers, approvedUsers, rejectedUsers }) {
    const approve = (id) => {
        if (confirm('Approve this account?')) {
            router.post(route('admin.approvals.approve', id));
        }
    };

    const reject = (id) => {
        if (confirm('Reject this account?')) {
            router.post(route('admin.approvals.reject', id));
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Registration requests</h2>}>
            <Head title="Approvals" />

            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <h3 className="text-lg font-bold mb-4">Pending ({pendingUsers.length})</h3>
                    <div className="bg-white rounded-lg shadow divide-y mb-10">
                        {pendingUsers.length === 0 && (
                            <p className="p-6 text-gray-500 text-sm">No pending requests.</p>
                        )}
                        {pendingUsers.map((user) => (
                            <div key={user.id} className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email} · {user.role} · {user.phone}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={route('admin.approvals.show', user.id)} className="px-4 py-2 text-sm rounded-full border">
                                        Details
                                    </Link>
                                    <button onClick={() => approve(user.id)} className="px-4 py-2 text-sm rounded-full bg-emerald-500 text-white">
                                        Approve
                                    </button>
                                    <button onClick={() => reject(user.id)} className="px-4 py-2 text-sm rounded-full bg-red-500 text-white">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-bold mb-4">Approved ({approvedUsers.length})</h3>
                    <div className="bg-white rounded-lg shadow divide-y mb-10">
                        {approvedUsers.map((user) => (
                            <div key={user.id} className="p-6">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email} · {user.role}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-bold mb-4">Rejected ({rejectedUsers.length})</h3>
                    <div className="bg-white rounded-lg shadow divide-y">
                        {rejectedUsers.map((user) => (
                            <div key={user.id} className="p-6">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email} · {user.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}