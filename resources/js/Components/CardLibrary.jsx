import React from "react";
import { Inertia } from "@inertiajs/inertia";
import PhysicalLibraryIcon from "@/Components/PhysicalLibraryIcon";
import DigitalLibraryIcon from "@/Components/DigitalLibraryIcon";
import DeleteIcon from '@mui/icons-material/Delete';

const CardLibrary = ({ library }) => {
    const handleDelete = async (id) => {
        if (confirm(`¿Estás seguro de que deseas eliminar la biblioteca ${library.nombre}?`)) {
            await Inertia.delete(route("libraries.destroy", { id }), {
                onSuccess: () => {
                    window.location.reload();
                },
            });
        }
    };

    return (
        <div className="w-full flex flex-row items-center justify-between bg-white shadow border p-3 min-w-[320px] hover:bg-slate-300 rounded-lg">
            {/* Columna izquierda para el tipo de biblioteca */}
            
            {/* Columna derecha para el nombre, conteo de libros y botón de eliminar */}
            <div className="w-[70%] flex-1 flex flex-col items-start justify-center p-2">
                {/* Condiciona el enlace al método show basado en el conteo de libros */}
                {library.books_count > 0 ? (
                    <a href={route("libraries.show", library.id)} className="w-[full] cursor-pointer flex flex-col items-start">
                        <h1 className="text-sm md:text-lg font-bold">{library.nombre}</h1>
                        <p className="text-gray-600">{library.books_count} libros</p>
                    </a>
                ) : (
                    <div className="w-full">
                        <h1 className="text-xl font-bold">{library.nombre}</h1>
                        <p className="text-gray-600">Vacía</p>
                    </div>
                )}
            </div>
            <div className=" w-[30%] flex flex-col items-start justify-center gap-1 p-2">
                {library.tipo === "Fisica" ? <PhysicalLibraryIcon /> : <DigitalLibraryIcon />}
            </div>
            {/* <div className="p-2">
                <button
                    onClick={() => handleDelete(library.id)}
                    className="bg-red-500 text-white rounded p-2"
                >
                    <DeleteIcon />
                </button>
            </div> */}
        </div>
    );
};

export default CardLibrary;
