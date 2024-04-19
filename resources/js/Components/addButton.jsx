import React from 'react';
// boton que redirija al metodo create del controlador

export default function AddButton() {
    return (
        <a href={route('libraries.create')} className="bg-metal text-white px-4 py-4 rounded-full">
            Añadir Biblioteca
        </a>
    );
};

