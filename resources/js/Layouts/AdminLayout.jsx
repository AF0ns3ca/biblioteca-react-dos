import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import SearchComponent from "@/Components/SearchComponent";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import Footer from "@/Components/Footer";

export default function Admin({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const url = usePage().url;

    function checkUrl(url) {
        // Esto verifica si la URL es exactamente '/books' o sigue el patrón '/libraries/[algún número]'
        return url === "/admin/books";
    }

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="w-full bg-black border-b border-gray-100 top-0 fixed z-infinity">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex flex-row items-center justify-center gap-5">
                            <div className="shrink-0 flex items-center">
                                <Link href="/admin">
                                    <div className="text-white text-3xl font-serif">
                                        Book
                                        <span className="font-bold text-gray-200">
                                            Nest
                                        </span>
                                    </div>
                                </Link>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        window.location.href = "/dashboard";
                                    }}
                                    className="flex items-center gap-2 text-white"
                                >
                                    <SupervisedUserCircleOutlinedIcon fontSize="large" />
                                </button>
                            </div>
                            {checkUrl(url) && (
                                <div className="w-[130px] md:w-full sm:flex sm:items-center sm:ms-6">
                                    <SearchComponent />
                                </div>
                            )}
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("admin.index")}
                                    active={route().current("admin.index")}
                                >
                                    Inicio
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("admin.users")}
                                    active={route().current("admin.users")}
                                >
                                    Usuarios
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("admin.books")}
                                    active={route().current("admin.books")}
                                >
                                    Gestionar Libros
                                </NavLink>
                            </div>
                            <div className="relative hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md bg-black">
                                            <button
                                                type="button"
                                                className="inline-flex items-center py-2 border border-transparent leading-4 font-medium rounded-md bg-black focus:outline-none transition ease-in-out duration-150 text-white text-md"
                                            >
                                                {user.name}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("admin.index")}
                            active={route().current("admin.index")}
                        >
                            Inicio
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("admin.users")}
                            active={route().current("admin.users")}
                        >
                            Usuarios
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("admin.books")}
                            active={route().current("admin.books")}
                        >
                            Gestionar Libros
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-white">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-100">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Cerrar Sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-grow mt-5">{children}</main>
            
        </div>
    );
}
