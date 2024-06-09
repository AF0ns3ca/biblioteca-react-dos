import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import CardBookAdmin from "@/Components/Admin/CardBookAdmin";
import AddButton from "@/Components/AddButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Loading from "@/Components/Loading";

export default function Books({ auth, books, libraries }) {
    const [view, setView] = useState(
        () => localStorage.getItem("view") || "cards"
    );
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

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
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!data.titulo.trim()) newErrors.titulo = "El título es obligatorio.";
        if (!data.autor.trim()) newErrors.autor = "El autor es obligatorio.";
        if (!data.descripcion.trim())
            newErrors.descripcion = "La descripción es obligatoria.";
        if (!data.paginas) newErrors.paginas = "Las páginas son obligatorias.";
        if (!data.portada && !data.url_portada) {
            // Si no hay portada ni URL de portada, no se valida el campo de la portada
            delete newErrors.portada;
        }
        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        await post("/store/books", data);
        setShowModal(false);
        setData({ ...initialValues });
    };

    const handleCloseModal = (e) => {
        setShowModal(false);
        setData({ ...initialValues });
        setFormErrors({});
    };

    const handleClearPortada = () => {
        setData("portada", "");
    };

    const handleClearUrlPortada = () => {
        setData("url_portada", "");
    };

    const handlePortadaChange = (e) => {
        setData("portada", e.target.files[0]);
    };

    const handleUrlPortadaChange = (e) => {
        setData("url_portada", e.target.value);
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestionar Libros" />
            {loading ? (
                    <div className="w-full h-screen flex items-center justify-center">
                        <Loading />
                    </div>
                ) : (
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
            )}
            {showModal && (
                <div
                    id="crear"
                    className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"
                >
                    <div className="w-full max-w-4xl p-8 bg-white m-6 rounded shadow-lg relative mt-44 md:mt-10">
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                            className="w-full flex flex-col gap-4"
                        >
                            <div className="w-full flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-[50%]">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="titulo"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Título
                                        </label>
                                        <input
                                            id="titulo"
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.titulo}
                                            onChange={(e) =>
                                                setData(
                                                    "titulo",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {formErrors.titulo && (
                                            <p className="text-red-500 text-xs italic">
                                                {formErrors.titulo}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="autor"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Autor
                                        </label>
                                        <input
                                            id="autor"
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.autor}
                                            onChange={(e) =>
                                                setData("autor", e.target.value)
                                            }
                                        />
                                        {formErrors.autor && (
                                            <p className="text-red-500 text-xs italic">
                                                {formErrors.autor}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="serie"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Serie
                                        </label>
                                        <input
                                            id="serie"
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.serie}
                                            onChange={(e) =>
                                                setData("serie", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="num_serie"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Número de Serie
                                        </label>
                                        <input
                                            id="num_serie"
                                            type="number"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.num_serie}
                                            onChange={(e) =>
                                                setData(
                                                    "num_serie",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="paginas"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Páginas
                                        </label>
                                        <input
                                            id="paginas"
                                            type="number"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.paginas}
                                            onChange={(e) =>
                                                setData(
                                                    "paginas",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {formErrors.paginas && (
                                            <p className="text-red-500 text-xs italic">
                                                {formErrors.paginas}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full md:w-[50%] flex flex-col gap-3">
                                    <div className="mb-4 h-full">
                                        <label
                                            htmlFor="descripcion"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Descripción
                                        </label>
                                        <textarea
                                            id="descripcion"
                                            className="shadow appearance-none border rounded w-full h-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                            value={data.descripcion}
                                            onChange={(e) =>
                                                setData(
                                                    "descripcion",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {formErrors.descripcion && (
                                            <p className="text-red-500 text-xs italic text-end">
                                                {formErrors.descripcion}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="mb-4">
                                            <label
                                                htmlFor="portada"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Portada
                                            </label>
                                            <div className="flex flex-row gap-2 justify-center items-center">
                                                <input
                                                    id="portada"
                                                    type="file"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                                    onChange={
                                                        handlePortadaChange
                                                    }
                                                    disabled={
                                                        data.url_portada !== ""
                                                    }
                                                />
                                                <button
                                                    type="reset"
                                                    onClick={handleClearPortada}
                                                    className="bg-red-500 text-white font-bold py-1 px-2 rounded"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="url_portada"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                URL de la Portada
                                            </label>
                                            <div className="flex flex-row gap-2 justify-center items-center">
                                                <input
                                                    id="url_portada"
                                                    type="text"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-metal"
                                                    value={data.url_portada}
                                                    onChange={
                                                        handleUrlPortadaChange
                                                    }
                                                    disabled={
                                                        data.portada !== ""
                                                    }
                                                />
                                                <button
                                                    type="reset"
                                                    onClick={
                                                        handleClearUrlPortada
                                                    }
                                                    className="bg-red-500 text-white font-bold py-1 px-2 rounded"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white font-bold py-2 px-4 rounded"
                                >
                                    Añadir Libro
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
        </AdminLayout>
    );
}
