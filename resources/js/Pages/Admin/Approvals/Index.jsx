import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

function UserRow({ user, children }) {
    return (
        <div className="p-6 flex items-center justify-between">
            <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email} · {user.phone}</p>
                <p className="text-xs text-gray-400">{user.address}</p>
            </div>
            <div className="flex gap-2">{children}</div>
        </div>
    );
}

export default function Index({ pendingUsers, approvedInvestors, approvedExporters, rejectedUsers }) {
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

    const destroy = (id) => {
        if (confirm('Are you sure you want to permanently delete this user? This cannot be undone.')) {
            router.delete(route('admin.approvals.destroy', id));
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Registration requests</h2>}>
            <Head title="Approvals" />

            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 space-y-10">

                    {/* Pending */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Pending ({pendingUsers.length})</h3>
                        <div className="bg-white rounded-lg shadow divide-y">
                            {pendingUsers.length === 0 && (
                                <p className="p-6 text-gray-500 text-sm">No pending requests.</p>
                            )}
                            {pendingUsers.map((user) => (
                                <UserRow key={user.id} user={user}>
                                    <span className="px-3 py-1.5 text-xs font-bold uppercase rounded-full bg-gray-100 text-gray-600 self-center">
                                        {user.role === 'investisseur' ? 'Investor' : 'Exporter'}
                                    </span>
                                    <Link href={route('admin.approvals.show', user.id)} className="px-4 py-2 text-sm rounded-full border">
                                        Details
                                    </Link>
                                    <button onClick={() => approve(user.id)} className="px-4 py-2 text-sm rounded-full bg-emerald-500 text-white">
                                        Approve
                                    </button>
                                    <button onClick={() => reject(user.id)} className="px-4 py-2 text-sm rounded-full bg-red-500 text-white">
                                        Reject
                                    </button>
                                </UserRow>
                            ))}
                        </div>
                    </div>

                    {/* Approved Investors */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Approved Investors ({approvedInvestors.length})</h3>
                        <div className="bg-white rounded-lg shadow divide-y">
                            {approvedInvestors.length === 0 && (
                                <p className="p-6 text-gray-500 text-sm">No approved investors yet.</p>
                            )}
                            {approvedInvestors.map((user) => (
                                <UserRow key={user.id} user={user}>
                                    <Link href={route('admin.approvals.show', user.id)} className="px-4 py-2 text-sm rounded-full border">
                                        Edit
                                    </Link>
                                    <button onClick={() => destroy(user.id)} className="px-4 py-2 text-sm rounded-full bg-red-600 text-white">
                                        Delete
                                    </button>
                                </UserRow>
                            ))}
                        </div>
                    </div>

                    {/* Approved Exporters */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Approved Exporters ({approvedExporters.length})</h3>
                        <div className="bg-white rounded-lg shadow divide-y">
                            {approvedExporters.length === 0 && (
                                <p className="p-6 text-gray-500 text-sm">No approved exporters yet.</p>
                            )}
                            {approvedExporters.map((user) => (
                                <UserRow key={user.id} user={user}>
                                    <Link href={route('admin.approvals.show', user.id)} className="px-4 py-2 text-sm rounded-full border">
                                        Edit
                                    </Link>
                                    <button onClick={() => destroy(user.id)} className="px-4 py-2 text-sm rounded-full bg-red-600 text-white">
                                        Delete
                                    </button>
                                </UserRow>
                            ))}
                        </div>
                    </div>

                    {/* Rejected */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Rejected ({rejectedUsers.length})</h3>
                        <div className="bg-white rounded-lg shadow divide-y">
                            {rejectedUsers.length === 0 && (
                                <p className="p-6 text-gray-500 text-sm">No rejected requests.</p>
                            )}
                            {rejectedUsers.map((user) => (
                                <UserRow key={user.id} user={user}>
                                    <span className="px-3 py-1.5 text-xs font-bold uppercase rounded-full bg-gray-100 text-gray-600 self-center">
                                        {user.role === 'investisseur' ? 'Investor' : 'Exporter'}
                                    </span>
                                    <button onClick={() => destroy(user.id)} className="px-4 py-2 text-sm rounded-full bg-red-600 text-white">
                                        Delete
                                    </button>
                                </UserRow>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
