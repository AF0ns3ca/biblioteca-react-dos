import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AddButton from "@/Components/AddButton";

const CardBookAdmin = ({ book, libraries }) => {
    return (
        <div className="card flex flex-col gap-3 items-center justify-cente p-3 rounded min-w-[263px]">
            <div className="flex flex-col items-center justify-center gap-5">
                {/* Contenido del libro */}
                {/*  enlace a show del libro*/}
                <a
                    href={route("books.show", book.id)}
                    key={book.id}
                    className="cursor-pointer"
                >
                    <div>
                        {book.portada ? (
                            <img
                                src={book.portada}
                                alt={book.titulo}
                                className="w-[240px] h-[380px] rounded"
                            />
                        ) : (
                            <div className="w-[240px] h-[380px] bg-gray-300 flex items-center justify-center text-center rounded-lg">
                                <span className="text-2xl font-bold text-gray-600">
                                    {book.titulo}
                                </span>
                            </div>
                        )}
                    </div>
                </a>

                <div className="hidden">
                    <h2 className="titulo">{book.titulo}</h2>
                    <p className="autor">{book.autor}</p>
                    <p className="serie">
                        {book.serie ? book.serie : "Standalone"}{" "}
                        {book.numero ? `#${book.num_serie}` : ""}
                    </p>
                </div>

                {/* Botón "Añadir a" */}
                <div className="w-full flex flex-row justify-center items-center gap-2">
                    {/* Botones de editar y eliminar */}
                    <button
                        onClick={() =>
                            Inertia.get(route("books.edit", book.id))
                        }
                        className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Editar
                    </button>
                    {/* Hacer un boton con handle destroy */}
                    <button
                        onClick={() => {
                            if (
                                confirm(
                                    "¿Estás seguro de que quieres eliminar este libro?"
                                )
                            ) {
                                Inertia.delete(
                                    route("books.destroy", book.id),
                                    {
                                        onSuccess: () => {
                                            alert(
                                                "¡Libro eliminado correctamente!"
                                            );
                                        },
                                    }
                                );
                            }
                        }}
                        className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Eliminar
                    </button>
                </div>
                <div className="fixed bottom-10 right-10 rounded-full">
                    <AddButton color={"bg-black"} onClick={() => setShowModal(true)} />
                </div>
            </div>
        </div>
    );
};

export default CardBookAdmin;
