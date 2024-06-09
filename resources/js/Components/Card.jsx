import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddToLibraryModal from "./AddToLibraryModal";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";

const Card = ({ book, librariesWithBookCount, auth, isShown, status }) => {
    const [showModal, setShowModal] = useState(false);

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

    const handleDeleteReading = async () => {
        let confirmMessage = "Ya no quieres leer este libro?";
        if (book.status === "leyendo") {
            confirmMessage = "¿Seguro que quieres cancelar tu lectura?";
        } else if (book.status === "leido") {
            confirmMessage = "¿Seguro que quieres eliminar tu registro de lectura?";
        }

        const confirmed = window.confirm(confirmMessage);
        if (confirmed) {
            await Inertia.delete("/deletereading", {
                data: { user_id: auth.user.id, book_id: book.id, status: book.status },
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const bgColor = auth.user.role === "user" ? "#2C3E50" : "#512E5F";

    const realPortada = book.portada
        ? book.portada.startsWith("http")
            ? book.portada
            : book.portada.replace(/^public\//, "/storage/")
        : null;

    return (
        <div className={`card flex flex-col gap-3 items-center justify-center p-3 rounded min-w-[263px] ${!isShown ? 'hidden' : ''}`}>
            <div className="flex flex-col items-center justify-center">
                <a href={route("books.show", book.id)} key={book.id} className="cursor-pointer">
                    <div>
                        {book.portada ? (
                            <img src={realPortada} alt={book.titulo} className="w-[240px] h-[380px] rounded" loading="lazy" />
                        ) : (
                            <div className="w-[240px] h-[380px] bg-gray-300 flex items-center justify-center text-center rounded-lg">
                                <span className="text-2xl font-bold text-gray-600">{book.titulo}</span>
                            </div>
                        )}
                    </div>
                </a>
                <div className="hidden">
                    <h2 className="titulo">{book.titulo}</h2>
                    <p className="autor">{book.autor}</p>
                    <p className="serie">{book.serie ? book.serie : "Standalone"} {book.numero ? `#${book.num_serie}` : ""}</p>
                </div>
                <div className="w-full flex flex-row justify-between items-center gap-5 px-3">
                    
                    {(status !=="quiero_leer" && status !== "leyendo" && status !== "Leído")  && (
                        <button onClick={handleAddToWantToRead}>
                            <BookmarkBorderOutlinedIcon sx={{ fill: bgColor, fontSize: "35px" }} />
                        </button>
                    )}
                    {status === "quiero_leer" && (
                        <button onClick={handleDeleteReading}>
                            <BookmarkIcon sx={{ fill: bgColor, fontSize: "35px" }} />
                        </button>
                        
                    )}
                    {status === "leyendo" && (
                        <button onClick={
                            () => {
                                window.location.href = route("readings.index");
                            }
                        
                        }>
                            <LocalLibraryOutlinedIcon sx={{ fill: bgColor, fontSize: "35px" }} />
                        </button>
                    )}
                    <button className="text-center py-2 transition duration-300 ease-in-out" onClick={() => setShowModal(true)}>
                        <LibraryAddOutlinedIcon sx={{ fill: bgColor, fontSize: "35px" }} />
                    </button>
                </div>
                {showModal && (
                    <AddToLibraryModal book={book} auth={auth} librariesWithBookCount={librariesWithBookCount} setShowModal={setShowModal} />
                )}
            </div>
        </div>
    );
};

export default Card;
