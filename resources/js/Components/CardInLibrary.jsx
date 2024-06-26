import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Rating } from "@mui/material";
import BasicRating from "./BasicRating";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddToLibraryModal from "./AddToLibraryModal";
import { useMediaQuery } from "@mui/material";

const CardInLibrary = ({
    book,
    librariesWithBookCount,
    currentLibrary,
    auth,
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async (bookId, libraryId) => {
        if (
            confirm(
                `¿Está seguro de que desea eliminar el libro '${book.titulo}' de la biblioteca '${currentLibrary.nombre}'?`
            )
        ) {
            await Inertia.delete(
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

    const isMobile = useMediaQuery("(max-width:600px)"); // Definimos el ancho máximo para dispositivos móviles
    const bgColor = auth.user.role == "user" ? "#2C3E50" : "#512E5F";

    const realPortada = book.portada
        ? book.portada.startsWith("http")
            ? book.portada
            : book.portada.replace(/^public\//, "/storage/")
        : null;

    return (
        <div className="card w-full h-[280px] md:h-[250px] flex flex-col flex-1 pb-5 rounded min-w-[263px] border-b-2">
            <div className="w-full max-h-[250px] flex flex-row items-center justify-start">
                {/* Contenido del libro */}
                <div className="w-full flex flex-row gap-10">
                    <a
                        href={route("books.show", book.id)}
                        key={book.id}
                        className="cursor-pointer"
                    >
                        <div className="w-[140px] h-[215px]">
                            {book.portada ? (
                                <img
                                    src={realPortada}
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
                            <p className="serie text-l">
                                {book.serie ? book.serie : "Libro Único"}{" "}
                                {book.num_serie ? `#${book.num_serie}` : ""}
                            </p>
                            <BasicRating
                                book={book}
                                initialRating={book.rate}
                                readonly={true}
                            />
                        </div>

                        {/* Botón "Añadir a" */}
                        <div className="w-full max-h-[250px] flex flex-row items-center gap-2">
                            <div className="w-full flex flex-row items-end justify-end text-[35px] gap-5">
                                <button
                                    className=" text-center transition duration-300 ease-in-out"
                                    onClick={() => setShowModal(true)}
                                >
                                    <LibraryAddOutlinedIcon
                                       sx={{ fill: bgColor, fontSize: isMobile ? "30px" : "35px" }} 
                                    />
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(book.id, currentLibrary.id)
                                    }
                                    className="text-center rounded"
                                >
                                    <DeleteOutlineOutlinedIcon
                                        sx={{
                                            fill: "#EF4444",
                                            fontSize: isMobile ? "30px" : "35px"
                                        }}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Ventana modal para seleccionar biblioteca */}
                {showModal && (
                    <AddToLibraryModal
                        book={book}
                        librariesWithBookCount={librariesWithBookCount}
                        setShowModal={setShowModal}
                        auth={auth}
                    />
                )}
            </div>
        </div>
    );
};

export default CardInLibrary;
