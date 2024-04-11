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
        <div className="card flex flex-col gap-3 items-center justify-center bg-gray-200 p-3 rounded min-w-[263px]">
            <div className="flex flex-col items-center justify-center gap-3">
                <a href={route('books.show', book.id)} key={book.id} className='cursor-pointer'>
                    <div>

                        {book.portada ? (
                            <img
                                src={book.portada}
                                alt={book.titulo}
                                className="w-[240px] h-[380px] rounded"
                            />
                        ) : (
                            <div className="w-[240px] h-[380px] bg-gray-300 flex items-center justify-center text-center">
                                <span className="text-2xl font-bold text-gray-600">{book.titulo}</span>
                            </div>
                        )}
                    </div>
                    <div className="hidden">
                        <h2 className="titulo">
                            {book.titulo}
                        </h2>
                        <p className="autor">
                            {book.autor}
                        </p>
                        <p className="serie">
                            {book.serie ? book.serie : "Standalone"} {book.num_serie ? `#${book.num_serie}` : ""}
                        </p>
                        <p>
                            Estante: {book.estante} {book.balda} - Fila: {book.fila}
                        </p>
                        <p>
                            Añadido el {book.created_at}
                        </p>
                    </div>
                </a>
                <div className="w-full flex flex-row justify-center items-center gap-2">
                    <a
                        href={route('books.edit', book.id)}
                        className="w-full text-center py-2 bg-metal text-white rounded"

                    >
                        Editar
                    </a>
                    <button
                        className="w-full text-center py-2 bg-red-600 text-white rounded cursor-pointer"
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
