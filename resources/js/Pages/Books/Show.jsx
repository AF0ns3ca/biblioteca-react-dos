import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BasicRating from "@/Components/BasicRating";
import { Inertia } from "@inertiajs/inertia";
import CardShow from "@/Components/CardShow";
import CardLibraryModal from "@/Components/CardLibraryModal";
import BookStatusSelector from "@/Components/BookStatusSelector";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TimerIcon from "@mui/icons-material/Timer";
import ShowTab from "@/Components/ShowTab";
import AddToLibraryModal from "@/Components/AddToLibraryModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

export default function Show({
    auth,
    book,
    booksAuthor,
    booksSerie,
    booksAuthorCount,
    booksSerieCount,
    librariesWithBookCount,
    dates,
    datesCount,
}) {
    console.log("Libro:", book);

    console.log("Fechas:", dates);

    const bgColor = auth.user.role === "user" ? "#2C3E50" : "#512E5F";
    const bgColorBG = auth.user.role === "user" ? "bg-metal" : "bg-premium";
    book.serie == null && (booksSerieCount = 1);

    const [showModal, setShowModal] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedReadingId, setSelectedReadingId] = useState(0);
    const [startDateModal, setStartDateModal] = useState("");
    const [endDateModal, setEndDateModal] = useState("");

    const handleSelectedReading = (readingId, startDateModal, endDateModal) => {
        setSelectedReadingId(readingId);
        setStartDateModal(startDateModal);
        setEndDateModal(endDateModal);
        console.log(readingId);
        console.log(startDateModal);
        console.log(endDateModal);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const [selectedSection, setSelectedSection] = useState(0);

    const handleSectionChange = (sectionIndex) => {
        setSelectedSection(sectionIndex);
    };

    const handleDeleteReading = (readingId) => {
        console.log(readingId);
        // tras la confirmacion se elimina
        if (confirm("¿Estás seguro de que quieres eliminar esta lectura?")) {
            Inertia.delete(route("readings.deleteReading", readingId), {
                id: readingId,
            });
        }
    };

    const handleSaveDates = () => {
        // Aquí selectedReadingId se utiliza directamente sin necesidad de preocuparte por su valor
        Inertia.put(route("readings.updateDates", selectedReadingId), {
            id: selectedReadingId,
            start_date: startDateModal,
            end_date: endDateModal,
        });
    };

    useEffect(() => {
        if (showDateModal && dates.length > 0) {
            // Obtener la primera fecha del array de fechas
            const firstDate = dates[0];
            // Establecer las fechas por defecto en los estados startDate y endDate
            setStartDate(firstDate.start_date);
            setEndDate(firstDate.end_date);
        }
    }, [showDateModal]);

    const renderSelectedSection = () => {
        switch (selectedSection) {
            case 0:
                return (
                    <div className="w-full">
                        {datesCount > 0 ? (
                            <div className="w-full flex flex-col items-center md:m-5 space-y-6">
                                <p className="text-2xl font-semibold">
                                    {datesCount > 1
                                        ? `Has leído este libro ${datesCount} veces`
                                        : `Has leído este libro ${datesCount} vez`}
                                </p>
                                {dates.map((date) => {
                                    const startDate = new Date(date.start_date);
                                    const endDate = new Date(date.end_date);
                                    const diffTime = Math.abs(
                                        endDate - startDate
                                    );
                                    const diffDays = Math.ceil(
                                        diffTime / (1000 * 60 * 60 * 24)
                                    );

                                    return (
                                        <div
                                            className="w-[60%] p-6 border border-gray-300 rounded-lg shadow-md bg-white flex flex-row justify-between"
                                            key={date.id}
                                        >
                                            <div>
                                                <div className="text-lg mb-2 flex items-center">
                                                    <CalendarTodayIcon className="mr-2 text-metal" />
                                                    <div className="flex flex-row gap-2">
                                                        <span className="font-bold">
                                                            Empezaste el libro
                                                            el:
                                                        </span>
                                                        <span>
                                                            {startDate.toLocaleDateString(
                                                                "es-ES"
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-lg mb-2 flex items-center">
                                                    <CalendarTodayIcon className="mr-2 text-green-500" />
                                                    <div className="flex flex-row gap-2">
                                                        <span className="font-bold">
                                                            Terminaste el libro
                                                            el:
                                                        </span>
                                                        <span>
                                                            {endDate.toLocaleDateString(
                                                                "es-ES"
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-lg flex items-center">
                                                    <TimerIcon className="mr-2 text-red-500" />
                                                    <div className="flex flex-row gap-2">
                                                        {diffDays > 0 ? (
                                                            <>
                                                                <span className="font-bold">
                                                                    Has tardado:
                                                                </span>
                                                                <span>
                                                                    {diffDays}{" "}
                                                                    días en
                                                                    leerlo
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="font-bold">
                                                                ¡Lo has leído en
                                                                menos de un día!
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="w-full flex flex-col md:flex-col gap-5">
                                                    <button
                                                        onClick={() => {
                                                            setStartDate(
                                                                startDate
                                                            );
                                                            setEndDate(endDate);
                                                            setShowDateModal(
                                                                true
                                                            );
                                                            handleSelectedReading(
                                                                date.id,
                                                                date.start_date,
                                                                date.end_date
                                                            );
                                                        }}
                                                        title="Editar fechas de lectura"
                                                        className={`${bgColorBG} text-white px-4 py-2 rounded-md w-full`}
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleDeleteReading(
                                                                date.id
                                                            );
                                                        }}
                                                        title="Eliminar lectura"
                                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
                                                    >
                                                        <DeleteForeverIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="w-full flex items-center justify-center text-2xl">
                                {book.status === "quiero_leer" ? (
                                    <p>
                                        Este libro está en tu{" "}
                                        <span
                                            className="text-metal cursor-pointer underline italic"
                                            onClick={() =>
                                                Inertia.visit(`/reading`)
                                            }
                                        >
                                            lista de "Quiero leer"
                                        </span>
                                    </p>
                                ) : book.status === "leyendo" ? (
                                    <p>Estás leyendo este libro</p>
                                ) : book.status === "leido" ? (
                                    <p>Has terminado de leer este libro.</p>
                                ) : (
                                    <p>
                                        Aún no has leído este libro. ¿A qué
                                        esperas?
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                );
            case 1:
                return (
                    <div className="w-full">
                        {booksAuthorCount > 1 ? (
                            <div className="w-full flex flex-row overflow-x-auto m-5">
                                {booksAuthor.map((bookauthor) => (
                                    <CardShow
                                        book={bookauthor}
                                        librariesWithBookCount={librariesWithBookCount}
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
            case 2:
                return (
                    <div className="w-full">
                        {booksSerieCount > 1 && book.serie != null ? (
                            <div className="w-full flex flex-row overflow-x-auto m-5">
                                {booksSerie.map((bookauthor) => (
                                    <CardShow
                                        book={bookauthor}
                                        librariesWithBookCount={librariesWithBookCount}
                                        key={bookauthor.id}
                                        auth={auth}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="w-full flex items-center justify-center text-2xl">
                                <p>No hay más libros de esta serie</p>
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
                    <div className="w-full md:w-[80%] flex flex-col md:flex-row items-center justify-center gap-8 mt-20 mb-5 md:mb-10">
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
                                <h1 className="text-3xl md:text-4xl font-serif">
                                    {book.titulo}
                                </h1>
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
                                        readonly={true}
                                    />
                                </div>
                            </div>

                            <div className="w-full text-justify pb-6 md:pb-20">
                                <p className="text-lg whitespace-pre-wrap">
                                    {book.descripcion}
                                </p>
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
                <AddToLibraryModal
                    book={book}
                    librariesWithBookCount={librariesWithBookCount}
                    setShowModal={setShowModal}
                />
                // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                //     <div className="w-[90%] md:w-[50%] bg-white p-4 md:p-8 flex flex-col rounded-lg items-center justify-center">
                //         <h2 className="text-xl font-bold mb-4">Añadir a...</h2>
                //         <div className="w-full grid gap-4">
                //             {libraries.map((library) => (
                //                 <button
                //                     key={library.id}
                //                     onClick={() =>
                //                         handleAddToLibrary(library.id)
                //                     }
                //                 >
                //                     <CardLibraryModal
                //                         key={library.id}
                //                         library={library}
                //                     />
                //                 </button>
                //             ))}
                //         </div>
                //         <button
                //             onClick={closeModal}
                //             className={`bg-red-700 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-500 text-center`}
                //         >
                //             Cerrar
                //         </button>
                //     </div>
                // </div>
            )}
            {showDateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="w-[90%] md:w-[50%] bg-white p-4 md:p-8 flex flex-col rounded-lg items-center justify-center">
                        <h2 className="text-xl font-bold mb-4">
                            Editar fechas de lectura
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div
                                className="flex flex-col
                            gap-2"
                            >
                                <label
                                    htmlFor="start_date"
                                    className="text-lg font-semibold"
                                >
                                    Fecha de inicio:
                                </label>
                                <input
                                    type="date"
                                    id="start_date"
                                    className="border rounded-md px-2 py-1"
                                    value={startDateModal}
                                    onChange={(e) => {
                                        setStartDate(e.target.value),
                                            setStartDateModal(e.target.value),
                                            console.log(
                                                "Nueva Fecha Inicio:",
                                                e.target.value
                                            );
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="end_date"
                                    className="text-lg font-semibold"
                                >
                                    Fecha de fin:
                                </label>
                                <input
                                    type="date"
                                    id="end_date"
                                    className="border rounded-md px-2 py-1"
                                    value={endDateModal}
                                    onChange={(e) => {
                                        setEndDate(e.target.value),
                                            setEndDateModal(e.target.value),
                                            console.log(
                                                "Nueva Fecha Fin:",
                                                e.target.value
                                            );
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 mt-4">
                            <button
                                onClick={handleSaveDates}
                                className={`${bgColorBG} text-white px-4 py-2 rounded-md`}
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setShowDateModal(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
