import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import Card from "@/Components/Card";
import { Inertia } from "@inertiajs/inertia";

export default function Index({
    auth,
    book,
    booksAuthor,
    bookSeries,
    libraries,
}) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={book.titulo} />

            <div className="w-full h-full flex flex-1 items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <div className="w-[80%] h-screen flex flex-row items-center justify-center gap-6">
                        <div className="w-[30%] flex items-center justify-center">
                            {book.portada ? (
                                <img
                                    src={book.portada}
                                    alt={book.titulo}
                                    className="rounded w-[360px] h-[550px]"
                                />
                            ) : (
                                <div className="w-[240px] h-[380px] bg-gray-300 flex items-center justify-center text-center">
                                    <span className="text-2xl font-bold text-gray-600">
                                        {book.titulo}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="w-[70%]">
                            <div className="w-[70%] flex flex-col justify-start">
                                <h1 className="text-4xl">{book.titulo}</h1>
                                <p className="text-lg">
                                    by{" "}
                                    <span
                                        className="text-metal cursor-pointer underline"
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
                                <a
                                    href={route("books.index")}
                                    className="btn btn-primary"
                                >
                                    Volver
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-[70%]">
                        <h2 className="text-2xl">Libros del mismo autor</h2>
                        <div className="w-full flex flex-row overflow-x-scroll m-5">
                            {booksAuthor.map((book) => (
                                <Card
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
        </AuthenticatedLayout>
    );
}
