import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 mt-10">
            <div className="container mx-auto py-12 px-4 lg:px-8 flex flex-col lg:flex-row justify-between">
                <div className="lg:w-1/3">
                    <h1 className="text-3xl text-white mb-4 font-serif">
                        Book
                        <span className={`font-bold text-blue-200`}>
                            Nest
                        </span>
                    </h1>
                    <p className="text-gray-300 w-[70%]">
                        Book Nest es una plataforma para compartir y
                        descubrir libros de todo tipo. ¡Únete a nuestra
                        comunidad!
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
                            <a href="#" className="hover:text-white">
                                Acerca de Nosotros
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="lg:w-1/4">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Redes Sociales
                    </h2>
                    <ul className="text-gray-300">
                        <li>
                            <a href="#" className="hover:text-white">
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white">
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="lg:w-1/4">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Suscribirse
                    </h2>
                    <form className="flex">
                        <input
                            type="email"
                            className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Tu correo electrónico"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                        >
                            Suscribirse
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
