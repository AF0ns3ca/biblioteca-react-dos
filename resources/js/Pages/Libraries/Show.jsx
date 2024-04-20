import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import CardInLibrary from "@/Components/CardInLibrary";

export default function Show({ auth, libraries, books, currentLibrary }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title=" Discover Books" />
                
                <div
                    className="w-full h-full flex justify-center items-center"
                >
                    {/* Renderizar las tarjetas */}
                    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgxl:grid-cols-5 gap-10">
                        {books.map((book) => (
                            // Se pasa el id de la biblioteca a la que pertenece el libro
                            <CardInLibrary
                                key={book.id}
                                book={book}
                                libraries={libraries}
                                currentLibrary={currentLibrary}
                            />

                        ))}
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}

// export default function Index({ auth, libraries, books }) {
//     return (
//         <AuthenticatedLayout user={auth.user}>
//             <Head title="Discover Books" />
//             <div className="w-full h-full flex justify-center items-center">
//                 <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgxl:grid-cols-5 gap-10">
//                     {books.map((book) => {
//                         console.log("libraryId:", book.libraryId); // Agrega esta línea para imprimir libraryId
//                         return (
//                             <CardInLibrary
//                                 key={book.id}
//                                 book={book}
//                                 libraryId={book.libraryId}
//                             />
//                         );
//                     })}
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
