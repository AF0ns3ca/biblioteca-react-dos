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
        const filteredBooks = readBooks.filter(
            (book) => new Date(book.end_date).getFullYear() === selectedYear
        );

        console.log("Filtered Books: ", filteredBooks);

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

        // Encontrar el libro más popular
        const mostPopularBook = ratedBooks.reduce((mostPopular, book) =>
            parseFloat(book.rate) > parseFloat(mostPopular.rate)
                ? book
                : mostPopular
        );

        // Calcular el tiempo medio de lectura por libro
        const totalReadingTime = filteredBooks.reduce((total, book) => {
            const startDate = new Date(book.start_date);
            const endDate = new Date(book.end_date);
            const timeDifference = Math.abs(endDate - startDate);
            const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            return total + days;
        }, 0);
        const averageReadingTime = totalReadingTime / totalBooks || 0;

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
                                Total de Libros Leídos en {selectedYear}:{" "}
                                {totalBooks}
                            </h3>
                        </div>
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                            {readBooks.map((book) => (
                                <div key={book.id}>
                                    <CardShow book={book} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="w-full flex flex-col items-center gap-4 bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold">
                                Libro Más Largo
                            </h3>
                            <img
                                src={`${longestBook.portada}`}
                                alt=""
                                className="rounded w-[200px] h-[300px]"
                            />
                            <p>
                                {longestBook?.titulo || "N/A"} (
                                {longestBook?.paginas || 0} páginas)
                            </p>
                        </div>
                        <div className="w-full flex flex-col items-center gap-4 bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold">
                                Libro Más Corto
                            </h3>
                            <img
                                src={`${shortestBook.portada}`}
                                alt=""
                                className="rounded w-[200px] h-[300px]"
                            />
                            <p>
                                {shortestBook?.titulo || "N/A"} (
                                {shortestBook?.paginas || 0} páginas)
                            </p>
                        </div>
                        <div className="w-full flex flex-col items-center gap-4 bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold">
                                Libro Más Popular
                            </h3>
                            <img
                                src={`${mostPopularBook.portada}`}
                                alt=""
                                className="rounded w-[200px] h-[300px]"
                            />
                            <p>
                                {mostPopularBook?.titulo || "N/A"} (
                                {mostPopularBook?.rate || 0} rating)
                            </p>
                        </div>
                    </div>
                    <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold">
                                Total de Páginas
                            </h3>
                            <p className="text-2xl">{totalPages}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold">
                                Rating Medio
                            </h3>
                            <p className="text-2xl">
                                <BasicRating
                                    initialRating={averageRating}   
                                    size={"large"}
                                    readonly={true}
                                />
                                {averageRating.toFixed(2)}
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded shadow-md">
                            <h3 className="text-xl font-semibold">
                                Tiempo Medio de Lectura por Libro
                            </h3>
                            <p className="text-2xl">
                                {averageReadingTime} Días
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
