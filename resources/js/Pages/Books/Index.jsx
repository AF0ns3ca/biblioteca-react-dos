// Index.js

import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Card from "@/Components/Card";
import ChangeButton from "@/Components/ChangeButton";
import AlphabetNav from '@/Components/AlphabetNav';  // Asegúrate de usar la ruta correcta

export default function Index({ auth, books, libraries }) {
    const [view, setView] = useState(() => localStorage.getItem("view") || "cards");
    const [selectedLetter, setSelectedLetter] = useState({ letter: '', field: '' });

    useEffect(() => {
        localStorage.setItem("view", view);
    }, [view]);

    

    const filteredBooks = selectedLetter.letter
    ? selectedLetter.letter === 'special'
        ? books.filter((book) => !/^[A-Z]/i.test((book[selectedLetter.field] || '').trim()))
        : books.filter((book) => (book[selectedLetter.field] || '').trim().toUpperCase().startsWith(selectedLetter.letter))
    : books;


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Discover Books" />
            <AlphabetNav selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />
            <>
                <div
                    id="table"
                    className={`w-full ${
                        view === "table" ? "flex" : "hidden"
                    } table-books pt-32 items-center justify-center pb-3`}
                >
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
                                {/* <th className="px-6 py-3 bg-metal text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                                    Ubicación
                                </th> */}
                                <th className="px-6 py-3 bg-metal text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {filteredBooks.map((book) => (
                                <tr key={book.id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm leading-5 font-medium text-gray-900">
                                                    <div className="flex items-center p-1">
                                                        {book.portada ? (
                                                            <img
                                                                src={
                                                                    book.portada
                                                                }
                                                                alt={
                                                                    book.titulo
                                                                }
                                                                className="w-[80px] h-[120px] rounded"
                                                            />
                                                        ) : (
                                                            <div className="w-[80px] h-[120px] bg-gray-300 flex items-center justify-center text-center">
                                                                <span className="font-bold text-gray-600">
                                                                    {
                                                                        book.titulo
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
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
                                            {book.serie
                                                ? book.serie
                                                : "Standalone"}{" "}
                                            {book.num_serie
                                                ? `#${book.num_serie}`
                                                : ""}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <div className="text-sm leading-5 text-gray-900">
                                            {/* Añadimos un select con las bibliotecas */}
                                            <select
                                                name="library_id"
                                                id="library_id"
                                                className="form-select rounded-lg w-full"
                                            >
                                                <option value="">
                                                    Añadir a
                                                </option>
                                                {libraries.map((library) => (
                                                    <option
                                                        key={library.id}
                                                        value={library.id}
                                                        onChange={(e) =>
                                                            handleBookLibrary(book.id, e.target.value)
                                                        }
                                                    >
                                                        {library.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                        <a
                                            href={route("books.edit", book.id)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </a>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div
                    id="cards"
                    className={`w-full ${
                        view === "cards" ? "flex" : "hidden"
                    } pt-32 items-center justify-center pb-3`}
                >
                    {/* Renderizar las tarjetas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredBooks.map((book) => (
                            <Card book={book} libraries={libraries} key={book.id} />
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
