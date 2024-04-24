import React, { useState } from "react";
import { Inertia } from '@inertiajs/inertia';

export default function LibraryForm(auth) {
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("Fisica"); // Pre-seleccionamos "Fisica" como valor inicial

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nombre, tipo);
        
        // Enviar los datos del formulario al servidor
        Inertia.post("/libraries", {
            nombre: nombre,
            tipo: tipo,
        });

        // Limpiar los campos del formulario después del envío
        setNombre("");
        setTipo("Fisica"); // Restablecer a "Fisica" tras enviar
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex py-4 px-14">
                <form onSubmit={handleSubmit} className="w-full max-w-lg">
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="tipo" className="block text-gray-700 text-sm font-bold mb-2">
                            Tipo
                        </label>
                        <select
                            id="tipo"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="Fisica">Física</option>
                            <option value="Digital">Digital</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
