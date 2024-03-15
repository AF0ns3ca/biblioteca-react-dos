import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';
import Card from '@/Components/Card';
 
export default function Index({ auth, books }) {
 
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Books" />

            <div className='w-full mt-4 flex items-center justify-center'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
                    {books.map((book) => (
                        <Card book={book} key={book.id} />
                    ))}
                </div>
            </div>
            
 
        </AuthenticatedLayout>
    );
}