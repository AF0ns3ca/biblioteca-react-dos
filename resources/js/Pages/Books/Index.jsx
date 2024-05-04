// Index.js

import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Card from "@/Components/Card";
import ChangeButton from "@/Components/ChangeButton";
import AlphabetNav from '@/Components/AlphabetNav';  // Asegúrate de usar la ruta correcta

export default function Index({ auth, books, libraries }) {
    const [view, setView] = useState(() => localStorage.getItem("view") || "cards");
    const [selectedLetter, setSelectedLetter] = useState({ letter: '', field: '' });

    useEffect(() => {
        localStorage.setItem("view", view);
    }, [view]);



    const filteredBooks = selectedLetter.letter
    ? selectedLetter.letter === 'special'
        ? books.filter((book) => !/^[A-Z]/i.test((book[selectedLetter.field] || '').trim()))
        : books.filter((book) => (book[selectedLetter.field] || '').trim().toUpperCase().startsWith(selectedLetter.letter))
    : books;


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Discover Books" />
            <AlphabetNav selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />
            <>

                <div
                    id="cards"
                    className={`w-full ${
                        view === "cards" ? "flex" : "hidden"
                    } pt-32 items-center justify-center pb-3 bg-white`}
                >
                    {/* Renderizar las tarjetas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                        {filteredBooks.map((book) => (
                            <Card book={book} libraries={libraries} key={book.id} />
                        ))}
                    </div>
                </div>
            </>
        </AuthenticatedLayout>
    );
}
