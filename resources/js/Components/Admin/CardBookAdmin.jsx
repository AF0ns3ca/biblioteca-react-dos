import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import InputLabel from "@/Components/InputLabel";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { red, grey } from '@mui/material/colors';

const CardBookAdmin = ({ book }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Almacenar la posición de desplazamiento actual al desmontar el componente
        return () => {
            localStorage.setItem("scrollPosition", window.scrollY.toString());
        };
    }, []);

    

    const handleDeleteBook = () => {
        if (confirm("¿Estás seguro de que deseas eliminar este libro?")) {
            Inertia.delete(route("books.destroy", book.id));
        }
    };

    const initialValues = {
        titulo: book.titulo,
        autor: book.autor,
        serie: book.serie,
        num_serie: book.num_serie,
        descripcion: book.descripcion,
        paginas: book.paginas,
        portada: book.portada ? book.portada : "",
        url_portada: book.url_portada ? book.url_portada : "",
    };

    const { data, setData, patch } = useForm({ ...initialValues });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/update/books/${book.id}`, data, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Actualizar la URL sin recargar la página
                const currentUrl = window.location.href;
                history.replaceState(null, null, currentUrl);
            },
        });
        setShowModal(false);
    };

    const handleCloseModal = (e) => {
        if (e.target.id === "editar") {
            setShowModal(false);
        }
    };

    return (
        <>
            <div className="card flex flex-col gap-3 items-center justify-cente p-3 rounded min-w-[263px]">
                <div className="flex flex-col items-center justify-center gap-5">
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

                    <div className="w-full flex flex-row justify-center items-center gap-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full border-2 border-black text-white font-bold py-2 px-4 rounded"
                        >
                            <EditIcon sx={{color: "#000"}}/>
                        </button>
                        <button
                            onClick={handleDeleteBook}
                            className="w-full border-2 border-red-500 text-white font-bold py-2 px-4 rounded"
                        >
                            <DeleteForeverIcon sx={{color: red[500]}}/>
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div
                    id="editar"
                    className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"
                    onClick={handleCloseModal}
                >
                    <div className="relative p-8 bg-white w-full max-w-md m-6 rounded shadow-lg">
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="mb-4">
                                <InputLabel htmlFor="titulo" value="Titulo" />
                                <input
                                    id="titulo"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-black leading-tight focus:outline-none focus:shadow-outline ring-black"
                                    value={data.titulo}
                                    onChange={(e) =>
                                        setData("titulo", e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <InputLabel htmlFor="autor" value="Autor" />
                                <input
                                    id="autor"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-metallight leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.autor}
                                    onChange={(e) =>
                                        setData("autor", e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <InputLabel htmlFor="serie" value="Serie" />
                                <input
                                    id="serie"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-metallight leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.serie}
                                    onChange={(e) =>
                                        setData("serie", e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <InputLabel
                                    htmlFor="num_serie"
                                    value="Numero de Serie"
                                />
                                <input
                                    id="num_serie"
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-metallight leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.num_serie}
                                    onChange={(e) =>
                                        setData("num_serie", e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <InputLabel
                                    htmlFor="descripcion"
                                    value="Descripcion"
                                />

                                <textarea
                                    id="descripcion"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-metallight leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.descripcion}
                                    onChange={(e) =>
                                        setData("descripcion", e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <InputLabel htmlFor="paginas" value="Paginas" />
                                <input
                                    id="paginas"
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-metallight leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.paginas}
                                    onChange={(e) =>
                                        setData("paginas", e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <InputLabel htmlFor="portada" value="Portada" />
                                <input
                                    id="portada"
                                    type="file"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-metallight leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) =>
                                        setData("portada", e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <InputLabel
                                    htmlFor="url_portada"
                                    value="Portada URL"
                                />
                                <input
                                    id="url_portada"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-metallight leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) =>
                                        setData("url_portada", e.target.value)
                                    }
                                />
                            </div>
                            <div className="w-full flex flex-row justify-center items-center gap-3">
                                <button
                                    type="submit"
                                    className="w-[50%] bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-[50%] bg-red-500 text-white rounded px-4 py-2"
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
        </>
    );
};

export default CardBookAdmin;
