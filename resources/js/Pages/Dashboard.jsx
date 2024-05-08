import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BookNest from "@/Components/BookNest";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";

export default function Index({ auth }) {
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

    // Función para manejar clics en la imagen
    const handleImageClick = (e) => {
        // Calcula la mitad del ancho de la imagen
        const halfWidth = e.target.clientWidth / 2;
        if (e.clientX - e.target.getBoundingClientRect().left < halfWidth) {
            previousSlide();
        } else {
            nextSlide();
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Inicio" />
            <div className="py-20">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div>
                        <div className="p-6 text-gray-900">
                            <div>
                                {/* Slider Image */}
                                <img
                                    src={images[currentSlide]}
                                    alt="Book Image"
                                    className="w-full h-96 object-cover rounded-lg cursor-pointer"
                                    onClick={handleImageClick}
                                />
                            </div>
                            <div className="w-full p-10 my-10 text-xl rounded-lg bg-yellow-600 text-white font-serif flex flex-row justify-between">
                                <div className="flex flex-col justify-center p-2">
                                    <h1 className="text-4xl">
                                        Bienvenido a Book
                                        <span className="font-bold text-blue-200">
                                            Nest
                                        </span>
                                        , {" "}
                                        <span className="capitalize inline-block">
                                            
                                            {auth.user.name}
                                        </span>
                                        !
                                    </h1>

                                    <p className="pt-5">
                                        Book
                                        <span className="font-bold text-blue-200">
                                            Nest
                                        </span>{" "}
                                        es la red social independiente para los
                                        amantes de los libros.
                                    </p>
                                    <ul className="px-10 list-disc">
                                        <li>
                                            Descubre libros de todas las épocas
                                        </li>
                                        <li>Crea tus propias bibliotecas</li>
                                        <li>
                                            Conecta con lectores de todas las
                                            partes del mundo
                                        </li>
                                    </ul>
                                </div>
                                <div className="pl-4">
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
                                <div className="w-full flex flex-row justify-start gap-3 text-center">
                                    <div className="bg-metaldark rounded p-2.5 text-white hover:bg-metal">
                                        <img
                                            src="/images/authors/sanderson.jpg"
                                            alt=""
                                            className="w-[340px] h-[380px] rounded cursor-pointer"
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
                                    <div className="bg-metaldark rounded p-2.5 text-white hover:bg-metal">
                                        <img
                                            src="/images/authors/rebecca.jpg"
                                            alt=""
                                            className="w-[340px] h-[380px] rounded cursor-pointer"
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
                                    <div className="bg-metaldark rounded p-2.5 text-white hover:bg-metal">
                                        <img
                                            src="/images/authors/sally.jpg"
                                            alt=""
                                            className="w-[340px] h-[380px] rounded cursor-pointer"
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
                                    <div className="bg-metaldark rounded p-2.5 text-white hover:bg-metal">
                                        <img
                                            src="/images/authors/king.jpg"
                                            alt=""
                                            className="w-[340px] h-[380px] rounded cursor-pointer"
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
                            <div className="flex flex-row items-center gap-10 text-2xl font-serif p-10 mb-10 mt-24">
                                <p className="text-justify">
                                "Los libros son puertas a mundos inexplorados, puertas que nos ofrecen escapar a otros mundos, son conocimiento y aventura al alcance de nuestras manos. Cada página que pasamos alimenta nuestro espíritu, amplía nuestros horizontes y fortalece nuestra comprensión del mundo y de nosotros mismos. Son herramientas poderosas que moldean mentes, construyen puentes entre culturas y generaciones, y despiertan nuestra creatividad más profunda. Abre un libro y descubre no solo historias, sino también partes de ti mismo en cada personaje y trama. ¡Explora, aprende y crece con cada lectura!"
                                </p>
                                {/* Slider Image */}
                                <img
                                    src="/images/magic.png"
                                    alt="Book Image"
                                    className="h-96 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
