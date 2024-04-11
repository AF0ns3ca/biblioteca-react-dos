import CardLibrary from "@/Components/CardLibrary";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, libraries }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Bibliotecas de {auth.user.name}
                </h2>
            }
        >
            <Head title="Bibliotecas" />

            <div className="w-full h-full flex p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgxl:grid-cols-5 gap-10">
                    {libraries.map((librarie) => (
                        <CardLibrary librarie={librarie} key={librarie.id} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
