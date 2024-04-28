import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";

export default function Index({ auth, book }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={book.titulo} />

            <div className="w-full h-screen mt-4 flex flex-1 items-center justify-center">
                <div className="w-[70%] h-full flex flex-row items-center justify-center gap-6">
                    <div className="w-[30%] flex items-center justify-center">
                        {book.portada ? (
                            <img
                                src={book.portada}
                                alt={book.titulo}
                                className="rounded"
                            />
                        ) : (
                            <div className="w-[240px] h-[380px] bg-gray-300 flex items-center justify-center text-center">
                                <span className="text-2xl font-bold text-gray-600">
                                    {book.titulo}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="w-[70%] flex flex-col justify-start">
                        <h1 className="text-4xl">{book.titulo}</h1>
                        <p className="text-lg">{book.autor}</p>
                        {book.serie ? (
                            <>
                                <p className="text-lg">{book.serie}</p>
                                <p className="text-lg">{book.num_serie}</p>
                            </>
                                                        
                        ) : (
                            <p className="text-lg">Libro único</p>
                        )}
                        {/* Boton para volver a la pagina anterior a la que se estuviese */}
                        <a
                            href={route("books.index")}
                            className="btn btn-primary"
                        >
                            Volver
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
