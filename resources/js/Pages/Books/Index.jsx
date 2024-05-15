import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Card from "@/Components/Card";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Index({ auth, books, librariesWithBookCount }) {
    const [view, setView] = useState(
        () => localStorage.getItem("view") || "cards"
    );
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [page, setPage] = useState(1);
    const booksPerPage = 12;

    useEffect(() => {
        localStorage.setItem("view", view);
    }, [view]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const toggleSortDirection = () => {
        setSortDirection((prevSortDirection) =>
            prevSortDirection === "asc" ? "desc" : "asc"
        );
    };

    const sortBooks = (field) => {
        if (field === sortField) {
            toggleSortDirection();
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const renderSortIcon = (field) => {
        if (field === sortField) {
            return sortDirection === "asc" ? (
                <ArrowDropUpIcon />
            ) : (
                <ArrowDropDownIcon />
            );
        }
        return null;
    };

    const filteredBooks = sortField
    ? [...books].sort((a, b) => {
        if (sortField === "serie") {
            const fieldA = a[sortField]?.toUpperCase() || "ZZZZZZZZZZ";
            const fieldB = b[sortField]?.toUpperCase() || "ZZZZZZZZZZ";

            // Ordenar por serie primero
            const serieComparison = fieldA.localeCompare(fieldB);
            if (serieComparison !== 0) {
                return sortDirection === "desc" ? serieComparison * -1 : serieComparison;
            }

            // Si las series son iguales, ordenar por num_serie
            const numSerieA = parseInt(a["num_serie"]) || 0;
            const numSerieB = parseInt(b["num_serie"]) || 0;
            return sortDirection === "desc" ? numSerieB - numSerieA : numSerieA - numSerieB;
        }

        // Ordenar por otros campos
        const fieldA = a[sortField].toUpperCase();
        const fieldB = b[sortField].toUpperCase();
        let comparison = 0;
        if (fieldA > fieldB) {
            comparison = 1;
        } else if (fieldA < fieldB) {
            comparison = -1;
        }
        return sortDirection === "desc" ? comparison * -1 : comparison;
    })
    : books;


    const pageCount = Math.ceil(filteredBooks.length / booksPerPage);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Discover Books" />
            <>
                <div
                    id="cards"
                    className={`flex-1 w-full ${
                        view === "cards" ? "flex" : "hidden"
                    } pt-24 flex-col items-center justify-center pb-3 bg-white`}
                >
                    <div className="w-[50%] pb-5 flex flex-row items-center text-center justify-center gap-10">
                        <div className="">
                            <p className="font-bold text-lg">Ordenar por:</p>
                        </div>
                        <div className="flex flex-row gap-10">
                            <button
                                className="flex justify-between items-center w-full rounded"
                                onClick={() => sortBooks("titulo")}
                            >
                                <span>Título</span>
                                {renderSortIcon("titulo")}
                            </button>
                            <button
                                className="flex justify-between items-center w-full rounded"
                                onClick={() => sortBooks("autor")}
                            >
                                <span>Autor</span>
                                {renderSortIcon("autor")}
                            </button>
                            <button
                                className="flex justify-between items-center w-full rounded"
                                onClick={() => sortBooks("serie")}
                            >
                                <span>Serie</span>
                                {renderSortIcon("serie")}
                            </button>
                        </div>
                    </div>
                    {/* Renderizar las tarjetas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                        {filteredBooks.map((book, index) => (
                                <Card
                                    book={book}
                                    libraries={librariesWithBookCount}
                                    key={book.id}
                                    auth={auth}
                                    isShown={(index >= (page - 1) * booksPerPage && index < page * booksPerPage) ? true : false
                                    }
                                />
                        ))}
                    </div>
                    {/* Paginación */}
                    <Stack spacing={2} mt={4}>
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={handleChangePage}
                            color="primary"
                        />
                    </Stack>
                </div>
            </>
        </AuthenticatedLayout>
    );
}
