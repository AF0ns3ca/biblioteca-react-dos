import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import CardLibraryModal from "./CardLibraryModal";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { styled } from "@mui/system";

const CardShow = ({ book, librariesWithBookCount, auth }) => {
    // const [showModal, setShowModal] = useState(false);

    // const handleAddToLibrary = (libraryId) => {
    //     // Aquí puedes realizar la lógica para añadir el libro a la biblioteca seleccionada
    //     console.log(`Añadir libro ${book.id} a la biblioteca ${libraryId}`);
    //     setShowModal(false); // Cierra la ventana modal después de añadir el libro

    //     Inertia.post('/booktolibrary', {book_id: book.id, library_id: libraryId});
    // };

    // const handleAddToLibrary = async (libraryId) => {
    //     // Aquí puedes realizar la lógica para añadir el libro a la biblioteca seleccionada
    //     console.log(`Añadir libro ${book.id} a la biblioteca ${libraryId}`);
    //     setShowModal(false); // Cierra la ventana modal después de añadir el libro

    //     await Inertia.post(
    //         "/booktolibrary",
    //         { book_id: book.id, library_id: libraryId },
    //         {
    //             preserveScroll: true,
    //             preserveState: true,
    //         }
    //     );
    // };

    // const closeModal = () => {
    //     setShowModal(false);
    // };

    // const handleClickOutside = (event) => {
    //     if (event.target.id === "modal-backdrop") {
    //         closeModal();
    //     }
    // };

    // const bgColor = auth.user.role == "user" ? "#2C3E50" : "#512E5F";

    return (
        <div
            className={`card flex flex-col gap-3 items-center justify-center p-3 `}
        >
            <div className="flex flex-col items-start justify-start min-w-[120px]">
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
                                className="w-[120px] h-[190px] rounded"
                            />
                        ) : (
                            <div className="w-[120px] h-[190px] bg-gray-300 flex items-center justify-center text-center rounded-lg">
                                <span className="text-sm font-bold text-gray-600">
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
            </div>
        </div>
    );
};

export default CardShow;
