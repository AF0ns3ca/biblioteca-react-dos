import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import CardLibraryExpand from "@/Components/CardLibraryExpand";
import AddButton from "@/Components/AddButton";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Alert from "@mui/material/Alert";

export default function Index({ auth, librariesWithBookCount, role }) {
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("Fisica");
    const [nombreError, setNombreError] = useState(""); // Nuevo estado para el error del nombre

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
                    if (errors.error === "No puedes tener más de 5 bibliotecas.") {
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

    const handleCloseLibrary = () => {
        setShowAlert(false);
    };

    const handleCloseAlert = (e) => {
        if (e.target.id === "modal-alert") {
            setShowAlert(false);
        }
    };

    const bgColor = auth.user.role === "user" ? "bg-metal" : "bg-premium";
    const color = auth.user.role === "user" ? "text-black" : "text-white";

    return (
        <AuthenticatedLayout user={auth.user} role={role}>
            <Head title="Bibliotecas" />
            <div className="w-full mt-20 h-full flex flex-col justify-center items-center">
                {librariesWithBookCount.length === 0 && (
                    <div className="flex flex-col items-center justify-center my-10">
                        <h1 className="text-3xl mb-4">
                            ¡Bienvenido a BookNest, {auth.user.name}!
                        </h1>
                        <p className="text-lg mb-4">
                            Parece que aún no has creado ninguna biblioteca. Crea una para empezar a organizar tus libros y disfrutar de todas las funciones que ofrece BookNest.
                        </p>
                        <button
                            className="bg-metal text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setShowModal(true)}
                        >
                            Crear biblioteca
                        </button>
                    </div>
                )}
                {librariesWithBookCount.length > 0 && (
                    <>
                        <h1 className="p-5 text-5xl font-serif">
                            Tus bibliotecas, {auth.user.name}
                        </h1>
                        <div className="w-full px-5 sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[70%] flex items-center justify-center py-4 ">
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-content-center gap-10">
                                {librariesWithBookCount.map((library) => (
                                    <CardLibraryExpand
                                        key={library.id}
                                        library={library}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {((librariesWithBookCount.length < 5 &&
                    auth.user.role === "user") ||
                    auth.user.role !== "user") && (
                    <div className="fixed bottom-10 right-10 rounded-full">
                        <AddButton
                            color={bgColor}
                            onClick={() => setShowModal(true)}
                        />
                    </div>
                )}
                {librariesWithBookCount.length >= 5 &&
                    auth.user.role === "user" && (
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
                                    onClick={handleCloseAlert}
                                >
                                    <div className="relative p-8 bg-white w-full max-w-md m-6 rounded shadow-lg flex flex-col gap-5 font-serif text-lg">
                                        <p>
                                            Has llegado al límite de bibliotecas. Para crear más bibliotecas, actualiza a una cuenta premium.
                                        </p>
                                        <button>
                                            <WorkspacePremiumIcon
                                                sx={{
                                                    fill: "#602F6B",
                                                    fontSize: "35px",
                                                }}
                                                onClick={handleCloseLibrary}
                                                className="text-center rounded-ful m-3"
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
                                {nombreError && (
                                    <p className="text-red-500 italic">{nombreError}</p>
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
                                    className="w-full bg-metal text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Crear
                                </button>
                                <button
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
        </AuthenticatedLayout>
    );
}
