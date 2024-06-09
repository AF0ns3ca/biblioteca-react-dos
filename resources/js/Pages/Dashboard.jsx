import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BookNest from "@/Components/BookNest";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import InitTab from "@/Components/InitTab";
import CardReview from "@/Components/CardReview";
import Loading from "@/Components/Loading";

export default function Index({ auth, reviews }) {

    const [selectedSection, setSelectedSection] = useState(0);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const savedSection = localStorage.getItem("selectedSection");
        if (savedSection) {
            setSelectedSection(parseInt(savedSection, 10));
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleSectionChange = (sectionIndex) => {
        setSelectedSection(sectionIndex);
        localStorage.setItem("selectedSection", sectionIndex);
    };

    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [
        "/images/banner.jpg",
        "/images/hero.jpg",
        "/images/bookstore.jpg",
        // Añade más imágenes según necesario
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const previousSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleImageClick = (e) => {
        const halfWidth = e.target.clientWidth / 2;
        if (e.clientX - e.target.getBoundingClientRect().left < halfWidth) {
            previousSlide();
        } else {
            nextSlide();
        }
    };

    // Ordenamos las resenas por fecha de ultima actualizacion si la hay o por fecha de creacion
    reviews.sort((a, b) => {
        const dateA = a.updated_at ? new Date(a.updated_at) : new Date(a.created_at);
        const dateB = b.updated_at ? new Date(b.updated_at) : new Date(b.created_at);
        return dateB - dateA;
    });

    const renderSelectedSection = () => {
        switch (selectedSection) {
            case 0:
                return (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div>
                            <div className="p-6 text-gray-900">
                                <div>
                                    <img
                                        src={images[currentSlide]}
                                        alt="Book Image"
                                        className="w-full h-96 object-cover rounded-lg cursor-pointer"
                                        onClick={handleImageClick}
                                    />
                                </div>
                                <div className="w-full p-10 my-10 text-xl rounded-lg bg-yellow-600 text-white font-serif flex flex-col sm:flex-row justify-between">
                                    <div className="flex flex-col justify-center p-2 sm:w-2/3">
                                        <h1 className="text-4xl mb-5">
                                            Bienvenido a Book
                                            <span className="font-bold text-blue-200">
                                                Nest
                                            </span>
                                            ,{" "}
                                            <span className="capitalize inline-block">
                                                {auth.user.name}
                                            </span>
                                            !
                                        </h1>
                                        <p className="mb-5">
                                            Book
                                            <span className="font-bold text-blue-200">
                                                Nest
                                            </span>{" "}
                                            es la red social independiente para
                                            los amantes de los libros.
                                        </p>
                                        <ul className="px-5 list-disc mb-5">
                                            <li>
                                                Descubre libros de todas las
                                                épocas
                                            </li>
                                            <li>
                                                Crea tus propias bibliotecas
                                            </li>
                                            <li>
                                                Conecta con lectores de todas
                                                las partes del mundo
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pl-4 sm:w-1/3">
                                        <img
                                            src="/images/libraries.jpg"
                                            alt=""
                                            className="rounded"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <h1 className="text-5xl text-center font-serif pb-5">
                                        Autores del momento
                                    </h1>
                                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
                                        <div className="w-[280px] h-[450px] bg-metaldark rounded p-2.5 text-white hover:bg-metal mb-5 sm:w-1/4">
                                            <img
                                                src="/images/authors/sanderson.jpg"
                                                alt=""
                                                className="w-[263px] h-[385px] rounded cursor-pointer"
                                                onClick={() =>
                                                    Inertia.visit(
                                                        `/books?autor=Brandon Sanderson`
                                                    )
                                                }
                                            />
                                            <p className="mt-2 text-2xl font-serif">
                                                Brandon Sanderson
                                            </p>
                                        </div>
                                        <div className="w-[280px] h-[450px] bg-metaldark rounded p-2.5 text-white hover:bg-metal mb-5 sm:w-1/4">
                                            <img
                                                src="/images/authors/rebecca.jpg"
                                                alt=""
                                                className="w-[263px] h-[385px] rounded cursor-pointer"
                                                onClick={() =>
                                                    Inertia.visit(
                                                        `/books?autor=Rebecca Yarros`
                                                    )
                                                }
                                            />
                                            <p className="mt-2 text-2xl font-serif">
                                                Rebecca Yarros
                                            </p>
                                        </div>
                                        <div className="w-[280px] h-[450px] bg-metaldark rounded p-2.5 text-white hover:bg-metal mb-5 sm:w-1/4">
                                            <img
                                                src="/images/authors/sally.jpg"
                                                alt=""
                                                className="w-[263px] h-[385px] rounded cursor-pointer"
                                                onClick={() =>
                                                    Inertia.visit(
                                                        `/books?autor=Sally Rooney`
                                                    )
                                                }
                                            />
                                            <p className="mt-2 text-2xl font-serif">
                                                Sally Rooney
                                            </p>
                                        </div>
                                        <div className="w-[280px] h-[450px] bg-metaldark rounded p-2.5 text-white hover:bg-metal mb-5 sm:w-1/4">
                                            <img
                                                src="/images/authors/king.jpg"
                                                alt=""
                                                className="w-[263px] h-[385px] rounded cursor-pointer"
                                                onClick={() =>
                                                    Inertia.visit(
                                                        `/books?autor=Stephen King`
                                                    )
                                                }
                                            />
                                            <p className="mt-2 text-2xl font-serif">
                                                Stephen King
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-10 text-2xl font-serif p-10 mb-10 mt-24">
                                    <p className="text-justify sm:w-3/4">
                                        "Los libros son puertas a mundos
                                        inexplorados, puertas que nos ofrecen
                                        escapar a otros mundos, son conocimiento
                                        y aventura al alcance de nuestras manos.
                                        Cada página que pasamos alimenta nuestro
                                        espíritu, amplía nuestros horizontes y
                                        fortalece nuestra comprensión del mundo
                                        y de nosotros mismos. Son herramientas
                                        poderosas que moldean mentes, construyen
                                        puentes entre culturas y generaciones, y
                                        despiertan nuestra creatividad más
                                        profunda. Abre un libro y descubre no
                                        solo historias, sino también partes de
                                        ti mismo en cada personaje y trama.
                                        ¡Explora, aprende y crece con cada
                                        lectura!"
                                    </p>
                                    <img
                                        src="/images/magic.png"
                                        alt="Book Image"
                                        className="min-w-[250px] h-96 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div
                        className="opacity-100 transition-opacity ease-in-out w-[80%] items-center justify-center flex flex-col gap-10"
                        key={1}
                    >
                        {loading ? ( // Se muestra componente de carga si los datos están cargando
                            <div className="w-full h-screen flex items-center justify-center">
                                <Loading />
                            </div>
                        ) : reviews.length > 0 ? (
                            reviews.map((review) => (
                                <CardReview
                                    review={review}
                                    auth={auth.user}
                                    key={review.id}
                                />
                            ))
                        ) : (
                            <div className="text-center">
                                <p className="text-lg text-gray-600">
                                    No hay reseñas.
                                </p>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Inicio" />
            <div className="py-20">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                    <div className="flex">
                        <InitTab
                            value={selectedSection}
                            onChange={handleSectionChange}
                            role={auth.user.role}
                        />
                    </div>
                    {renderSelectedSection()}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
