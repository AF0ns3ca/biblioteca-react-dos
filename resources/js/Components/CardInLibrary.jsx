import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Rating } from "@mui/material";
import BasicRating from "./BasicRating";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const CardInLibrary = ({ book, libraries, currentLibrary, auth }) => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (bookId, libraryId) => {
        if (
            confirm(
                `¿Está seguro de que desea eliminar el libro '${book.titulo}' de la biblioteca '${currentLibrary.nombre}'?`
            )
        ) {
            Inertia.delete(
                route("booktolibrary.destroy", {
                    book_id: bookId,
                    library_id: libraryId,
                }),
                {
                    onSuccess: () => {
                        window.location.reload();
                    },
                }
            );
        }
    };

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

    const bgColor = auth.user.role == "user" ? "#2C3E50" : "#512E5F";

    return (
        <div className="card w-full max-h-[250px] flex flex-col pb-5 rounded min-w-[263px] border-b-2">
            <div className="w-full max-h-[250px] flex flex-row items-center justify-start">
                {/* Contenido del libro */}
                {/*  enlace a show del libro*/}
                <div className="w-full flex flex-row gap-10">
                    <a
                        href={route("books.show", book.id)}
                        key={book.id}
                        className="cursor-pointer"
                    >
                        <div className="w-[140px] h-[215px]">
                            {book.portada ? (
                                <img
                                    src={book.portada}
                                    alt={book.titulo}
                                    className="w-full h-full rounded"
                                />
                            ) : (
                                <div className="w-[140px] h-[215px] bg-gray-300 flex items-center justify-center text-center rounded-lg">
                                    <span className="text-2xl font-bold text-gray-600">
                                        {book.titulo}
                                    </span>
                                </div>
                            )}
                        </div>
                    </a>

                    <div className="w-full max-h-[250px] flex flex-col justify-between">
                        <div className=" flex flex-col gap-2">
                            <h2 className="titulo text-2xl font-serif">
                                {book.titulo}
                            </h2>
                            <p className="autor text-l">
                                by{" "}
                                <span
                                    className="text-metal cursor-pointer underline italic"
                                    onClick={() =>
                                        Inertia.visit(
                                            `/books?autor=${book.autor}`
                                        )
                                    }
                                >
                                    {book.autor}
                                </span>
                            </p>
                            <p className="serie text-l">
                                {book.serie ? book.serie : "Libro Único"}{" "}
                                {book.num_serie ? `#${book.num_serie}` : ""}
                            </p>
                            <BasicRating
                                book={book}
                                initialRating={book.rate}
                            />
                        </div>

                        {/* Botón "Añadir a" */}
                        <div className="w-full max-h-[250px] flex flex-row items-center gap-2">
                            <div className="w-full flex flex-row items-end justify-end gap-5">
                                <button
                                    className=" text-center transition duration-300 ease-in-out"
                                    onClick={() => setShowModal(true)}
                                >
                                    <LibraryAddOutlinedIcon
                                        sx={{ fill: bgColor, fontSize: "35px" }}
                                    />
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(book.id, currentLibrary.id)
                                    }
                                    className="text-center rounded"
                                >
                                    <DeleteOutlineOutlinedIcon sx={{ fill: "#EF4444", fontSize: "35px" }}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Ventana modal para seleccionar biblioteca */}
                {showModal && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
                        <div className="relative bg-white p-8 max-w-md mx-auto rounded shadow-lg flex flex-col gap-4">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">
                                    Selecciona una biblioteca
                                </h2>
                                <div className="grid gap-4">
                                    {/* Lista de bibliotecas */}
                                    {libraries.map((library) => (
                                        <button
                                            key={library.id}
                                            className="w-full text-left py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded"
                                            onClick={() =>
                                                handleAddToLibrary(library.id)
                                            }
                                        >
                                            {library.nombre}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Botón para cerrar la ventana modal */}
                            <div className="w-full flex flex-col items-center">
                                <button
                                    className="w-[50%] py-2 px-4 bg-red-500 text-white rounded"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardInLibrary;
