import React, { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { red } from "@mui/material/colors";
import BasicRating from "./BasicRating";

const CardReview = ({ review, auth }) => {
    const [reviewModal, setReviewModal] = useState(false);

    const initialValues = {
        review: review.review,
    };

    const { data, setData, patch, delete: destroy } = useForm(initialValues);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        patch(`/reviews/update/${review.id}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Actualizar la URL sin recargar la página
                const currentUrl = window.location.href;
                history.replaceState(null, null, currentUrl);
            },
        });
        setReviewModal(false);
    };

    const handleDeleteReview = () => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta reseña? Esta acción no se puede deshacer.');
        if (confirmed) {
            destroy(`/reviews/${review.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Review deleted successfully');
                },
            });
        }
    };

    const color = auth.role === "user" ? "metal" : "premium";
    const colorbtn = auth.role === "user" ? "#34495E" : "#602F6B";

    return (
        <div className="w-full flex flex-col gap-4 border-b-2 pb-5">
            <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                    <div className="w-[52px] h-[50px] rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                        <span className="text-xl">
                            {review.user.name.charAt(0)}
                        </span>
                    </div>
                    <div className="w-full flex flex-col">
                        <p className="text-lg font-semibold">
                            {review.user.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            {formatDate(review.created_at)}
                        </p>
                        <div className="pt-3">
                            <BasicRating
                                book={review.book}
                                initialRating={review.book.rate}
                                readonly={true}
                            />
                        </div>
                    </div>
                    {auth.id === review.user.id && (
                        <div className="flex flex-row gap-5">
                            <button
                                className={`text-${color} text-sm font-semibold`}
                                onClick={() => setReviewModal(true)}
                                title="Editar reseña"
                            >
                                <EditIcon sx={{ color: colorbtn }} />
                            </button>
                            <button
                                className="text-red-500 text-sm font-semibold"
                                onClick={handleDeleteReview}
                                title="Eliminar reseña"
                            >
                                <DeleteForeverIcon sx={{ color: red[500] }} />
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full flex flex-col gap-3">
                    <div className="w-full md:p-5">
                        <p className="text-lg text-justify whitespace-pre-wrap">
                            {review.review}
                        </p>
                    </div>
                    <div className="w-full flex flex-row gap-3 items-center pl-10">
                        <a
                            href={route("books.show", review.book.id)}
                            key={review.book.id}
                            className="cursor-pointer"
                        >
                            <div>
                                {review.book.portada ? (
                                    <img
                                        src={review.book.portada}
                                        alt={review.book.titulo}
                                        className="min-w-[70px] h-[110px] rounded"
                                    />
                                ) : (
                                    <div className="w-[70px] h-[110px] bg-gray-300 flex items-center justify-center text-center rounded-lg">
                                        <span className="text-sm font-bold text-gray-600">
                                            {review.book.titulo}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </a>
                        <div className="w-full font-serif">
                            <p className="text-sm md:text-2xl">
                                {review.book.titulo}
                            </p>
                            <p className="text-sm md:text-2xl text-gray-500">
                                by {review.book.autor}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {reviewModal && (
                <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="w-[90%] md:w-[40%] relative bg-white p-8 max-w-md mx-auto rounded shadow-lg flex flex-col gap-4">
                        <form
                            onSubmit={handleReviewSubmit}
                            className="flex flex-col gap-3"
                        >
                            <div>
                                <h2 className="text-xl font-semibold mb-4">
                                    Escribe una reseña
                                </h2>
                                <div className="grid gap-4">
                                    <textarea
                                        name="review"
                                        id="review"
                                        cols="30"
                                        rows="10"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        placeholder="Escribe tu reseña aquí..."
                                        value={data.review}
                                        onChange={(e) =>
                                            setData("review", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex flex-row items-center gap-3">
                                <button
                                    type="submit"
                                    className={`w-[50%] py-2 px-4 bg-${color} text-white rounded`}
                                >
                                    Guardar Cambios
                                </button>
                                <button
                                    type="button"
                                    className="w-[50%] py-2 px-4 bg-red-500 text-white rounded"
                                    onClick={() => setReviewModal(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardReview;
