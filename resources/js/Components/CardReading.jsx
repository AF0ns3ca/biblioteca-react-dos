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
import { useMediaQuery } from "@mui/material";

const CardReading = ({ book, auth, librariesWithBookCount }) => {
    const [showModal, setShowModal] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    const [reviewContent, setReviewContent] = useState("");

    const handleDeleteReading = async () => {
        let confirmMessage = "Ya no quieres leer este libro?";
        if (book.status === "leyendo") {
            confirmMessage = "¿Seguro que quieres cancelar tu lectura?";
        } else if (book.status === "leido") {
            confirmMessage =
                "¿Seguro que quieres eliminar tu registro de lectura?";
        }

        const confirmed = window.confirm(confirmMessage);
        if (confirmed) {
            await Inertia.delete("/deletereading", {
                data: {
                    user_id: auth.user.id,
                    book_id: book.id,
                    status: book.status,
                },
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

    const isMobile = useMediaQuery("(max-width:600px)"); // Define el ancho máximo para dispositivos móviles
    const color = auth.user.role == "user" ? "#2C3E50" : "#512E5F";
    const bgColor = auth.user.role == "user" ? "bg-metal" : "bg-premium";

    return (
        <div className="card w-full h-[280px] md:h-[250px] flex flex-col flex-1 pb-5 rounded min-w-[263px] border-b-2">
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

                        <div className="max-h-[250px] flex flex-row items-end justify-between gap-2">
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
                                                fill: color,
                                                fontSize: isMobile
                                                    ? "30px"
                                                    : "35px",
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
                                            fill: color,
                                            fontSize: isMobile
                                                ? "30px"
                                                : "35px",
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
                                            fontSize: isMobile
                                                ? "30px"
                                                : "35px",
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
                        auth={auth}
                    />
                )}
                {reviewModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-full md:w-[30%] bg-white p-5 rounded-lg">
                            <h1 className="text-2xl font-bold">
                                Escribe tu reseña
                            </h1>
                            <form
                                onSubmit={handleReviewSubmit}
                                className="flex flex-col gap-3"
                            >
                                <textarea
                                    className="w-full h-40 p-2 border rounded"
                                    value={reviewContent}
                                    onChange={(e) =>
                                        setReviewContent(e.target.value)
                                    }
                                    placeholder="Escribe aquí tu reseña"
                                ></textarea>
                                <div className="w-full flex flex-row justify-around gap-5">
                                    <button
                                        type="submit"
                                        className={`w-full ${bgColor} text-white p-2 rounded`}
                                    >
                                        Publicar
                                    </button>
                                    <button
                                        onClick={() => setReviewModal(false)}
                                        className="w-full bg-red-500 text-white p-2 rounded"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardReading;
