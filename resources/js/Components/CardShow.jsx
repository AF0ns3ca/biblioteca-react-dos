import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import CardLibraryModal from "./CardLibraryModal";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { styled } from "@mui/system";

const CardShow = ({ book, librariesWithBookCount, auth }) => {
    
    const realPortada = book.portada
        ? book.portada.startsWith("http")
            ? book.portada
            : book.portada.replace(/^public\//, "/storage/")
        : null;

    return (
        <div
            className={`card flex flex-col gap-3 items-center justify-center p-3 `}
        >
            <div className="flex flex-col items-start justify-start min-w-[120px]">
                <a
                    href={route("books.show", book.id)}
                    key={book.id}
                    className="cursor-pointer"
                >
                    <div>
                        {book.portada ? (
                            <img
                                src={realPortada}
                                alt={book.titulo}
                                className="w-[120px] h-[190px] rounded"
                            />
                        ) : (
                            <div className="w-[120px] h-[190px] bg-gray-300 flex items-center justify-center text-center rounded-lg">
                                <span className="text-sm font-bold text-gray-600">
                                    {book.titulo}
                                </span>
                            </div>
                        )}
                    </div>
                </a>

                <div className="hidden">
                    <h2 className="titulo">{book.titulo}</h2>
                    <p className="autor">{book.autor}</p>
                    <p className="serie">
                        {book.serie ? book.serie : "Standalone"}{" "}
                        {book.numero ? `#${book.num_serie}` : ""}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardShow;
