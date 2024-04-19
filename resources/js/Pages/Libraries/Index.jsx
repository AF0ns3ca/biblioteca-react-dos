import CardLibrary from "@/Components/CardLibrary";
import AddButton from "@/Components/addButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, libraries }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight mt-16">
                    Bibliotecas de {auth.user.name}
                </h2>
            }
        >
            <Head title="Bibliotecas" />

            <div className="w-full h-full flex justify-center items-center">
                <div className="h-full flex py-4 px-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgxl:grid-cols-5 gap-10">
                        {libraries.map((librarie) => (

                            // Se importa el componente CardLibrary haciendolo un enlace a la ruta show
                            // <a href={route('libraries.show', librarie.id)} key={librarie.id} className='cursor-pointer'>
                                <CardLibrary librarie={librarie} />
                            // </a>


                        ))}
                    </div>
                </div>
                <div className="fixed bottom-10 right-10 rounded-full">
                    <AddButton />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
