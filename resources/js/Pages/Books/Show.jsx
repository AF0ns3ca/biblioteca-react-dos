import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BasicRating from "@/Components/BasicRating";
import { Inertia } from "@inertiajs/inertia";
import CardShow from "@/Components/CardShow";
import CardLibraryModal from "@/Components/CardLibraryModal";
import Books from "../Admin/Books";
import BookStatusSelector from "@/Components/BookStatusSelector";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";

export default function Index({
    auth,
    book,
    booksAuthor,
    bookSerie,
    libraries,
    status,
}) {
    const bgColor = auth.user.role === "user" ? "#2C3E50" : "#512E5F";
    const bgColorBG = auth.user.role === "user" ? "bg-metal" : "bg-premium";

    // Estado para controlar la apertura y cierre de la ventana modal
    const [showModal, setShowModal] = useState(false);

    // Función para abrir la ventana modal
    const openModal = () => {
        setShowModal(true);
    };

    // Función para cerrar la ventana modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={book.titulo} />

            <div className="w-full h-full flex flex-1 items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <div className="w-full md:w-[80%] flex flex-col md:flex-row items-center justify-center gap-6 mt-20 mb-10">
                        <div className="w-full md:w-[30%] flex flex-col items-center justify-center gap-5">
                            <div>
                                {book.portada ? (
                                    <img
                                        src={book.portada}
                                        alt={book.titulo}
                                        className="rounded w-full md:w-[360px] h-auto md:h-[550px]"
                                    />
                                ) : (
                                    <div className="w-full md:w-[360px] h-[550px] bg-gray-300 flex items-center justify-center text-center">
                                        <span className="text-2xl font-bold text-gray-600">
                                            {book.titulo}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="w-full max-w-[360px] flex flex-row items-center justify-between">
                                <BookStatusSelector
                                    initialStatus={book.status}
                                    book={book}
                                    auth={auth}
                                    dropdownClass="right-0"
                                />
                                <button
                                    className="text-center py-2 transition duration-300 ease-in-out"
                                    onClick={openModal}
                                >
                                    <LibraryAddOutlinedIcon
                                        sx={{ fill: bgColor, fontSize: "35px" }}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-[70%]">
                            <div className="w-full flex flex-col justify-start">
                                <h1 className="text-4xl">{book.titulo}</h1>
                                <p className="text-lg">
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
                                {book.serie ? (
                                    <>
                                        <p className="text-lg">
                                            {book.serie} #{book.num_serie}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-lg">Libro único</p>
                                )}
                                {/* Boton para volver a la pagina anterior a la que se estuviese */}
                            </div>
                            <div>
                                {/* Se añade la descripcion */}
                                <p className="text-lg">{book.descripcion}</p>
                            </div>
                            <div>
                                <BasicRating
                                    book={book}
                                    initialRating={book.rate}
                                />
                            </div>
                            <div>
                                <a
                                    href={route("books.index")}
                                    className="btn btn-primary"
                                >
                                    Volver
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[70%]">
                        <h2 className="text-2xl">Libros del mismo autor</h2>
                        <div className="w-full flex flex-row overflow-x-scroll m-5">
                            {booksAuthor.map((book) => (
                                <CardShow
                                    book={book}
                                    libraries={libraries}
                                    key={book.id}
                                    auth={auth}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Ventana modal para mostrar las bibliotecas */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-8 flex flex-col rounded-lg items-center justify-center">
                        <h2 className="text-xl font-bold mb-4">
                            Bibliotecas que contienen este libro
                        </h2>
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
                        <button
                            onClick={closeModal}
                            className={`bg-red-700 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-500 text-center`}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
