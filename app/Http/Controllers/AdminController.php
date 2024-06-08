<?php

namespace App\Http\Controllers;

use App\Models\Library;
use App\Models\Book;
use App\Models\BookToLibrary;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Rate;
use App\Models\User;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Muestra una lista de recursos.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Contar el total de libros
        $booksCount = Book::all()->count();
        // Contar el total de bibliotecas
        $librariesCount = Library::all()->count();
        // Contar el total de usuarios
        $usersCount = User::all()->count();
        // Contar el total de valoraciones
        $ratesCount = Rate::all()->count();
        // Contar el total de reseñas
        $reviewsCount = Review::all()->count();

        // Renderizar la vista de la página de inicio del panel de administración
        return Inertia::render('Admin/Index', [
            'booksCount' => $booksCount,
            'librariesCount' => $librariesCount,
            'usersCount' => $usersCount,
            'ratesCount' => $ratesCount,
            'reviewsCount' => $reviewsCount
        ]);
    }

    /**
     * Muestra una lista de usuarios.
     *
     * @return \Inertia\Response
     */
    public function users()
    {
        // Obtener todos los usuarios con sus roles y el conteo de bibliotecas asociadas
        $users = User::with('roles')->withCount('libraries')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->pluck('role')->join(', '), // Concatenar los nombres de roles
                'libraries_count' => $user->libraries_count // Conteo directo de bibliotecas asociadas
            ];
        });

        // Renderizar la vista de usuarios del panel de administración
        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

    /**
     * Muestra una lista de libros.
     *
     * @return \Inertia\Response
     */
    public function books()
    {
        // Obtener todos los libros ordenados por portada, serie y número en la serie
        $books = Book::orderBy('portada')->orderBy('serie')->orderBy('num_serie')->get();

        // Renderizar la vista de libros del panel de administración
        return Inertia::render('Admin/Books', [
            'books' => $books
        ]);
    }

    /**
     * Elimina el usuario especificado.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function userDestroy($id)
    {
        // Encontrar y eliminar el usuario por su ID
        $user = User::find($id);
        $user->delete();

        // Redirigir a la ruta de administración de usuarios
        return redirect()->route('admin.users');
    }

    /**
     * Elimina el libro especificado.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function bookDestroy($id)
    {
        // Encontrar y eliminar el libro por su ID
        $book = Book::find($id);
        $book->delete();

        // Redirigir a la ruta de administración de libros
        return redirect()->route('admin.books');
    }

    /**
     * Muestra la vista de usuario.
     *
     * @return \Inertia\Response
     */
    public function userView()
    {
        // Cargar el usuario autenticado con sus roles
        $user = Auth::user()->load('roles');
        // Obtener el rol del usuario
        $userRole = $user->roles->first()->role;

        // Renderizar la vista del panel de usuario
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ],
        ]);
    }

}
