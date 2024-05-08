import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CardInLibrary from "@/Components/CardInLibrary";
import CardLibrary from "@/Components/CardLibrary"; // Asegúrate de que esto está correctamente importado

export default function Show({ auth, libraries, books, currentLibrary, librariesWithBookCount }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Discover Books" />

            <div className="flex w-full h-full justify-center items-start pt-20 px-10">
                {/* Panel Izquierdo para Detalles de la Biblioteca - Ocupará 35% del ancho */}
                <div className="w-1/3 p-4">
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="text-xl font-semibold mb-2">{currentLibrary.nombre}</h2>
                        <p>Tipo: {currentLibrary.tipo}</p>
                        <p>Total libros: {books.length}</p>
                    </div>
                    <div>
                        {/* mostrar el resto de bibliotecas que no sea la que esta viendose */}
                        <h3 className="text-lg font-semibold mt-4">Otras Bibliotecas</h3>
                        <div className="space-y-4 mt-2">
                            {librariesWithBookCount.filter(lib => lib.id !== currentLibrary.id).map((library) => (
                                <CardLibrary key={library.id} library={library} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Panel Derecho para Mostrar Libros - Ocupará 65% del ancho */}
                <div className="w-full p-10 pl-20">
                    <div className="w-full flex flex-col gap-10">
                        {books.map((book) => (
                            <CardInLibrary
                                key={book.id}
                                book={book}
                                libraries={libraries}
                                currentLibrary={currentLibrary}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
