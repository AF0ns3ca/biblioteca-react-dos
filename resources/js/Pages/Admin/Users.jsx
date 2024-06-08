import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import CardUser from "@/Components/Admin/CardUser";

const UsersIndex = ({ auth, users }) => {

    const sortedUsers = [...users].sort((a, b) => {
        if (a.role < b.role) {
            return -1;
        }
        if (a.role > b.role) {
            return 1;
        }
        return 0;
    });
    
    return (
        <AdminLayout user={auth.user}>
            <Head title="Usuarios" />
            <div className="mt-20 flex flex-col justify-center items-center gap-10 p-5">
                <h1 className="text-3xl text-center">Lista de Usuarios</h1>
                <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-center gap-5">
                    {sortedUsers.map((user) => (
                        <CardUser key={user.id} user={user} />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default UsersIndex;
