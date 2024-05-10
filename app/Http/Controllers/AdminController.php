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
        // Coge todos los usuarios con su relacion con role_user y roles para mostrar el nombre del rol y el numero de bibliotecas que tiene cada uni
        // $users = User::with('roles', 'libraries')->get()->map(function ($user) {
        //     return [
        //         'id' => $user->id,
        //         'name' => $user->name,
        //         'email' => $user->email,
        //         'role' => $user->roles->pluck('role')->join(', '), // Une los nombres de roles con comas
        //         'libraries_count' => $user->libraries->count() // Cuenta las bibliotecas asociadas
        //     ];
        // });

        $users = User::with('roles')->withCount('libraries')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->pluck('role')->join(', '), // Une los nombres de roles con comas
                'libraries_count' => $user->libraries_count // Directamente obtenido de la consulta SQL
            ];
        });     
        
        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

    public function books()
    {
        $books = Book::all();

        return Inertia::render('Admin/Books', [
            'books' => $books
        ]);
    }

    public function userDestroy($id)
    {
        $user = User::find($id);
        $user->delete();

        return redirect()->route('admin.users');
    }

    public function bookDestroy($id)
    {
        $book = Book::find($id);
        $book->delete();

        return redirect()->route('admin.books');
    }

}


