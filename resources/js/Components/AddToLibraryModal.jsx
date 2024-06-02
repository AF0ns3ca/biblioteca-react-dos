// AddToLibraryModal.js
import React from "react";
import CardLibraryModal from "./CardLibraryModal";
import { Inertia } from "@inertiajs/inertia";

function AddToLibraryModal({ book, librariesWithBookCount, setShowModal }) {
    const handleAddToLibrary = async (libraryId) => {
        try {
            console.log(`Añadir libro ${book.id} a la biblioteca ${libraryId}`);
            
            await Inertia.post(
                "/booktolibrary",
                { book_id: book.id, library_id: libraryId },
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
    
            setShowModal(false);
        } catch (error) {
            console.error("Error al añadir el libro a la biblioteca:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="relative bg-white p-8 max-w-md mx-auto rounded shadow-lg flex flex-col gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Selecciona una biblioteca
                    </h2>
                    <div className="grid gap-4">
                        {librariesWithBookCount.map((library) => (
                            <button
                                key={library.id}
                                onClick={() => handleAddToLibrary(library.id)}
                            >
                                <CardLibraryModal
                                    key={library.id}
                                    library={library}
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col items-center">
                    <button
                        className="w-[50%] py-2 px-4 bg-red-500 text-white rounded"
                        onClick={() => setShowModal(false)}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddToLibraryModal;
