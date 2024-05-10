<?php

namespace App\Http\Controllers;

use App\Models\Library;
use App\Models\Book;
use App\Models\BookToLibrary;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Rate;
use App\Models\User;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function users()
    {
        // Coge todos los usuarios con su relacion con role_user y roles para mostrar el nombre del rol
        $users = User::with('roles')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->pluck('role')->join(', ') // Une los nombres de roles con comas
            ];
        });

        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

}


