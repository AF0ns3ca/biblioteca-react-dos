import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="h-full bg-white">

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
                            <div
                                style={{
                                    backgroundColor: "rgba(93, 109, 126, 0.5)", // Se ajusta la opacidad aquí
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                            />
                            <div className="w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] h-[70%] md:h-[60%] flex flex-col md:flex-row items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center bg-gray-50 rounded">
                                <div className="w-full md:w-[50%] h-full flex flex-col justify-center items-center gap-5 p-5">
                                    <div className="w-[80%] bg-metal text-white text-2xl md:text-3xl font-serif p-3 rounded">
                                        Book
                                        <span className="font-bold text-blue-200">
                                            Nest
                                        </span>
                                    </div>
                                    <div className="flex justify-center h-16 text-lg md:text-xl">
                                        {auth.user ? (
                                            <Link
                                                href={route("dashboard")}
                                                className="rounded-md px-3 py-2 text-metal ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-metal"
                                            >
                                                Acceder
                                            </Link>
                                        ) : (
                                            <div className="my-0 md:my-3 flex flex-col gap-5">
                                                <Link
                                                    href={route("login")}
                                                    className="rounded-md px-3 py-2 text-metal ring-1 ring-transparent transition focus:outline-none focus-visible:ring-metal"
                                                >
                                                    Iniciar Sesión
                                                </Link>
                                                <Link
                                                    href={route("register")}
                                                    className="rounded-md px-3 py-2 text-metal ring-1 ring-transparent transition focus:outline-none focus-visible:ring-metal"
                                                >
                                                    ¿No tienes cuenta? Regístrate
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full md:w-[50%] h-full flex flex-col justify-center items-center gap-5 bg-metaldark text-white p-5">
                                    <div className="relative w-full h-full flex flex-col items-center justify-center gap-5 font-serif">
                                        <p className="w-full text-sm md:text-lg 2xl:text-xl">
                                            <span className="italic">
                                                "¿Podrías decirme, por favor,
                                                qué camino debo seguir para
                                                salir de aquí?"
                                            </span>
                                            - preguntó Alicia.
                                        </p>
                                        <p className="w-full text-sm md:text-lg 2xl:text-xl">
                                            <span className="italic">
                                                "Esto depende en gran parte del
                                                sitio al que quieras llegar"
                                            </span>
                                            - dijo el Gato de Cheshire.
                                        </p>
                                        <p className="absolute bottom-5 right-5 font-serif text-xs md:text-sm 2xl:text-base">
                                            Alicia en el País de las Maravillas
                                            - Lewis Carroll
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
