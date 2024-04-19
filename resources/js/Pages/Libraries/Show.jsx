import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import Card from "@/Components/Card";

export default function Index({ auth, library, books }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={library.nombre} />

            <div className="w-full h-screen flex flex-1 items-center justify-center">
                <div className="w-full h-full flex flex-row items-center justify-center gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lgxl:grid-cols-5 gap-10">
                        {books.map((book) => (
                            <Card book={book} key={book.id} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
