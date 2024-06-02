import React from "react";
import PhysicalLibraryIcon from "@/Components/PhysicalLibraryIcon";
import DigitalLibraryIcon from "@/Components/DigitalLibraryIcon";

const CardLibraryModal = ({ library, isBookInLibrary }) => {
    return (
        <div className="w-full flex flex-row items-center justify-between bg-white shadow border p-3 min-w-[320px] hover:bg-slate-300 rounded-lg">
            {/* Columna izquierda para el tipo de biblioteca */}
            <div className="flex flex-col items-start justify-center gap-1 p-2">
                {library.tipo === "Fisica" ? (
                    <PhysicalLibraryIcon />
                ) : (
                    <DigitalLibraryIcon />
                )}
            </div>
            {/* Columna derecha para el nombre, conteo de libros y botón de eliminar */}
            <div className="flex-1 flex flex-col items-start justify-center p-2">
                {library.books_count > 0 ? (
                    <>
                        <h1 className="text-xl font-bold">{library.nombre}</h1>
                        <p className="text-gray-600">
                            {library.books_count} libros
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-xl font-bold">{library.nombre}</h1>
                        <p className="text-gray-600">Vacía</p>
                    </>
                )}
            </div>
            {/* Indicador visual si la biblioteca tiene el libro */}
            <div className="p-2">
                <div className={`w-5 h-5 rounded-full ${isBookInLibrary ? 'bg-red-500' : 'bg-green-500'}`}></div>
            </div>
        </div>
    );
};

export default CardLibraryModal;
