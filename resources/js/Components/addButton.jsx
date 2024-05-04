import React from 'react';

// Acepta props onClick
export default function AddButton({ onClick }) {
    // Prevent default behavior and execute provided function
    const handleClick = (e) => {
        e.preventDefault();  // Previene la navegación estándar del enlace
        onClick();           // Ejecuta la función pasada a través de props
    };

    return (
        <button onClick={handleClick} className="bg-metal text-white px-4 py-4 rounded-full">
            Añadir Biblioteca
        </button>
    );
};
