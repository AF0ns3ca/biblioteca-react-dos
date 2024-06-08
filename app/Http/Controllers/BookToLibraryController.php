<?php

namespace App\Http\Controllers;

use App\Models\BookToLibrary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookToLibraryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos de la solicitud
        $validatedData = $request->validate([
            'book_id' => 'required',
            'library_id' => 'required'
        ]);

        // Verificar si el libro ya está en la biblioteca
        $bookAlreadyInLibrary = BookToLibrary::where('book_id', $request->book_id)
            ->where('library_id', $request->library_id)
            ->exists();

        // Si el libro ya está en la biblioteca, mostrar un mensaje de error
        if ($bookAlreadyInLibrary) {
            return back()->withErrors(['error' => 'Este libro ya está en la biblioteca.']);
        }

        // Crear la relación entre el libro y la biblioteca
        BookToLibrary::create($validatedData);

        // Redireccionar de vuelta
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(BookToLibrary $bookToLibrary)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookToLibrary $bookToLibrary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BookToLibrary $bookToLibrary)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($bookId, $libraryId)
    {
        // Eliminar la relación entre el libro y la biblioteca
        BookToLibrary::where('book_id', $bookId)->where('library_id', $libraryId)->delete();
    }
}
