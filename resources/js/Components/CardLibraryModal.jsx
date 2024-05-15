import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import PhysicalLibraryIcon from "@/Components/PhysicalLibraryIcon";
import DigitalLibraryIcon from "@/Components/DigitalLibraryIcon";


const CardLibraryModal = ({ library }) => {
    const [hasBook, setHasBook] = useState(false); // Estado para almacenar si la biblioteca tiene el libro
    const [scrollPosition, setScrollPosition] = useState(0); // Estado para almacenar la posición de desplazamiento

    useEffect(() => {
        // Verifica si la biblioteca tiene el libro
        const hasBookInLibrary = () => {
            // Aquí debes implementar la lógica para verificar si el libro está presente en la biblioteca
            // Esto podría involucrar una llamada a la API o una consulta a la base de datos
            // Por ahora, estableceremos hasBook en true de forma predeterminada
            setHasBook(true);
        };

        hasBookInLibrary();

        // Almacenar la posición de desplazamiento cuando se monta el componente
        setScrollPosition(window.scrollY);

        // Restaurar la posición de desplazamiento al volver a la página
        window.scrollTo(0, scrollPosition);
    }, []);

    const handleDelete = (id) => {
        if (
            confirm(
                `¿Estás seguro de que deseas eliminar la biblioteca ${library.nombre}?`
            )
        ) {
            Inertia.delete(route("libraries.destroy", { id }), {
                onSuccess: () => {
                    window.location.reload();
                },
            });
        }
    };

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
            {/* <div className="p-2">
                {hasBook ? (
                    <div className="w-5 h-5 bg-red-500 rounded-full"></div> // Indicador visual si la biblioteca tiene el libro
                ) : (
                    <div className="w-5 h-5 bg-green-500 rounded-full"></div> // Indicador visual si la biblioteca no tiene el libro
                )}
            </div> */}
        </div>
    );
};

export default CardLibraryModal;
