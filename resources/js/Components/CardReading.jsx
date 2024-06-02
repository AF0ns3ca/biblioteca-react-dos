// CardReading.js
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import { red } from "@mui/material/colors";
import BookStatusSelector from "./BookStatusSelector";
import CardLibraryModal from "./CardLibraryModal";
import BasicRating from "./BasicRating";
import AddToLibraryModal from "./AddToLibraryModal";

const CardReading = ({ book, auth, librariesWithBookCount }) => {
    const [showModal, setShowModal] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    const [reviewContent, setReviewContent] = useState("");

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

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await Inertia.post("/reviews/store", {
                book_id: book.id,
                user_id: auth.user.id,
                review: reviewContent,
            });
            setReviewModal(false);
        } catch (error) {
            console.error("Error al enviar la reseña:", error);
        }
    };

    const bgColor = auth.user.role == "user" ? "#2C3E50" : "#512E5F";

    return (
        <div className="card w-full max-h-[250px] flex flex-col pb-5 rounded min-w-[263px] border-b-2">
            <div className="w-full max-h-[250px] flex flex-row items-center justify-start">
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
                        <div className=" flex flex-col md:gap-2">
                            <h2 className="titulo text-lg md:text-2xl font-serif">
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
                            <p className="serie text-sm md:text-lg">
                                {book.serie ? book.serie : "Libro Único"}{" "}
                                {book.num_serie ? `#${book.num_serie}` : ""}
                            </p>
                            <BasicRating
                                book={book}
                                initialRating={book.rate}
                                // si el status no es leido
                                readonly={book.status !== "leido"}
                            />
                        </div>

                        <div className="max-h-[250px] flex flex-row items-center justify-between gap-2">
                            <div className="flex flex-row items-start justify-start">
                                <BookStatusSelector
                                    initialStatus={book.status}
                                    book={book}
                                    auth={auth}
                                    showPage={false}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-1 md:gap-5">
                                {book.status === "leido" && book.rate > 0 && (
                                    <button
                                        className="text-center transition duration-300 ease-in-out"
                                        onClick={() => setReviewModal(true)}
                                        title="Escribir reseña"
                                    >
                                        <DrawOutlinedIcon
                                            sx={{
                                                fill: bgColor,
                                                fontSize: "35px",
                                            }}
                                        />
                                    </button>
                                )}
                                <button
                                    className="text-center transition duration-300 ease-in-out"
                                    onClick={() => setShowModal(true)}
                                    title="Añadir a biblioteca"
                                >
                                    <LibraryAddOutlinedIcon
                                        sx={{
                                            fill: bgColor,
                                            fontSize: "35px",
                                        }}
                                    />
                                </button>
                                <button
                                    className="text-center transition duration-300 ease-in-out"
                                    onClick={handleDeleteReading}
                                    title="Eliminar de la lista de lectura"
                                >
                                    <BookmarkRemoveOutlinedIcon
                                        sx={{
                                            fill: red[700],
                                            fontSize: "35px",
                                        }}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && (
                    <AddToLibraryModal 
                        book={book}
                        librariesWithBookCount={librariesWithBookCount}
                        setShowModal={setShowModal}
                    />
                )}
            </div>
        </div>
    );
};

export default CardReading;
