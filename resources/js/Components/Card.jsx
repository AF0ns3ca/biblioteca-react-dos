import React from "react";

const Card = ({ book }) => {
    return (
        <div className="card flex flex-col gap-3">
            <div>
                {book.portada ? (
                    <img
                        src={book.portada}
                        alt={book.titulo}
                        className="w-[240px] h-[380px] rounded"
                    />
                ) : (
                    <div className="w-[240px] h-[380px] bg-gray-400">{book.titulo}</div>
                )}
            </div>
            <div className="w-full flex flex-row justify-center items-center gap-2">
                <a className="w-full text-center py-2 bg-metal text-white rounded" href="#">Editar</a>
                <a className="w-full text-center py-2 bg-red-600 text-white rounded" href="#">Eliminar</a>
            </div>
        </div>
    );
};

export default Card;
