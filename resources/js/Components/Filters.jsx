import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Card from "@/Components/Card";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Filters = (books, sortField) => {
    // const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
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

    // const filteredBooks = sortField
    //     ? [...books].sort((a, b) => {
    //           if (sortField === "serie") {
    //               const fieldA = a[sortField]?.toUpperCase() || "ZZZZZZZZZZ";
    //               const fieldB = b[sortField]?.toUpperCase() || "ZZZZZZZZZZ";

    //               // Ordenar por serie primero
    //               const serieComparison = fieldA.localeCompare(fieldB);
    //               if (serieComparison !== 0) {
    //                   return sortDirection === "desc"
    //                       ? serieComparison * -1
    //                       : serieComparison;
    //               }

    //               // Si las series son iguales, ordenar por num_serie
    //               const numSerieA = parseInt(a["num_serie"]) || 0;
    //               const numSerieB = parseInt(b["num_serie"]) || 0;
    //               return sortDirection === "desc"
    //                   ? numSerieB - numSerieA
    //                   : numSerieA - numSerieB;
    //           }

    //           // Ordenar por otros campos
    //           const fieldA = a[sortField].toUpperCase();
    //           const fieldB = b[sortField].toUpperCase();
    //           let comparison = 0;
    //           if (fieldA > fieldB) {
    //               comparison = 1;
    //           } else if (fieldA < fieldB) {
    //               comparison = -1;
    //           }
    //           return sortDirection === "desc" ? comparison * -1 : comparison;
    //       })
    //     : books;

    return (
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
    );
};

export default Filters;
