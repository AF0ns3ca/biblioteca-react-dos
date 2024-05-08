import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="h-full bg-white">
                {/* <nav className=" w-full bg-metal border-b border-gray-100 top-0 fixed">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-md px-3 py-2 text-metal ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-metal"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-metal"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-metal"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav> */}

                <main className="">
                    <Head title="Inicio" />
                    <div className="w-full h-screen relative">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage:
                                    "url('/images/background.jpg')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                height: "100%",
                            }}
                        >
                            {/* Div para el color semitransparente */}
                            <div
                                style={{
                                    backgroundColor: "rgba(93, 109, 126, 0.5)", // Ajusta la opacidad aquí
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                            />
                            {/* Texto centrado */}
                            <div className="w-[50%] h-[30%] flex flex-row items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center bg-gray-50 rounded">
                                <div className="w-[50%] h-full flex flex-col justify-center items-center gap-5">
                                    <div className="w-[50%] bg-metal text-white text-3xl font-serif p-3 rounded">
                                        Book
                                        <span className="font-bold text-blue-200">
                                            Nest
                                        </span>
                                    </div>
                                    <div className="flex justify-center h-16 text-xl">
                                        {auth.user ? (
                                            <Link
                                                href={route("dashboard")}
                                                className="rounded-md px-3 py-2 text-metal ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-metal"
                                            >
                                                Dashboard
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route("login")}
                                                    className="rounded-md px-3 py-2 text-metal ring-1 ring-transparent transition focus:outline-none focus-visible:ring-metal"
                                                >
                                                    Log in
                                                </Link>
                                                <Link
                                                    href={route("register")}
                                                    className="rounded-md px-3 py-2 text-metal ring-1 ring-transparent transition focus:outline-none focus-visible:ring-metal"
                                                >
                                                    Register
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="w-[50%] h-full flex flex-col justify-center items-center gap-5 bg-metaldark text-white">
                                    <div className="relative w-full h-full flex flex-col items-center justify-center gap-5 p-5 font-serif">
                                            <p className="w-full text-xl">
                                                <span className="italic">
                                                    "¿Podrías decirme, por
                                                    favor, qué camino debo
                                                    seguir para salir de aquí?"
                                                </span>
                                                - preguntó Alicia.
                                            </p>
                                            <p className="w-full text-xl">
                                                <span className="italic">
                                                    "Esto depende en gran parte
                                                    del sitio al que quieras
                                                    llegar"
                                                </span>
                                                - dijo el Gato de Cheshire.
                                            </p>
                                            <p className="absolute bottom-5 right-5 font-serif">
                                                Alicia en el País de las Maravillas - Lewis Carroll
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
