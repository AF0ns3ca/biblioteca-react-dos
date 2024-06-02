import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const BookStatusSelector = ({ initialStatus, book, auth, showPage }) => {
    const [status, setStatus] = useState(initialStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStatusChange = async (newStatus) => {
        setStatus(newStatus);
        setIsModalOpen(false);

        if (newStatus === "quiero_leer") {
            await updateReadingStatus("quiero_leer", true, null, null);
        } else if (newStatus === "leyendo") {
            const now = new Date();
            await updateReadingStatus("leyendo", false, now, null);
        } else if (newStatus === "leido") {
            const now = new Date();
            await updateReadingStatus("leido", false, null, now);
        }
    };

    const updateReadingStatus = async (status, wantToRead, startDate, endDate) => {
        await Inertia.post("/update-reading-status", {
            book_id: book.id,
            status,
            want_to_read: wantToRead,
            start_date: startDate,
            end_date: endDate,
        });
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "quiero_leer":
                return {
                    icon: <BookmarkBorderOutlinedIcon />,
                    text: "Quiero Leer",
                };
            case "leyendo":
                return {
                    icon: <LocalLibraryOutlinedIcon />,
                    text: "Leyendo",
                };
            case "leido":
                return {
                    icon: <DoneAllOutlinedIcon />,
                    text: "Leído",
                };
            default:
                return {
                    icon: <BookmarkBorderOutlinedIcon />,
                    text: "Quiero Leer",
                };
        }
    };

    const bgColor = auth.user.role === "user" ? "bg-metal" : "bg-premium";
    const bgHoverColor = auth.user.role === "user" ? "bg-metaldark" : "bg-premiumdark";

    return (
        <div>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className={`inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 ${bgColor} font-medium text-white hover:${bgHoverColor} focus:outline-none`}
                aria-expanded="true"
                aria-haspopup="true"
            >
                <span className={`w-full flex flex-row gap-1 ${showPage ? "px-2" : ""}`}>
                    {showPage ? (
                        <>
                            {getStatusLabel(status).text}
                            {getStatusLabel(status).icon}
                        </>
                    ) : (
                        getStatusLabel(status).icon
                    )}
                </span>
                <KeyboardArrowDownOutlinedIcon />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="w-full md:w-[20%] bg-white p-4 md:p-8 flex flex-col rounded-lg items-center justify-center">
                        <h2 className="text-xl font-bold mb-4">Seleccionar estado</h2>
                        <div className="py-1">
                            <button
                                onClick={() => handleStatusChange("quiero_leer")}
                                className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                Quiero Leer
                            </button>
                            <button
                                onClick={() => handleStatusChange("leyendo")}
                                className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                Leyendo
                            </button>
                            <button
                                onClick={() => handleStatusChange("leido")}
                                className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                Leído
                            </button>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-red-700 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-500 text-center"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookStatusSelector;
