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
     * Display a listing of the resource.
     */

    public function index()
    {
        // devolver el total de libros en la base de datos
        $booksCount = Book::all()->count();
        // devolver el total de bibliotecas en la base de datos
        $librariesCount = Library::all()->count();
        // devolver el total de usuarios en la base de datos
        $usersCount = User::all()->count();
        // devolver el total de valoraciones en la base de datos
        $ratesCount = Rate::all()->count();
        // devolver el total de reviews en la base de datos
        $reviewsCount = Review::all()->count();


        return Inertia::render('Admin/Index', [
            'booksCount' => $booksCount,
            'librariesCount' => $librariesCount,
            'usersCount' => $usersCount,
            'ratesCount' => $ratesCount,
            'reviewsCount' => $reviewsCount
        ]);
    }

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
        // Obtener todos los libros ordenados por portada, luego por serie y luego por num_serie
        $books = Book::orderBy('portada')->orderBy('serie')->orderBy('num_serie')->get();

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

    public function userView()
    {

        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ],
        ]);
    }

}


