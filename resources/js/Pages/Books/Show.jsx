import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BasicRating from "@/Components/BasicRating";
import { Inertia } from "@inertiajs/inertia";
import CardShow from "@/Components/CardShow";
import CardLibraryModal from "@/Components/CardLibraryModal";
import BookStatusSelector from "@/Components/BookStatusSelector";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import ShowTab from "@/Components/ShowTab";

export default function Show({
    auth,
    book,
    booksAuthor,
    booksSerie,
    booksAuthorCount,
    booksSerieCount,
    libraries,
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

    const [selectedSection, setSelectedSection] = useState(0);

    const handleSectionChange = (sectionIndex) => {
        setSelectedSection(sectionIndex);
    };

    const renderSelectedSection = () => {
        switch (selectedSection) {
            case 0:
                return (
                    <div className="w-full">
                        {booksAuthorCount > 1 ? (
                            <div className="w-full flex flex-row overflow-x-auto m-5">
                                {booksAuthor.map((bookauthor) => (
                                    <CardShow
                                        book={bookauthor}
                                        libraries={libraries}
                                        key={bookauthor.id}
                                        auth={auth}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="w-full flex items-center justify-center text-2xl">
                                <p>No hay más libros de este autor/a</p>
                            </div>
                        )}
                    </div>
                );
            case 1:
                return (
                    <div className="w-full">
                        {booksSerieCount > 1 ? (
                            <div className="w-full flex flex-row overflow-x-auto m-5">
                                {booksSerie.map((bookauthor) => (
                                    <CardShow
                                        book={bookauthor}
                                        libraries={libraries}
                                        key={bookauthor.id}
                                        auth={auth}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="w-full flex items-center justify-center text-2xl">
                                <p>No hay más libros de este autor/a</p>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={book.titulo} />

            <div className="w-full flex flex-1 items-center justify-center px-4 md:px-0">
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-full md:w-[80%] flex flex-col md:flex-row items-center justify-center gap-8 mt-20">
                        <div className="w-full md:w-[30%] flex flex-col items-center justify-center gap-5 cover-container">
                            <div>
                                {book.portada ? (
                                    <img
                                        src={book.portada}
                                        alt={book.titulo}
                                        className="rounded w-full h-auto md:w-[360px] md:h-[550px]"
                                    />
                                ) : (
                                    <div className="rounded w-full h-[300px] md:w-[360px] md:h-[550px] bg-gray-300 flex items-center justify-center text-center">
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
                                    showPage={true}
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
                        <div className="w-full md:w-[70%] flex flex-col items-start justify-between info-container">
                            <div className="w-full flex flex-col justify-start gap-2">
                                <h1 className="text-3xl md:text-4xl font-serif">{book.titulo}</h1>
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
                                    <p className="text-lg">
                                        {book.serie} #{book.num_serie}
                                    </p>
                                ) : (
                                    <p className="text-lg">Libro único</p>
                                )}
                                <div>
                                    <BasicRating
                                        book={book}
                                        initialRating={book.rate}
                                        size="large"
                                    />
                                </div>
                            </div>

                            <div className="w-full text-justify pb-6 md:pb-20">
                                <p className="text-lg">{book.descripcion}</p>
                            </div>
                            <div className="w-full flex items-end justify-end">
                                <button
                                    onClick={() => window.history.back()}
                                    className={`btn btn-primary p-3 text-white rounded-lg ${bgColorBG}`}
                                >
                                    Volver
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-6xl mt-6 md:mt-0">
                        <div className="flex">
                            <ShowTab
                                value={selectedSection}
                                onChange={handleSectionChange}
                                role={auth.user.role}
                                booksAuthorCount={booksAuthorCount}
                                booksSerieCount={booksSerieCount}
                            />
                        </div>
                        {renderSelectedSection()}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="w-[90%] md:w-[50%] bg-white p-4 md:p-8 flex flex-col rounded-lg items-center justify-center">
                        <h2 className="text-xl font-bold mb-4">Añadir a...</h2>
                        <div className="w-full grid gap-4">
                            {libraries.map((library) => (
                                <button
                                    key={library.id}
                                    onClick={() =>
                                        handleAddToLibrary(library.id)
                                    }
                                >
                                    <CardLibraryModal
                                        key={library.id}
                                        library={library}
                                    />
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
