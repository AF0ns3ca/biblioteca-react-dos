import React, { useState } from "react";

const Footer = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <footer className="bg-gray-900 mt-10">
            <div className="container mx-auto py-12 px-4 lg:px-8 flex flex-col lg:flex-row justify-between">
                <div className="lg:w-1/3">
                    <h1 className="text-3xl text-white mb-4 font-serif">
                        Book
                        <span className={`font-bold text-blue-200`}>Nest</span>
                    </h1>
                    <p className="text-gray-300 w-[70%]">
                        Book Nest es una plataforma para compartir y descubrir
                        libros de todo tipo. ¡Únete a nuestra comunidad!
                    </p>
                </div>
                <div className="lg:w-1/4">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Enlaces Útiles
                    </h2>
                    <ul className="text-gray-300">
                        <li>
                            <a href="/dashboard" className="hover:text-white">
                                Página Principal
                            </a>
                        </li>
                        <li>
                            <button
                                className="hover:text-white focus:outline-none"
                                onClick={openModal}
                            >
                                Acerca de Nosotros
                            </button>
                        </li>
                        <li>
                            <button
                                className="hover:text-white focus:outline-none"
                                onClick={openModal}
                            >
                                Contacto
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="lg:w-1/4">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Redes Sociales
                    </h2>
                    <ul className="text-gray-300">
                        <li>
                            <button
                                className="hover:text-white focus:outline-none"
                                onClick={openModal}
                            >
                                Facebook
                            </button>
                        </li>
                        <li>
                            <button
                                className="hover:text-white focus:outline-none"
                                onClick={openModal}
                            >
                                Twitter
                            </button>
                        </li>
                        <li>
                            <button
                                className="hover:text-white focus:outline-none"
                                onClick={openModal}
                            >
                                Instagram
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-gray-300 text-sm pt-1 pb-4">
                Álvaro Fonseca Hernández © {new Date().getFullYear()}
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-gray-500 opacity-75 transition-opacity"
                        onClick={closeModal}
                    ></div>
                    <div className="relative bg-white w-full max-w-md m-6 rounded-lg overflow-hidden shadow-xl transform transition-all duration-300">
                        <div className="p-8 text-center">
                            <h2 className="text-2xl mb-4">EN DESARROLLO</h2>
                            <p>
                                Esta funcionalidad aún está en desarrollo.
                                Pronto estará disponible.
                            </p>
                            <button
                                className="mt-4 px-6 py-2 bg-metal text-white font-semibold rounded hover:bg-metallight focus:outline-none"
                                onClick={closeModal}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
