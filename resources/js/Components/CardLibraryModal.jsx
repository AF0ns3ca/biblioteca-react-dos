import React from "react";
import { Inertia } from "@inertiajs/inertia";
import PhysicalLibraryIcon from "@/Components/PhysicalLibraryIcon";
import DigitalLibraryIcon from "@/Components/DigitalLibraryIcon";

const CardLibraryModal = ({ library, isInLibrary }) => {
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
        <div className="flex flex-row items-center justify-between bg-white shadow p-3 min-w-[320px] hover:bg-slate-300 rounded-lg">
            <div className="flex flex-col items-start justify-center gap-1 p-2">
                {library.tipo === "Fisica" ? <PhysicalLibraryIcon /> : <DigitalLibraryIcon />}
            </div>
            <div className="flex-1 flex flex-col items-start justify-center p-2">
                {library.books_count > 0 ? (
                    <a href={route("libraries.show", library.id)} className="cursor-pointer">
                        <h1 className="text-xl font-bold">{library.nombre}</h1>
                        <p className="text-gray-600">{library.books_count} libros</p>
                    </a>
                ) : (
                    <h1 className="text-xl font-bold">{library.nombre}</h1>
                )}
            </div>
            <div className="p-2">
                <div className="flex items-center">
                    <span className={`h-4 w-4 rounded-full ${isInLibrary ? "bg-red-500" : "bg-green-500"}`}></span>
                </div>
            </div>
        </div>
    );
};

export default CardLibraryModal;
