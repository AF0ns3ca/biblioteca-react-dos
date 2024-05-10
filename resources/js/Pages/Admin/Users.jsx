import React from "react";
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
            <div className="mt-24 flex flex-col justify-center items-center gap-10">
                <h1 className="text-3xl">Lista de Usuarios</h1>
                <div className="w-[50%] flex flex-col items-center gap-5">
                    {sortedUsers.map((user) => (
                        <CardUser user={user} />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default UsersIndex;
