import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { red } from "@mui/material/colors";

const CardBookAdmin = ({ book }) => {
    const [showModal, setShowModal] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        // Almacenamos la posición de desplazamiento actual al desmontar el componente
        return () => {
            localStorage.setItem("scrollPosition", window.scrollY.toString());
        };
    }, []);

    const handleDeleteBook = async () => {
        if (confirm("¿Estás seguro de que deseas eliminar este libro?")) {
            await Inertia.delete(route("books.destroy", book.id));
        }
    };

    const initialValues = {
        titulo: book.titulo,
        autor: book.autor,
        serie: book.serie,
        num_serie: book.num_serie,
        descripcion: book.descripcion,
        paginas: book.paginas,
        portada: "",
        url_portada: "",
    };

    const { data, setData, post } = useForm({ ...initialValues });

    const validateForm = () => {
        const newErrors = {};
        if (!data.titulo) newErrors.titulo = "El título es obligatorio.";
        if (!data.autor) newErrors.autor = "El autor es obligatorio.";
        if (!data.descripcion)
            newErrors.descripcion = "La descripción es obligatoria.";
        if (!data.portada && !data.url_portada) {
            // Si no hay portada ni URL de portada, se excluye la validación del campo de las páginas
            if (!data.paginas) {
                newErrors.paginas = "El número de páginas es obligatorio.";
            }
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setFormErrors(formErrors);
            return;
        }

        // Crea un nuevo objeto FormData para enviar los datos del formulario, incluyendo el archivo
        const formData = new FormData();
        formData.append("_method", "PATCH"); // Simula un envío PUT
        formData.append("titulo", data.titulo.trim() !== "" ? data.titulo : "");
        formData.append("autor", data.autor.trim() !== "" ? data.autor : "");
        formData.append("serie", data.serie != null ? data.serie : "");
        formData.append(
            "num_serie",
            data.num_serie != null ? data.num_serie : ""
        );
        formData.append(
            "descripcion",
            data.descripcion.trim() !== "" ? data.descripcion : ""
        );
        formData.append("paginas", data.paginas != null ? data.paginas : "");
        formData.append("portada", data.portada);
        formData.append("url_portada", data.url_portada);

        await Inertia.post(route("books.update", book.id), formData, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Se actualiza la URL sin recargar la página
                const currentUrl = window.location.href;
                history.replaceState(null, null, currentUrl);
            },
        });
        setShowModal(false);
        setData({ ...initialValues });
        setFormErrors({});
    };

    const handleCloseModal = () => {
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

    const realPortada = book.portada
        ? book.portada.startsWith("http")
            ? book.portada
            : book.portada.replace(/^public\//, "/storage/")
        : null;

    return (
        <>
            <div className="card flex flex-col gap-3 items-center justify-center p-3 rounded min-w-[263px]">
                <div className="flex flex-col items-center justify-center gap-5">
                    <a
                        href={route("books.show", book.id)}
                        key={book.id}
                        className="cursor-pointer"
                    >
                        <div>
                            {book.portada ? (
                                <img
                                    src={realPortada}
                                    alt={book.titulo}
                                    className="w-[240px] h-[380px] rounded"
                                />
                            ) : (
                                <div className="w-[240px] h-[380px] bg-gray-300 flex flex-col items-center justify-center text-center rounded-lg">
                                    <span className="text-2xl font-bold text-gray-600">
                                        {book.titulo}
                                    </span>
                                    <span className="font-bold text-gray-600">
                                        by {book.autor}
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
                            {book.num_serie ? `#${book.num_serie}` : ""}
                        </p>
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full border-2 border-black text-white font-bold py-2 px-4 rounded"
                        >
                            <EditIcon sx={{ color: "#000" }} />
                        </button>
                        <button
                            onClick={handleDeleteBook}
                            className="w-full border-2 border-red-500 text-white font-bold py-2 px-4 rounded"
                        >
                            <DeleteForeverIcon sx={{ color: red[500] }} />
                        </button>
                    </div>
                </div>
            </div>
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
                                    Guardar
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
