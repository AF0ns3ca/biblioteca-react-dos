<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rate;
use Inertia\Inertia;
use App\Models\Book;

class RateController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos de la solicitud
        $validatedData = $request->validate([
            'rate' => 'required|numeric|min:1', // Asegúrate de validar como número y que sea al menos 1
            'book_id' => 'required|exists:books,id', // Asegúrate de que el libro exista en la base de datos
        ]);

        // Añadir user_id al array de datos validados manualmente
        $validatedData['user_id'] = auth()->id();

        // Crear una nueva calificación en la base de datos
        Rate::create($validatedData);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Obtener el libro con su calificación asociada si existe
        $book = Book::with('rating')->findOrFail($id);

        // Obtener la calificación inicial del libro (si existe)
        $initialRating = $book->rating->rate ?? 0; // Usa un valor predeterminado si no hay calificación

        // Renderizar la vista 'BookRating' con los datos del libro y su calificación inicial
        return Inertia::render('BookRating', [
            'book' => $book,
            'initialRating' => $initialRating
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // Validar los datos de la solicitud
        $request->validate([
            'rate' => 'required|numeric|min:1', // Asegúrate de validar como número y que sea al menos 1
            'book_id' => 'required|exists:books,id', // Asegúrate de que el libro exista en la base de datos
        ]);

        // Buscar y actualizar la calificación del usuario para el libro específico
        $rate = Rate::where('book_id', $request->book_id)
            ->where('user_id', auth()->id())
            ->firstOrFail();
        $rate->rate = $request->rate;
        $rate->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Buscar y eliminar la calificación del usuario para el libro específico
        $rate = Rate::where('book_id', $id)->where('user_id', auth()->id())->firstOrFail();
        if ($rate) {
            $rate->delete();
        }
    }
}
