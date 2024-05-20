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

        $validatedData = $request->validate([
            'book_id' => 'required',
            'library_id' => 'required'
        ]);

        BookToLibrary::create($validatedData);

        // Devolver la pagina en la que estabamos
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
        BookToLibrary::where('book_id', $bookId)->where('library_id', $libraryId)->delete();
    }
}
