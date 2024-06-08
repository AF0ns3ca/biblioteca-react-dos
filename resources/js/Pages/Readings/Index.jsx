import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CardReading from "@/Components/CardReading";
import BasicTab from "@/Components/BasicTab";
import CardShow from "@/Components/CardShow";
import BasicRating from "@/Components/BasicRating";

export default function Index({
    auth,
    wantToReadBooks,
    readingBooks,
    readBooks,
    wantToReadBooksCount,
    readingBooksCount,
    readBooksCount,
    librariesWithBookCount,
}) {
    const [selectedSectionReading, setselectedSectionReading] = useState(() => {
        const storedselectedSectionReading = localStorage.getItem(
            "selectedSectionReading"
        );
        return storedselectedSectionReading
            ? parseInt(storedselectedSectionReading)
            : 0;
    });

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        localStorage.setItem("selectedSectionReading", selectedSectionReading);
    }, [selectedSectionReading]);

    const handleSectionChange = (sectionIndex) => {
        setselectedSectionReading(sectionIndex);
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const renderReadingSummary = () => {
        console.log(readBooks);
        // const filteredBooks = readBooks.filter(
        //     (book) => new Date(book.end_date).getFullYear() === selectedYear
        // );
        const filteredBooks = readBooks.filter((book) => {
            // Filtrar las lecturas del libro por el año seleccionado
            const readingsInSelectedYear = book.readings.filter((reading) => {
                return (
                    new Date(reading.end_date).getFullYear() === selectedYear
                );
            });
            // Incluir el libro si tiene al menos una lectura en el año seleccionado
            return readingsInSelectedYear.length > 0;
        });

        console.log(filteredBooks);

        if (filteredBooks.length === 0) {
            return (
                <div className="w-full flex flex-col items-center gap-4">
                    <div className="w-[20%] flex flex-col items-center">
                        <label
                            htmlFor="year-select"
                            className="text-lg text-gray-700"
                        >
                            Selecciona el Año:
                        </label>
                        <select
                            id="year-select"
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="w-[50%] mt-2 p-2 border rounded"
                        >
                            {[...Array(10).keys()].map((i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <p className="text-lg text-gray-600">
                        No hay registros de lectura para el año {selectedYear}.
                    </p>
                </div>
            );
        }

        const totalBooks = filteredBooks.length;
        const totalPages = filteredBooks.reduce(
            (total, book) => total + parseInt(book.paginas, 10),
            0
        );
        const longestBook = filteredBooks.reduce(
            (longest, book) =>
                parseInt(book.paginas, 10) > parseInt(longest.paginas, 10)
                    ? book
                    : longest,
            filteredBooks[0] || {}
        );
        const shortestBook = filteredBooks.reduce(
            (shortest, book) =>
                parseInt(book.paginas, 10) < parseInt(shortest.paginas, 10)
                    ? book
                    : shortest,
            filteredBooks[0] || {}
        );
        const ratedBooks = filteredBooks.filter(
            (book) =>
                book.rate !== null &&
                book.rate !== undefined &&
                book.rate !== ""
        );

        const averageRating =
            ratedBooks.reduce((sum, book) => sum + parseFloat(book.rate), 0) /
                ratedBooks.length || 0;

        console.log(ratedBooks.length);
        // Encontrar el libro más popular
        var mostPopularBook = {};
        if (ratedBooks.length === 0) {
            mostPopularBook = null;
        } else if (ratedBooks.length > 0) {
            mostPopularBook = filteredBooks.reduce((mostPopular, book) =>
                parseFloat(book.rate) > parseFloat(mostPopular.rate)
                    ? book
                    : mostPopular
            );
            console.log(mostPopularBook.rate);
        }

        // Calcular el tiempo medio de lectura por libro
        const totalReadingTime = filteredBooks.reduce((total, book) => {
            // Filtrar las lecturas por el año seleccionado
            const readingsForSelectedYear = book.readings.filter((reading) => {
                const endDate = new Date(reading.end_date);
                return endDate.getFullYear() === selectedYear;
            });

            // Sumar el tiempo de lectura de todas las lecturas del libro para el año seleccionado
            const bookTotalReadingTime = readingsForSelectedYear.reduce(
                (bookTotal, reading) => {
                    const startDate = new Date(reading.start_date);
                    const endDate = new Date(reading.end_date);
                    const timeDifference = Math.abs(endDate - startDate);
                    const days = Math.ceil(
                        timeDifference / (1000 * 60 * 60 * 24)
                    );
                    return bookTotal + days;
                },
                0
            );

            return total + bookTotalReadingTime;
        }, 0);
        const averageReadingTime = totalReadingTime / totalBooks || 0;

        const mostPopularBookRate = mostPopularBook.rate;

        return (
            <div className="w-full flex flex-col items-center gap-4">
                <div className="w-full md:w-[20%] flex flex-col items-center">
                    <label
                        htmlFor="year-select"
                        className="text-lg text-gray-700"
                    >
                        Selecciona el Año:
                    </label>
                    <select
                        id="year-select"
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="w-[50%] mt-2 p-2 border rounded"
                    >
                        {[...Array(10).keys()].map((i) => {
                            const year = new Date().getFullYear() - i;
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="w-full">
                    <div className="w-full flex flex-col items-center bg-white p-4 rounded shadow-md">
                        <div className="flex flex-row">
                            <h3 className="text-xl font-semibold">
                                Has leído {totalBooks} libros en {selectedYear}
                            </h3>
                        </div>
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                            {filteredBooks.map((book) => (
                                <div key={book.id}>
                                    <CardShow book={book} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="w-full flex flex-col items-center gap-4 bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold">
                                Libro más largo
                            </h3>
                            <a
                                href={route("books.show", longestBook.id)}
                                key={longestBook.id}
                                className="cursor-pointer"
                            >
                                <img
                                    src={`${longestBook.portada}`}
                                    alt=""
                                    className="rounded w-[200px] h-[300px]"
                                />
                            </a>
                            <p>
                                {longestBook?.titulo || "N/A"} (
                                {longestBook?.paginas || 0} páginas)
                            </p>
                        </div>
                        <div className="w-full flex flex-col items-center gap-4 bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold">
                                Libro más corto
                            </h3>
                            <a
                                href={route("books.show", shortestBook.id)}
                                key={shortestBook.id}
                                className="cursor-pointer"
                            >
                                <img
                                    src={`${shortestBook.portada}`}
                                    alt=""
                                    className="rounded w-[200px] h-[300px]"
                                />
                            </a>
                            <p>
                                {shortestBook?.titulo || "N/A"} (
                                {shortestBook?.paginas || 0} páginas)
                            </p>
                        </div>
                        <div className="w-full flex flex-col items-center gap-4 bg-white p-4 rounded shadow-md">
                            {mostPopularBook === null ? (
                                <div className="w-full flex flex-col items-center justify-center gap-4 bg-white p-6 rounded">
                                    <div className="flex flex-col items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-16 w-16 text-yellow-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 2 l2 6 h6 l-5 4 2 6-5-4-5 4 2-6-5-4 h6 z"
                                            />
                                        </svg>
                                        <h3 className="text-xl font-semibold text-gray-700 mt-4">
                                            No hay libros puntuados
                                        </h3>
                                        <p className="text-gray-500 mt-2 text-center">
                                            ¡Anímate a puntuar tus libros
                                            favoritos y ayudar a otros lectores!
                                            ¡Accede a tu página de libros leídos
                                            y puntúa!
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-semibold">
                                        Libro más popular
                                    </h3>
                                    <a
                                        href={route(
                                            "books.show",
                                            mostPopularBook.id
                                        )}
                                        key={mostPopularBook.id}
                                        className="cursor-pointer"
                                    >
                                        <img
                                            src={`${mostPopularBook.portada}`}
                                            alt=""
                                            className="rounded w-[200px] h-[300px]"
                                        />
                                    </a>
                                    <p className="w-full flex flex-col items-center">
                                        {mostPopularBook?.titulo || "N/A"}
                                        <p className="w-full flex items-center justify-center">
                                            <BasicRating
                                                initialRating={mostPopularBookRate}
                                                readonly={true}
                                            />
                                        </p>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold">
                                Total de páginas leídas
                            </h3>
                            <p className="text-2xl">{totalPages}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold">
                                Valoración Media
                            </h3>
                            <p className="text-2xl flex flex-row gap-4">
                                {averageRating.toFixed(2)}
                                <BasicRating
                                    initialRating={averageRating}
                                    size={"large"}
                                    readonly={true}
                                />
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold">
                                Tiempo Medio de Lectura por Libro
                            </h3>
                            <p className="text-2xl">
                                {averageReadingTime.toFixed(2)} Días
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderselectedSectionReading = () => {
        switch (selectedSectionReading) {
            case 0:
                return (
                    <div
                        className="opacity-100 transition-opacity ease-in-out w-full flex flex-col gap-10"
                        key={0}
                    >
                        {wantToReadBooksCount > 0 ? (
                            wantToReadBooks.map((book) => (
                                <CardReading
                                    key={book.id}
                                    book={book}
                                    auth={auth}
                                    librariesWithBookCount={
                                        librariesWithBookCount
                                    }
                                />
                            ))
                        ) : (
                            <div className="text-center">
                                <p className="text-lg text-gray-600">
                                    No tienes libros en tu lista de "Quiero
                                    Leer".
                                </p>
                                <a
                                    href="/books"
                                    className="text-blue-500 hover:underline"
                                >
                                    Descubre libros
                                </a>
                            </div>
                        )}
                    </div>
                );
            case 1:
                return (
                    <div
                        className="opacity-100 transition-opacity ease-in-out w-full flex flex-col gap-10"
                        key={1}
                    >
                        {readingBooksCount > 0 ? (
                            readingBooks.map((book) => (
                                <CardReading
                                    key={book.id}
                                    book={book}
                                    auth={auth}
                                    librariesWithBookCount={
                                        librariesWithBookCount
                                    }
                                />
                            ))
                        ) : (
                            <div className="text-center">
                                <p className="text-lg text-gray-600">
                                    No tienes libros en tu lista de "Leyendo".
                                </p>
                                <a
                                    href="/books"
                                    className="text-blue-500 hover:underline"
                                >
                                    Descubre libros
                                </a>
                            </div>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div
                        className="opacity-100 transition-opacity ease-in-out w-full flex flex-col gap-10"
                        key={2}
                    >
                        {readBooksCount > 0 ? (
                            readBooks.map((book) => (
                                <CardReading
                                    key={book.id}
                                    book={book}
                                    auth={auth}
                                    librariesWithBookCount={
                                        librariesWithBookCount
                                    }
                                />
                            ))
                        ) : (
                            <div className="text-center">
                                <p className="text-lg text-gray-600">
                                    No tienes libros en tu lista de "Leído".
                                </p>
                                <a
                                    href="/books"
                                    className="text-blue-500 hover:underline"
                                >
                                    Descubre libros
                                </a>
                            </div>
                        )}
                    </div>
                );
            case 3:
                return renderReadingSummary();
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mis Lecturas" />
            <div className="w-full h-full flex justify-center items-center">
                <div className="mt-20 w-full max-w-6xl px-4">
                    <div className="flex">
                        <BasicTab
                            value={selectedSectionReading}
                            onChange={handleSectionChange}
                            role={auth.user.role}
                            want={wantToReadBooksCount}
                            reading={readingBooksCount}
                            read={readBooksCount}
                            summary={true} // Añadido para la pestaña de resumen
                        />
                    </div>
                    {renderselectedSectionReading()}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
