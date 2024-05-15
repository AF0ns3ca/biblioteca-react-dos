// Index.js
import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import CardBookAdmin from "@/Components/Admin/CardBookAdmin";
import AddButton from "@/Components/AddButton";
import InputLabel from "@/Components/InputLabel";

export default function Books({ auth, books, libraries }) {
    const [view, setView] = useState(
        () => localStorage.getItem("view") || "cards"
    );
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        localStorage.setItem("view", view);
    }, [view]);

    const initialValues = {
        titulo: "",
        autor: "",
        serie: "",
        num_serie: "",
        descripcion: "",
        portada: "",
        url_portada: "",
    };

    const { data, errors, setData, post } = useForm(initialValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/store/books", data);
        setShowModal(false);
    };

    const handleCloseModal = (e) => {
        if (e.target.id === "crear") {
            // Verifica si se hizo clic en el fondo modal
            setShowModal(false); // Cierra la modal
            data.titulo = ""; // Limpia el campo titulo
            data.autor = ""; // Limpia el campo autor
            data.serie = ""; // Limpia el campo serie
            data.num_serie = ""; // Limpia el campo num_serie
            data.descripcion = ""; // Limpia el campo descripcion
            data.paginas = ""; // Limpia el campo paginas
            data.portada = ""; // Limpia el campo portada
            data.url_portada = ""; // Limpia el campo url_portada
        }
    };

    // const orderBy = (field) => {
    //     switch (field) {
    //         case "titulo":
    //             booksOrdered.sort((a, b) => a.titulo.localeCompare(b.titulo));
    //             break;
    //         case "autor":
    //             booksOrdered.sort((a, b) => a.autor.localeCompare(b.autor));
    //             break;
    //         case "serie":
    //             if (a.serie === null) {
    //                 return 1;
    //             } else if (b.serie === null) {
    //                 return -1;
    //             }
    //             // Se ordena por serie y por numero de serie dentro de la serie
    //             booksOrdered.sort(
    //                 a.serie.localeCompare(b.serie) || a.num_serie - b.num_serie
    //             );

    //             break;
    //         case "num_serie":
    //             booksOrdered.sort((a, b) => a.num_serie - b.num_serie);
    //             break;
    //         default:
    //             break;
    //     }
    // };

    // const booksOrdered = books.sort((a, b) => a.titulo.localeCompare(b.titulo));

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestionar Libros" />
            {/* <AlphabetNav selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} /> */}
            <>
                <div
                    id="cards"
                    className={`w-full ${
                        view === "cards" ? "flex" : "hidden"
                    } pt-24 flex-col items-center justify-center pb-3 bg-white`}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                        {books.map((book) => (
                            <CardBookAdmin
                                book={book}
                                libraries={libraries}
                                key={book.id}
                            />
                        ))}
                    </div>
                    <div className="fixed bottom-10 right-10 rounded-full">
                        <AddButton
                            color={"bg-black"}
                            onClick={() => setShowModal(true)}
                        />
                    </div>
                </div>
                {showModal && (
                    <div
                        id="crear"
                        className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"
                        onClick={handleCloseModal}
                    >
                        <div className="relative p-8 bg-white w-full max-w-md m-6 rounded shadow-lg">
                            <form onSubmit={handleSubmit} className="w-full">
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="titulo"
                                        value="Titulo"
                                    />
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
                                            setData(
                                                "descripcion",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="paginas"
                                        value="Paginas"
                                    />
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
                                    <InputLabel
                                        htmlFor="portada"
                                        value="Portada"
                                    />
                                    <input
                                        id="portada"
                                        type="file"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-metallight leading-tight focus:outline-none focus:shadow-outline"
                                        value={data.portada}
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
                                        value={data.url_portada}
                                        onChange={(e) =>
                                            setData(
                                                "url_portada",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="w-full flex flex-row justify-center items-center gap-3">
                                    <button
                                        type="submit"
                                        className="w-[50%] bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Crear
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
        </AdminLayout>
    );
}
