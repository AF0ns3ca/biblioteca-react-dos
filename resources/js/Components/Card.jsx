import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import CardLibraryModal from "./CardLibraryModal";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { styled } from '@mui/system';

const Card = ({ book, libraries, auth, isShown, status }) => {
    const [showModal, setShowModal] = useState(false);

    const handleAddToLibrary = async (libraryId) => {
        try {
            console.log(`Añadir libro ${book.id} a la biblioteca ${libraryId}`);
            
            await Inertia.post(
                "/booktolibrary",
                { book_id: book.id, library_id: libraryId },
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
    
            setShowModal(false);
        } catch (error) {
            console.error("Error al añadir el libro a la biblioteca:", error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleClickOutside = (event) => {
        if (event.target.id === "modal-backdrop") {
            closeModal();
        }
    };

    const handleAddToWantToRead = async () => {
        try {
            await Inertia.post('/update-reading-status', {
                book_id: book.id,
                status: 'quiero_leer',
                want_to_read: true,
                start_date: null,
                end_date: null,
            });
        } catch (error) {
            console.error("Error al actualizar el estado de lectura:", error);
        }
    };
    
    const bgColor = auth.user.role == "user" ? "#2C3E50" : "#512E5F";

    return (
        <div className={`card flex flex-col gap-3 items-center justify-center p-3 rounded min-w-[263px] ${!isShown ? 'hidden' : ''}`}>
            <div className="flex flex-col items-center justify-center">
                <a href={route("books.show", book.id)} key={book.id} className="cursor-pointer">
                    <div>
                        {book.portada ? (
                            <img
                                src={book.portada}
                                alt={book.titulo}
                                className="w-[240px] h-[380px] rounded"
                                loading="lazy" // Agregar lazy loading aquí
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
                <div className="w-full flex flex-row justify-between items-center gap-5 px-3">
                    <button onClick={handleAddToWantToRead}>
                        {status === "quiero_leer" ? (
                            <BookmarkIcon sx={{ fill: bgColor, fontSize: "35px" }} />
                        ) : (
                            <BookmarkBorderOutlinedIcon sx={{ fill: bgColor, fontSize: "35px" }} />
                        )}
                    </button>
                    <button className="text-center py-2 transition duration-300 ease-in-out" onClick={() => setShowModal(true)}>
                        <LibraryAddOutlinedIcon sx={{ fill: bgColor, fontSize: "35px" }} />
                    </button>
                </div>
                {showModal && (
                    <div id="modal-backdrop" className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center" onClick={handleClickOutside}>
                        <div className="relative max-h-[600px] p-8 bg-white w-full max-w-md m-6 rounded shadow-lg overflow-auto modern-scrollbar">
                            <h2 className="text-xl font-semibold mb-4">Selecciona una biblioteca</h2>
                            <div className="grid gap-4">
                                {libraries.map((library) => (
                                    <button key={library.id} onClick={() => handleAddToLibrary(library.id)}>
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
