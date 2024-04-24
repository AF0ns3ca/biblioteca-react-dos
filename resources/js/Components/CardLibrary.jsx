import React from "react";
import { Inertia } from "@inertiajs/inertia";
import PhysicalLibraryIcon from "@/Components/PhysicalLibraryIcon";
import DigitalLibraryIcon from "@/Components/DigitalLibraryIcon";

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
        <div className="card flex flex-row items-center justify-between bg-white shadow p-3 min-w-[320px] hover:bg-slate-300 rounded-lg">
            {/* Columna izquierda para el tipo de biblioteca */}
            <div className="flex flex-col items-start justify-center gap-1 p-2">
                {library.tipo === "Fisica" ? <PhysicalLibraryIcon /> : <DigitalLibraryIcon />}
            </div>
            {/* Columna derecha para el nombre, conteo de libros y botón de eliminar */}
            <div className="flex-1 flex flex-col items-start justify-center p-2">
                {/* Condiciona el enlace al método show basado en el conteo de libros */}
                {library.books_count > 0 ? (
                    <a href={route("libraries.show", library.id)} className="cursor-pointer">
                        <h1 className="text-xl font-bold">{library.nombre}</h1>
                        <p className="text-gray-600">{library.books_count} libros</p>
                    </a>
                ) : (
                    <>
                        <h1 className="text-xl font-bold">{library.nombre}</h1>
                        <p className="text-gray-600">Vacía</p>
                    </>
                )}
            </div>
            <div className="p-2">
                <button
                    onClick={() => handleDelete(library.id)}
                    className="bg-red-500 text-white rounded px-2 py-1"
                >
                    <span className="text-xl">✕</span> {/* Unicode 'X' para el botón */}
                </button>
            </div>
        </div>
    );
};

export default CardLibrary;
