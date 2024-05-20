import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CardReading from "@/Components/CardReading";
import BasicTab from "@/Components/BasicTab";

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
    console.log(wantToReadBooksCount);
    console.log(readingBooksCount);
    console.log(readBooksCount);

    const [selectedSection, setSelectedSection] = useState(0);

    const handleSectionChange = (sectionIndex) => {
        setSelectedSection(sectionIndex);
    };

    const renderSelectedSection = () => {
        switch (selectedSection) {
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
                            value={selectedSection}
                            onChange={handleSectionChange}
                            role={auth.user.role}
                            want={wantToReadBooksCount}
                            reading={readingBooksCount}
                            read={readBooksCount}
                        />
                    </div>
                    {renderSelectedSection()}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
