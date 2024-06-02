import React, { useState } from "react";
import CardLibraryModal from "./CardLibraryModal";
import { Inertia } from "@inertiajs/inertia";

function AddToLibraryModal({ book, librariesWithBookCount, setShowModal }) {

    const [error, setError] = useState(null);

    const isBookInLibrary = (libraryId) => {
        return book.libraries.some(library => library.id === libraryId);
    };
    

    const handleAddToLibrary = async (libraryId) => {
        try {
            if (isBookInLibrary(libraryId)) {
                setError("Este libro ya está en la biblioteca.");
                // scroll hasta el mensaje de error de la modal
                document.querySelector(".text-red-500").scrollIntoView({ behavior: "smooth" });
            } else {
                await Inertia.post(
                    "/booktolibrary",
                    { book_id: book.id, library_id: libraryId },
                    {
                        preserveScroll: true,
                        preserveState: true,
                    }
                );
                setShowModal(false);
            }
        } catch (error) {
            console.error("Error al añadir el libro a la biblioteca:", error);
        }
    };

    console.log("Libro:", book);
    librariesWithBookCount.forEach(library => {
        console.log(`El libro ${book.id} ${isBookInLibrary(library.id) ? 'está' : 'no está'} en la biblioteca ${library.id}`);
    });

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="relative bg-white p-8 max-w-md max-h-[70%] mx-auto rounded shadow-lg flex flex-col gap-4 overflow-auto">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Selecciona una biblioteca</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="grid gap-4">
                        {librariesWithBookCount.map((library) => (
                            <button
                                key={library.id}
                                onClick={() => handleAddToLibrary(library.id)}
                                className={isBookInLibrary(library.id) ? "bg-red-200" : "bg-green-200"}
                            >
                                <CardLibraryModal library={library} isBookInLibrary={isBookInLibrary(library.id)} />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col items-center">
                    <button className="w-[50%] py-2 px-4 bg-red-500 text-white rounded" onClick={() => setShowModal(false)}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddToLibraryModal;
