import React from "react";
import { Inertia } from "@inertiajs/inertia";

const CardUser = ({ user }) => {
    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            await Inertia.delete(route("admin.userDestroy", user.id), {
                onSuccess: () => {
                    alert("User deleted successfully.");
                },
            });
        }
    };

    // Función para obtener la clase de color de fondo según el rol
    const getBgColor = (role) => {
        switch (role) {
            case 'admin':
                return "bg-black"; // Clase para fondo negro
            case 'user':
                return "bg-metal"; // Clase para fondo metal (asegúrate de tener esta clase en tu CSS)
            case 'premium_user':
                return "bg-premium"; // Clase para fondo premium (asegúrate de tener esta clase en tu CSS)
            default:
                return "bg-white"; // Clase por defecto para otros casos
        }
    };


    return (
        <div className={`w-full flex flex-row justify-center gap-5 ${getBgColor(user.role)} shadow-lg rounded-lg p-6 text-white`}>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex flex-row gap-5">
                    <h2 className="text-2xl font-semibold">
                        {user.name}
                    </h2>
                    <p className="mt-1">{user.email}</p>
                    <p className="mt-1">
                        Tipo de Usuario: {user.role}
                    </p>
                </div>
                <div>
                    {user.role !== "admin" && (
                        <p className="mt-1">
                            {user.libraries_count > 0 ? (
                                `Tiene ${user.libraries_count} bibliotecas`
                            ) : (
                                "No tiene bibliotecas"
                            )}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {user.role !== "admin" ? (
                    <>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    </>
                ) : (
                    <div className="flex justify-center items-center">
                        Administrador
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardUser;
