import React from "react";
import { Inertia } from "@inertiajs/inertia";

const CardLibrary = ({ library }) => {
    const handleDelete = (id) => {
        if (confirm(`¿Estás seguro de que deseas eliminar la biblioteca ${library.nombre}?`)) {
            Inertia.delete(route("libraries.destroy", { id }), {
                onSuccess: () => {
                    window.location.reload();
                },
            });
        }
    };

    return (
        <div className="card flex flex-col gap-3 items-center justify-center bg-gray-200 p-3 rounded min-w-[263px] hover:bg-slate-300">
            <div className="flex flex-col items-center justify-center gap-3">
                <a
                    href={route("libraries.show", library.id)}
                    key={library.id}
                    className="cursor-pointer"
                >
                    <div className="w-full flex flex-col items-center justify-center">
                        {/* Mostrar el nombre de la biblioteca */}
                        <h1 className="text-xl font-bold">{library.nombre}</h1>
                        {/* Mostrar el número de libros, si es igual a 0 poner vacio, sino poner el numero */}
                        <p className="text-gray-600">
                            {library.books_count == 0 ? "Vacía" : library.books_count + " libros"}
                        </p>
                    </div>
                </a>
            </div>
            <div>
                <button
                    onClick={() => handleDelete(library.id)}
                    className="bg-red-500 text-white rounded px-2 py-1"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default CardLibrary;
