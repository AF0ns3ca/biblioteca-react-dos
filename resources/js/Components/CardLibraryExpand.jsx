import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CardLibraryExpand = ({ auth, library }) => {
    const [showModal, setShowModal] = useState(false);
    const [nombre, setNombre] = useState(library.nombre);
    const [tipo, setTipo] = useState(library.tipo);
    const [nombreError, setNombreError] = useState("");

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

    useEffect(() => {
        setNombre(library.nombre);
        setTipo(library.tipo);
    }, [library]);

    // const handleUpdateLibrary = async (id) => {
    //     await Inertia.put(
    //         route("libraries.update", { id }),
    //         {
    //             nombre: libraryName,
    //             tipo: libraryType,
    //         },
    //         {
    //             onSuccess: () => {
    //                 setShowModal(false);
    //             },
    //         }
    //     );
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar el campo nombre
        if (!nombre.trim()) {
            setNombreError("El nombre es obligatorio.");
            return;
        } else {
            setNombreError("");
        }

        // Enviar la información con Inertia y manejar los errores
        Inertia.put(
            route("libraries.update", { id: library.id }),
            { nombre, tipo },
            {
                preserveScroll: true,
                onSuccess: (response) => {
                    console.log("Respuesta del servidor:", response);
                    setShowModal(false);
                },
                onError: (errors) => {
                    if (errors.error === "No puedes tener más de 5 bibliotecas.") {
                        alert(errors.error);
                    } else {
                        alert(Object.values(errors).flat().join("\n"));
                    }
                },
            }
        );
    };

    const bgColorBG = auth.user.role === "user" ? "bg-metal" : "bg-premium";

    return (
        <div className="w-full sm:min-w-[304px] flex flex-col items-center justify-between bg-white shadow border min-w-[320px] hover:bg-slate-300 rounded-lg">
            <div className="w-full flex flex-col items-start justify-center gap-1">
                {library.tipo === "Fisica" ? (
                    <img
                        src="/images/fisica2.jpg"
                        alt=""
                        className="rounded-t"
                    />
                ) : (
                    <img
                        src="/images/digital2.png"
                        alt=""
                        className="rounded-t"
                    />
                )}
            </div>
            <div className="w-full flex-1 flex flex-row items-start justify-center p-3">
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
                <div className="flex flex-row p-2 gap-3">
                    <button
                        onClick={() => setShowModal(true)}
                        title="Editar biblioteca"
                        className={`${bgColorBG} text-white p-2 rounded-md w-full`}
                    >
                        <EditIcon />
                    </button>
                    <button
                        onClick={() => handleDelete(library.id)}
                        className="bg-red-500 text-white rounded p-2"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>
            {showModal && (
                <div
                    id="modal-background"
                    className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="relative p-8 bg-white w-full max-w-md m-6 rounded shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
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
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                                {nombreError && (
                                    <p className="text-red-500 italic">
                                        {nombreError}
                                    </p>
                                )}
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
                                    className={`w-full ${bgColorBG} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="w-full bg-red-500 text-white rounded px-4 py-2"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-0 right-0 p-4"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardLibraryExpand;
