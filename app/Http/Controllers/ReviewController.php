<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener el usuario autenticado con sus roles
        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        // Devuelve las reviews de la base de datos junto con el rate de los libros y el nombre del usuario que ha hecho la review
        $reviews = Review::with([
            'book' => function ($query) {
                // Cargar la relación 'rate' dentro de 'book'
                $query->leftJoin('rate', function ($join) {
                    $join->on('books.id', '=', 'rate.book_id');
                    
                })
                ->select('books.*', 'rate.rate as rate');
            },
            'user'
        ])
        ->orderBy('updated_at', 'desc') // Primero ordena por fecha de modificación en orden descendente
        ->orderBy('created_at', 'desc') // Luego ordena por fecha de creación en orden descendente
        ->get();

        // Renderizar la vista 'Dashboard' con las reviews y la información del usuario autenticado
        return Inertia::render('Dashboard', [
            'reviews' => $reviews,
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Mostrar el formulario para crear una nueva review
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos de la solicitud
        $validated = $request->validate([
            'user_id' => 'required',
            'book_id' => 'required',
            'review' => 'required',
        ]);

        // Crear una nueva review con los datos validados
        $review = Review::create($validated);

        // Redirigir a la página de índice de reviews
        return redirect()->route('reviews.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        // Mostrar la review especificada
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        // Mostrar el formulario para editar una review
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validar los datos de la solicitud
        $validatedData = $request->validate([
            'review' => 'required',
        ]);

        // Actualizar la review con los datos validados
        Review::whereId($id)->update($validatedData);

        // Redirigir a la página de inicio del dashboard
        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review, string $id)
    {
        // Encontrar la review por su ID
        $review = Review::findOrFail($id);

        // Eliminar la review
        $review->delete();

        // Redirigir a la página de índice de reviews
        return redirect()->route('reviews.index');
    }
}
