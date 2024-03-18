import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Card from "@/Components/Card";
import ChangeButton from "@/Components/ChangeButton";

export default function Index({ auth, books }) {
    // Estado para controlar la vista actual
    const [view, setView] = useState(() => localStorage.getItem('view') || 'cards');

    // Efecto para guardar la vista en el localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem('view', view);
    }, [view]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Books" />
            <>
                <div id="table" className={`w-full ${view === 'table' ? 'flex' : 'hidden'} mt-4 items-center justify-center pb-3`}>
                    {/* Renderizar la tabla */}
                    <table className="w-[80%]">
                    <thead className="w-full">
                            <tr className="w-full">
                                <th className="px-6 py-3 bg-metal text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                                    Portada
                                </th>
                                <th className="px-6 py-3 bg-metal text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                                    Titulo
                                </th>
                                <th className="px-6 py-3 bg-metal text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                                    Autor
                                </th>
                                <th className="px-6 py-3 bg-metal text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                                    Serie
                                </th>
                                <th className="px-6 py-3 bg-metal text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                                    Ubicación
                                </th>
                                <th className="px-6 py-3 bg-metal text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm leading-5 font-medium text-gray-900">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={book.portada}
                                                            alt={book.titulo}
                                                            className="h-[120px] w-[80px]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm leading-5 font-medium text-gray-900">
                                                    {book.titulo}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="text-sm leading-5 text-gray-900">
                                            {book.autor} 
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="text-sm leading-5 text-gray-900">
                                            {/* Si tiene serie ponerla, si tiene numero ponerlo, sino standalone */}
                                            {book.serie ? book.serie : "Standalone"} {book.num_serie ? `#${book.num_serie}` : ""}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="text-sm leading-5 text-gray-900">
                                            Estante: {book.estante} {book.balda} - Fila: {book.fila}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                        <a
                                            href={route("books.edit", book.id)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="cards" className={`w-full ${view === 'cards' ? 'flex' : 'hidden'} mt-4 items-center justify-center pb-3`}>
                    {/* Renderizar las tarjetas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgxl:grid-cols-5 gap-10">
                        {books.map((book) => (
                            <Card book={book} key={book.id} />
                        ))}
                    </div>
                </div>
                {/* Componente ChangeButton para cambiar entre vistas */}
                <div className="fixed bottom-10 right-10">
                    <ChangeButton setView={setView} view={view} />
                </div>
            </>
        </AuthenticatedLayout>
    );
}
