import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import CardBookAdmin from "@/Components/Admin/CardBookAdmin";
import AddButton from "@/Components/AddButton";
import InputLabel from "@/Components/InputLabel";

export default function Books({ auth, books, libraries }) {
    const [view, setView] = useState(() => localStorage.getItem("view") || "cards");
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
        paginas: "",
        portada: "",
        url_portada: "",
    };

    const { data, errors, setData, post } = useForm(initialValues);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await post("/store/books", data);
        setShowModal(false);
        // Clear the form data after submission
        setData({ ...initialValues });
    };

    const handleCloseModal = (e) => {
        if (e.target.id === "crear") {
            setShowModal(false);
            // Clear the form data when modal is closed
            setData({ ...initialValues });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestionar Libros" />
            <div id="cards" className={`w-full ${view === "cards" ? "flex" : "hidden"} pt-24 flex-col items-center justify-center pb-3 bg-white`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {books.map((book) => (
                        <CardBookAdmin book={book} libraries={libraries} key={book.id} />
                    ))}
                </div>
                <div className="fixed bottom-10 right-10 rounded-full">
                    <AddButton color={"bg-black"} onClick={() => setShowModal(true)} />
                </div>
            </div>
            {showModal && (
                <div id="crear" className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center" onClick={handleCloseModal}>
                    <div className="w-full max-w-4xl p-8 bg-white m-6 rounded shadow-lg relative mt-44 md:mt-10">
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-full flex flex-col gap-4">
                            <div className="w-full flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-[50%]">
                                    <div className="mb-4">
                                        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                                            Título
                                        </label>
                                        <input
                                            id="titulo"
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.titulo}
                                            onChange={(e) => setData("titulo", e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="autor" className="block text-sm font-medium text-gray-700">
                                            Autor
                                        </label>
                                        <input
                                            id="autor"
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.autor}
                                            onChange={(e) => setData("autor", e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="serie" className="block text-sm font-medium text-gray-700">
                                            Serie
                                        </label>
                                        <input
                                            id="serie"
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.serie}
                                            onChange={(e) => setData("serie", e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="num_serie" className="block text-sm font-medium text-gray-700">
                                            Número de Serie
                                        </label>
                                        <input
                                            id="num_serie"
                                            type="number"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.num_serie}
                                            onChange={(e) => setData("num_serie", e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="paginas" className="block text-sm font-medium text-gray-700">
                                            Páginas
                                        </label>
                                        <input
                                            id="paginas"
                                            type="number"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.paginas}
                                            onChange={(e) => setData("paginas", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-[50%] flex flex-col gap-3">
                                    <div className="mb-4 h-full">
                                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                                            Descripción
                                        </label>
                                        <textarea
                                            id="descripcion"
                                            className="shadow appearance-none border rounded w-full h-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.descripcion}
                                            onChange={(e) => setData("descripcion", e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="mb-4">
                                            <label htmlFor="portada" className="block text-sm font-medium text-gray-700">
                                                Portada
                                            </label>
                                            <input
                                                id="portada"
                                                type="file"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                                onChange={(e) => setData("portada", e.target.files[0])}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="url_portada" className="block text-sm font-medium text-gray-700">
                                                URL de la Portada
                                            </label>
                                            <input
                                                id="url_portada"
                                                type="text"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                                value={data.url_portada}
                                                onChange={(e) => setData("url_portada", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">
                                    Añadir Libro
                                </button>
                            </div>
                        </form>
                        <button onClick={() => setShowModal(false)} className="absolute top-0 right-0 p-4">
                            X
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
