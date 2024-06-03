import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import SearchComponent from "@/Components/SearchComponent";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import Footer from "@/Components/Footer";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const url = usePage().url;

    function checkUrl(url) {
        // Esto verifica si la URL es exactamente '/books' o sigue el patrón '/libraries/[algún número]'
        return url === "/books" || /^\/libraries\/\d+$/.test(url);
    }

    // let bgColor = "bg-white"; // Valor por defecto
    // let textColor = "text-gray-800"; // Valor por defecto

    // bgColor = "bg-metal";
    // textColor = "text-blue-200";

    //Se pone el color de fondo en "metal" si el usuario es user, "premium" si es premmium_user
    const bgColor = user.role == "user" ? "bg-metal" : "bg-premium";
    const textColor = user.role == "user" ? "text-blue-200" : "text-purple-200";

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <nav
                className={`w-full ${bgColor} border-b border-gray-100 top-0 fixed z-infinity`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex flex-row items-center justify-center gap-3 md:gap-2">
                            <div className="shrink-0 flex items-center">
                                <Link href="/dashboard">
                                    {/* <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" /> */}
                                    <div className="text-white text-3xl font-serif">
                                        Book
                                        <span
                                            className={`font-bold ${textColor}`}
                                        >
                                            Nest
                                        </span>
                                    </div>
                                    {/* <img
                                        src="/images/logo/logo.svg"
                                        alt="BookNest"
                                        width={150}
                                        height={50}

                                    /> */}
                                </Link>
                            </div>
                            <div>
                                {user.role === "admin" && (
                                    <Link
                                        href="/admin"
                                        className="text-white text-lg"
                                    >
                                        <AdminPanelSettingsOutlinedIcon
                                            sx={{ fontSize: 40 }}
                                        />
                                    </Link>
                                )}
                            </div>
                            {checkUrl(url) && (
                                <div className="w-[130px] md:w-full sm:flex sm:items-center sm:ms-6">
                                    <SearchComponent />
                                </div>
                            )}
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {/* {url === ("/books" || "/libraries/[id]") && ( */}
                            

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Inicio
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("readings.index")}
                                    active={route().current("readings.index")}
                                >
                                    Mis Lecturas
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("libraries.index")}
                                    active={route().current("libraries.index")}
                                >
                                    Bibliotecas
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("books.index")}
                                    active={route().current("books.index")}
                                >
                                    Descubrir Libros
                                </NavLink>
                            </div>
                            {user.role === "user" && (
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink href={route("premium.index")}>
                                        <WorkspacePremiumIcon />
                                    </NavLink>
                                </div>
                            )}

                            <div className="relative hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span
                                            className={`inline-flex rounded-md ${bgColor}`}
                                        >
                                            <button
                                                type="button"
                                                className={`inline-flex items-center py-2 border border-transparent leading-4 font-medium rounded-md ${bgColor} focus:outline-none transition ease-in-out duration-150 text-white text-md`}
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
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
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
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Inicio
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("readings.index")}
                            active={route().current("readings.index")}
                        >
                            Mis Lecturas
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("libraries.index")}
                            active={route().current("libraries.index")}
                        >
                            Bibliotecas
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("books.index")}
                            active={route().current("books.index")}
                        >
                            Descubrir Libros
                        </ResponsiveNavLink>
                    </div>
                    {user.role === "user" && (
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route("premium.index")}>
                                <WorkspacePremiumIcon />
                            </ResponsiveNavLink>
                        </div>
                    )}

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
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
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
            <Footer />
        </div>
    );
}
