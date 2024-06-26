<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rate;
use Inertia\Inertia;
use App\Models\Book;

class RateController extends Controller
{
    //
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'rate' => 'required|numeric|min:1', // Asegúrate de validar como número
            'book_id' => 'required|exists:books,id',
        ]);

        // Añadir user_id al array de datos validados manualmente
        $validatedData['user_id'] = auth()->id();

        Rate::create($validatedData);

        return response()->json(['message' => 'Rating stored successfully'], 200);
    }

    public function show($id)
    {
        $book = Book::with('rating')->findOrFail($id);

        // Asegúrate de que 'initialRating' está correctamente extraído
        $initialRating = $book->rating->rate ?? 0; // Usa un valor predeterminado si no hay calificación

        return Inertia::render('BookRating', [
            'book' => $book,
            'initialRating' => $initialRating
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'rate' => 'required|numeric|min:1',
            'book_id' => 'required|exists:books,id',
        ]);

        $rate = Rate::where('book_id', $request->book_id)
            ->where('user_id', auth()->id())
            ->firstOrFail();
        $rate->rate = $request->rate;
        $rate->save();

        return response()->json(['message' => 'Rating updated successfully'], 200);
    }

    public function destroy($id)
    {
        $rate = Rate::where('book_id', $id)->where('user_id', auth()->id())->first();

        if ($rate) {
            $rate->delete();
            return response()->json(['message' => 'Rating deleted successfully'], 200);
        }

        return response()->json(['message' => 'Rating not found'], 404);
    }
}
