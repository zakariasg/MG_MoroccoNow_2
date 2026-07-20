import ExporterSpaceLayout from '@/Layouts/ExporterSpaceLayout';
import ProfileSlideCard from '@/Components/Exporter/ProfileSlideCard';
import { Head } from '@inertiajs/react';

export default function Marches({ profiles }) {
    return (
        <ExporterSpaceLayout>
            <Head title="Profils marchés" />

            <p className="text-gray-600 leading-relaxed mb-2">
                Le dispositif d'analyse des marchés, mis en place par l'AMDIE dans le cadre du programme{' '}
                <span className="font-bold">EXPORT MOROCCO NOW</span>, vise à mettre en lumière les principales
                caractéristiques des marchés étudiés ainsi que les opportunités d'exportation additionnelles pour le
                Maroc. Ce dispositif s'intéresse également aux aspects liés à l'accès aux marchés, en présentant les
                principaux circuits domestiques de distribution des biens pour lesquels un potentiel d'exportation
                supplémentaire a été identifié.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
                L'AMDIE s'inscrit dans une démarche d'amélioration continue de ses services. Ainsi, toutes remarques
                et suggestions de la part des utilisateurs des Profils marchés peuvent être soumises via l'adresse
                suivante :{' '}
                <a href="mailto:Exportmorocconow@amdie.gov.ma" className="text-emerald-600 font-semibold">
                    Exportmorocconow@amdie.gov.ma
                </a>
                .
            </p>

            {profiles.length === 0 ? (
                <p className="text-gray-400 text-sm italic py-10 text-center">
                    Aucun profil marché n'a encore été publié.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map((p) => (
                        <ProfileSlideCard
                            key={p.id}
                            title={p.country_name}
                            year={p.year}
                            slides={p.slides}
                            documentPath={p.document_path}
                        />
                    ))}
                </div>
            )}
        </ExporterSpaceLayout>
    );
}
