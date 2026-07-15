import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Manager Dashboard</h2>}>
            <Head title="Admin" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link
                            href={route('admin.approvals.index')}
                            className="bg-white p-8 rounded-lg shadow hover:shadow-md transition"
                        >
                            <h3 className="text-lg font-bold mb-2">Registration requests</h3>
                            <p className="text-gray-600 text-sm">Approve or reject investor/exporter accounts.</p>
                        </Link>

                        <Link
                            href={route('admin.content.index')}
                            className="bg-white p-8 rounded-lg shadow hover:shadow-md transition"
                        >
                            <h3 className="text-lg font-bold mb-2">Content Management</h3>
                            <p className="text-gray-600 text-sm">News, events, and media.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}