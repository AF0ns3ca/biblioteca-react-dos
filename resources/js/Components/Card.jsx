import React from "react";
import { Inertia } from "@inertiajs/inertia";

const Card = ({ book }) => {


    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
          Inertia.delete(route('books.destroy', { id }), {
            onSuccess: () => {
                window.location.reload();
            },
          });
        }
    };
    
    return (
        <div className="card flex flex-col gap-3 items-center justify-center bg-gray-200 p-3 rounded">
            <div className="flex flex-col items-center justify-center gap-3">
                <div>
                    {book.portada ? (
                        <img
                            src={book.portada}
                            alt={book.titulo}
                            className="w-[240px] h-[380px] rounded"
                        />
                    ) : (
                        <div className="w-[240px] h-[380px] bg-gray-400">
                            {book.titulo}
                        </div>
                    )}
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-2">
                    <button
                        className="w-full text-center py-2 bg-metal text-white rounded"
                        
                    >
                        Editar
                    </button>
                    <button
                        className="w-full text-center py-2 bg-red-600 text-white rounded"
                        onClick={() => handleDelete(book.id)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
