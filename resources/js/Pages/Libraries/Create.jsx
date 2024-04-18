import React, { useState } from "react";
import { Inertia } from '@inertiajs/inertia';



export default function LibraryForm(auth) {
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(nombre);
        console.log(tipo);
        // Enviar los datos del formulario al controlador con metodo store
        Inertia.post("/libraries", {
            nombre: nombre,
            tipo: tipo,
        });

        console.log("Enviado");
        console.log("Enviado");

        // Limpia los campos del formulario después del envío
        setNombre("");
        setTipo("");
    };
    return (
        // formulario para crear una nueva biblioteca


            <div className="w-full h-full flex justify-center items-center">
                <div className="h-full flex py-4 px-14">
                    <form onSubmit={handleSubmit} className="w-full max-w-lg">
                        <div className="mb-4">
                            <label
                                htmlFor="nombre"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
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
                            <label
                                htmlFor="tipo"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Tipo
                            </label>

                            <input
                                id="tipo"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            />
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
