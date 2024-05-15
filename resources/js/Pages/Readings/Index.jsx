// Importar useState y useEffect si es necesario
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mis Lecturas" />
            <div className="w-full h-full flex justify-center items-center">
                <div className="mt-20">Mis Lecturas</div>
            </div>
        </AuthenticatedLayout>
    );
}
