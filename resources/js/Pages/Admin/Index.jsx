import AdminLayout from "@/Layouts/AdminLayout";
import BookNest from "@/Components/BookNest";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";

export default function Index({
    auth,
    booksCount,
    librariesCount,
    usersCount,
    ratesCount,
    reviewsCount
}) {
    console.log(auth);
    console.log(booksCount);
    console.log(librariesCount);
    console.log(usersCount);
    console.log(ratesCount);

    return (
        <AdminLayout user={auth.user}>
            <Head title="Inicio" />
            <div className="w-full mt-20 h-screen items-center text-center flex justify-center">
                <div className="w-[60%] pt-20 h-screen items-center flex flex-col justify-start">
                    <div className="bg-black text-white rounded flex flex-col items-center justify-center p-3 sm:w-2/3 mb-20">
                        <h1 className="text-4xl mb-2">
                            Book
                            <span className="font-bold text-blue-200">
                                Nest
                            </span>
                        </h1>
                        <p className="text-2xl">Área de administración</p>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                        <div className="">
                            <div className="text-3xl text-gray-700 font-bold">
                                {booksCount}
                            </div>
                            <div className="text-gray-500">Libros</div>
                        </div>
                        <div>
                            <div className="text-3xl text-gray-700 font-bold">
                                {librariesCount}
                            </div>
                            <div className="text-gray-500">Bibliotecas creadas</div>
                        </div>
                        <div>
                            <div className="text-3xl text-gray-700 font-bold">
                                {usersCount}
                            </div>
                            <div className="text-gray-500">Usuarios registrados</div>
                        </div>
                        <div>
                            <div className="text-3xl text-gray-700 font-bold">
                                {ratesCount}
                            </div>
                            <div className="text-gray-500">Libros puntuados</div>
                        </div>
                        <div>
                            <div className="text-3xl text-gray-700 font-bold">
                                {reviewsCount}
                            </div>
                            <div className="text-gray-500">Reseñas Publicadas</div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
