import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";

const UsersIndex = ({ auth, users }) => {

    // mostrar por consola los datos que se reciben de cada usuario con for each

    users.forEach((user) => {
        console.log(user.name, user.email, user.roles);
    });

    return (
        <AdminLayout user={auth.user}>
            <div className="mt-20 flex justify-center items-center">
                <div className="w-[50%] items-center">
                    <h1>Lista de Usuarios</h1>
                    <ul>
                        {users.map((user) => (
                            <li key={user.email}>
                                <span>Nombre: {user.name}</span><br />
                                <span>Email: {user.email}</span><br />
                                <span>Rol: {user.role}</span><br /><br />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UsersIndex;
