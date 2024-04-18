import React from "react";
import { Inertia } from "@inertiajs/inertia";

const CardLibrary = ({ librarie }) => {


    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
          Inertia.delete(route('libraries.destroy', { id }), {
            onSuccess: () => {
                window.location.reload();
            },
          });
        }
    };

    return (
        <div className="card flex flex-col gap-3 items-center justify-center bg-gray-200 p-3 rounded min-w-[263px] hover:bg-slate-300">
            <div className="flex flex-col items-center justify-center gap-3">
                <a href={route('libraries.show', librarie.id)} key={librarie.id} className='cursor-pointer'>
                    <div>
                        {/* añadir el nombre de la biblioteca */}
                        <h1 className="text-xl font-bold">{librarie.nombre}</h1>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default CardLibrary;
