// Importar useState y useEffect si es necesario
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import CardLibrary from "@/Components/CardLibrary";
import AddButton from "@/Components/AddButton";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function Index({ auth, librariesWithBookCount, role }) {
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("Fisica");

    const handleSubmit = (e) => {
        e.preventDefault();
        // enviar la informacion con Inertia y en caso de error, recibir un json convertirlo a string y mostrarlo en un alert
        Inertia.post(
            "/libraries",
            { nombre, tipo },
            {
                preserveScroll: true,
                onSuccess: (response) => {
                    // Si la petición tiene éxito, puedes procesar los datos aquí
                    console.log("Respuesta del servidor:", response);

                    // Por ejemplo, actualizar el estado de tu aplicación
                    setNombre("");
                    setTipo("Fisica");
                },
                onError: (errors) => {
                    // Si la petición falla, puedes mostrar los errores en un alert
                    if (
                        errors.error === "No puedes tener más de 5 bibliotecas."
                    ) {
                        alert(errors.error);
                    } else {
                        alert(Object.values(errors).flat().join("\n"));
                    }
                },
            }
        );

        setShowModal(false); // Cierra la modal después de enviar los datos
    };

    const handleCloseModal = (e) => {
        if (e.target.id === "modal-background") {
            setShowModal(false);
        }
    };

    const handleCreateLibrary = () => {
        setShowAlert(true);
    };

    const handleCloseLibrary = (e) => {
        setShowAlert(false);
    };

    const bgColor = auth.user.role == "user" ? "bg-metal" : "bg-premium";

    return (
        <AuthenticatedLayout
            user={auth.user}
            role={role}
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
                {(librariesWithBookCount.length < 5 &&
                    auth.user.role == "user") ||
                auth.user.role == "premium_user" ? (
                    <div className="fixed bottom-10 right-10 rounded-full">
                        <AddButton
                            color={bgColor}
                            onClick={() => setShowModal(true)}
                        />
                    </div>
                ) : (
                    <div>
                        <div
                            className={`fixed bottom-10 right-10 rounded-full ${bgColor} p-4 text-white`}
                            onClick={handleCreateLibrary}
                        >
                            <WorkspacePremiumIcon />
                        </div>
                        {showAlert && (
                            <div
                                id="modal-alert"
                                className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"
                            >
                                <div className="relative p-8 bg-white w-full max-w-md m-6 rounded shadow-lg flex flex-col gap-5 font-serif text-lg">
                                    <p>
                                        Has llegado al límite de bibliotecas. Para crear más bibliotecas, actualiza a una cuenta premium.
                                    </p>
                                    <button>
                                        <CheckIcon 
                                            sx={{ fill: "#10B981", fontSize: "35px" }}
                                            onClick={handleCloseLibrary}
                                            className="text-center rounded-full border-2 border-green-600 m-3"
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showModal && (
                <div
                    id="modal-background"
                    className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"
                    onClick={handleCloseModal}
                >
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
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-0 right-0 p-4"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
