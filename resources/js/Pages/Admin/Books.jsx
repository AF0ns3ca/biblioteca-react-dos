// Index.js
import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import CardBookAdmin from "@/Components/Admin/CardBookAdmin";

export default function Books({ auth, books, libraries }) {
    const [view, setView] = useState(() => localStorage.getItem("view") || "cards");
    const [selectedLetter, setSelectedLetter] = useState({ letter: '', field: '' });

    useEffect(() => {
        localStorage.setItem("view", view);
    }, [view]);

    return (
        <AdminLayout user={auth.user}>
            <Head title="Discover Books" />
            {/* <AlphabetNav selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} /> */}
            <>

                <div
                    id="cards"
                    className={`w-full ${
                        view === "cards" ? "flex" : "hidden"
                    } pt-24 items-center justify-center pb-3 bg-white`}
                >
                    {/* Renderizar las tarjetas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                        {books.map((book) => (
                            <CardBookAdmin book={book} libraries={libraries} key={book.id} />
                        ))}
                    </div>
                </div>
            </>
        </AdminLayout>
    );
}
