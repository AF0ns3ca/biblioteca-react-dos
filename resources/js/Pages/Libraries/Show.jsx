import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CardInLibrary from "@/Components/CardInLibrary";
import CardLibrary from "@/Components/CardLibrary";

export default function Show({ auth, libraries, books, currentLibrary, librariesWithBookCount }) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Discover Books" />

            <div className="flex flex-col lg:flex-row w-full justify-center items-start pt-10 md:pt-20 px-10 md:px-0">
                {/* Panel Izquierdo para Detalles de la Biblioteca - Ocupará 100% del ancho en dispositivos pequeños y 35% en dispositivos grandes */}
                <div className="lg:w-1/5 lg:pr-4 pt-10">
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="text-xl font-semibold mb-2">{currentLibrary.nombre}</h2>
                        <p>Tipo: {currentLibrary.tipo}</p>
                        <p>{books.length} libros añadidos a la biblioteca</p>
                        <p>Biblioteca creada el {formatDate(currentLibrary.created_at)}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mt-4">Otras Bibliotecas</h3>
                        <div className="space-y-4 mt-2">
                            {librariesWithBookCount.filter(lib => lib.id !== currentLibrary.id).map((library) => (
                                <CardLibrary key={library.id} library={library} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Panel Derecho para Mostrar Libros - Ocupará 100% del ancho en dispositivos pequeños y 65% en dispositivos grandes */}
                <div className="lg:w-2/3 lg:pl-10 pt-10">
                    <div className="w-full flex flex-col gap-10">
                        {books.map((book) => (
                            <CardInLibrary
                                key={book.id}
                                book={book}
                                libraries={libraries}
                                currentLibrary={currentLibrary}
                                auth={auth}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
