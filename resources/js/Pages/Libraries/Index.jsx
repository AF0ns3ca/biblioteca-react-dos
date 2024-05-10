// Importar useState y useEffect si es necesario
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import CardLibrary from "@/Components/CardLibrary";
import AddButton from "@/Components/AddButton";

export default function Index({ auth, librariesWithBookCount }) {
    const [showModal, setShowModal] = useState(false);
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("Fisica");

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/libraries", { nombre, tipo });
        setShowModal(false); // Cierra la modal después de enviar los datos
    };

    const handleCloseModal = (e) => {
        if (e.target.id === "modal-background") {
            setShowModal(false);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight mt-16">
                    Bibliotecas de {auth.user.name}
                </h2>
            }
        >
            <Head title="Bibliotecas" />
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-[70%] h-full flex py-4 px-14">
                    {/* Cambiar a grid cols y cambiar los width para volver atras, poner boton para cambiar la vista de cuadrícula a alargado */}
                    <div className="w-full grid grid-rows-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4 lgxl:grid-rows-4 gap-10">
                        {librariesWithBookCount.map((library) => (
                            <CardLibrary key={library.id} library={library} />
                        ))}
                    </div>
                </div>
                <div className="fixed bottom-10 right-10 rounded-full">
                    <AddButton color={"bg-metal"} onClick={() => setShowModal(true)} />
                </div>
            </div>

            {showModal && (
                <div id="modal-background" className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"  onClick={handleCloseModal}>
                    <div className="relative p-8 bg-white w-full max-w-md m-6 rounded shadow-lg">
                        <form onSubmit={handleSubmit} className="w-full">
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
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-metallight leading-tight focus:outline-none focus:shadow-outline"
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
                            <div className="w-full flex items-center justify-center gap-5">
                                <button
                                    type="submit"
                                    className="bg-metal text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Crear
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-red-500 text-white rounded px-4 py-2"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                        <button onClick={() => setShowModal(false)} className="absolute top-0 right-0 p-4">
                            X
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
