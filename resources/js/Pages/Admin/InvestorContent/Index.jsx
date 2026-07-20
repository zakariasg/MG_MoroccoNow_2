import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-900">Investor Content Management</h2>
            }
        >
            <Head title="Investor Content Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <p className="text-gray-500 text-sm">
                            La gestion de l'espace bénéficiaire "Investisseur" sera construite ici,
                            sur le même principe que l'espace "Exportateur".
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
