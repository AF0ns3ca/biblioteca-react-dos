import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import CardLibraryModal from "./CardLibraryModal";

const Card = ({ book, libraries }) => {
    const [showModal, setShowModal] = useState(false);

    // const handleAddToLibrary = (libraryId) => {
    //     // Aquí puedes realizar la lógica para añadir el libro a la biblioteca seleccionada
    //     console.log(`Añadir libro ${book.id} a la biblioteca ${libraryId}`);
    //     setShowModal(false); // Cierra la ventana modal después de añadir el libro

    //     Inertia.post('/booktolibrary', {book_id: book.id, library_id: libraryId});
    // };

    const handleAddToLibrary = (libraryId) => {
        // Aquí puedes realizar la lógica para añadir el libro a la biblioteca seleccionada
        console.log(`Añadir libro ${book.id} a la biblioteca ${libraryId}`);
        setShowModal(false); // Cierra la ventana modal después de añadir el libro

        Inertia.post(
            "/booktolibrary",
            { book_id: book.id, library_id: libraryId },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleClickOutside = (event) => {
        if (event.target.id === "modal-backdrop") {
            closeModal();
        }
    };

    return (
        <div className="card flex flex-col gap-3 items-center justify-cente p-3 rounded min-w-[263px]">
            <div className="flex flex-col items-center justify-center gap-5">
                {/* Contenido del libro */}
                {/*  enlace a show del libro*/}
                <a
                    href={route("books.show", book.id)}
                    key={book.id}
                    className="cursor-pointer"
                >
                    <div>
                        {book.portada ? (
                            <img
                                src={book.portada}
                                alt={book.titulo}
                                className="w-[240px] h-[380px] rounded"
                            />
                        ) : (
                            <div className="w-[240px] h-[380px] bg-gray-300 flex items-center justify-center text-center rounded-lg">
                                <span className="text-2xl font-bold text-gray-600">
                                    {book.titulo}
                                </span>
                            </div>
                        )}
                    </div>
                </a>

                <div className="hidden">
                    <h2 className="titulo">{book.titulo}</h2>
                    <p className="autor">{book.autor}</p>
                    <p className="serie">
                        {book.serie ? book.serie : "Standalone"}{" "}
                        {book.numero ? `#${book.num_serie}` : ""}
                    </p>
                </div>

                {/* Botón "Añadir a" */}
                <div className="w-full flex flex-row justify-center items-center gap-2">
                    <button
                        className="w-[50%] text-center py-2 bg-metal text-white rounded hover:bg-metaldark transition duration-300 ease-in-out"
                        onClick={() => setShowModal(true)}
                    >
                        Añadir a ...
                    </button>
                </div>
                {/* Ventana modal para seleccionar biblioteca */}
                {showModal && (
                <div id="modal-backdrop" className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center" onClick={handleClickOutside}>
                    <div className="relative max-h-[600px] p-8 bg-white w-full max-w-md m-6 rounded shadow-lg overflow-auto modern-scrollbar">
                        <h2 className="text-xl font-semibold mb-4">Selecciona una biblioteca</h2>
                        <div className="grid gap-4">
                            {libraries.map((library) => (
                                <button
                                    key={library.id}
                                    onClick={() => handleAddToLibrary(library.id)}
                                >
                                    <CardLibraryModal key={library.id} library={library} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default Card;
