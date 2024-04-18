import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import Card from "@/Components/Card";

export default function Index({ auth, library, books }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={library.nombre} />

            <div className="w-full h-screen mt-4 flex flex-1 items-center justify-center">
                <div className="w-[70%] h-full flex flex-row items-center justify-center gap-6">
                    <div className="w-[30%] flex items-center justify-center">
                        {library.nombre}
                    </div>
                    <div>
                        {books.map((book) => (
                            <Card book={book} key={book.id} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
