import AdminLayout from "@/Layouts/AdminLayout";
import BookNest from "@/Components/BookNest";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";

export default function Index({ auth }) {

    return (
        <AdminLayout user={auth.user}>
            <Head title="Inicio" />
            <div className="py-20">
                Hello Admin
            </div>
        </AdminLayout>
    );
}
