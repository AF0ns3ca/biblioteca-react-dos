import React from "react";
import { Inertia } from "@inertiajs/inertia";
import PhysicalLibraryIcon from "@/Components/PhysicalLibraryIcon";
import DigitalLibraryIcon from "@/Components/DigitalLibraryIcon";
import DeleteIcon from "@mui/icons-material/Delete";

const CardLibraryExpand = ({ library }) => {
    const handleDelete = async (id) => {
        if (
            confirm(
                `¿Estás seguro de que deseas eliminar la biblioteca ${library.nombre}?`
            )
        ) {
            await Inertia.delete(route("libraries.destroy", { id }), {
                onSuccess: () => {
                    window.location.reload();
                },
            });
        }
    };

    return (
        <div className="w-full sm:min-w-[304px] flex flex-col items-center justify-between bg-white shadow border min-w-[320px] hover:bg-slate-300 rounded-lg">
            {/* Columna izquierda para el tipo de biblioteca */}
            <div className="w-full flex flex-col items-start justify-center gap-1">
                {library.tipo === "Fisica" ? (
                    <img src="/images/fisica2.jpg" alt="" className="rounded-t" />
                ) : (
                    <img src="/images/digital2.png" alt="" className="rounded-t"/>
                )}
            </div>
            {/* Columna derecha para el nombre, conteo de libros y botón de eliminar */}
            <div className="w-full flex-1 flex flex-row items-start justify-center p-3">
                {/* Condiciona el enlace al método show basado en el conteo de libros */}
                <div className="w-full flex-1 flex flex-col items-start justify-center p-2">
                    {library.books_count > 0 ? (
                        <a
                            href={route("libraries.show", library.id)}
                            className="w-full cursor-pointer flex flex-col items-start"
                        >
                            <h1 className="text-xl font-bold">
                                {library.nombre}
                            </h1>
                            <p className="text-gray-600">
                                {library.books_count} libros
                            </p>
                        </a>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold">
                                {library.nombre}
                            </h1>
                            <p className="text-gray-600">Vacía</p>
                        </>
                    )}
                </div>
                <div className="p-2">
                    <button
                        onClick={() => handleDelete(library.id)}
                        className="bg-red-500 text-white rounded p-2"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardLibraryExpand;
