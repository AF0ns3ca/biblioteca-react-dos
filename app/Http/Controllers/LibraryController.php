<?php

namespace App\Http\Controllers;

use App\Models\Library;
use App\Models\Book;
use App\Models\BookToLibrary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LibraryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Devolver a vista con todas las bibliotecas que tengan el mismo id que el usuario logueado con inertia
        // return Inertia::render('Libraries/Index', [
        //     'libraries' => Library::where('user_id', auth()->id())->get()
        // ]);

        $librariesWithBookCount = Library::where('user_id', auth()->id())
        ->withCount('books') // Contar el número de libros para cada biblioteca
        ->get();

    return Inertia::render('Libraries/Index', [
        'librariesWithBookCount' => $librariesWithBookCount
    ]);


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //redirige a la pagina de creacion de libraries con inertia
        return Inertia::render('Libraries/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // el usuario es el usuario logueado

try{

    $user = auth()->user();
        $request['user_id'] = $user->id;

        $validatedData = $request->validate([
            'nombre' => 'required',
            'tipo' => 'required',
            'user_id' => 'required'
        ]);

        Library::create($validatedData);


        // enviamos al metodo index
        return redirect()->route('libraries.index');

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }

    }

    /**
     * Display the specified resource.
     */
    public function show(String $id)
    {


        // $books = Book::join('book_to_libraries', 'books.id', '=', 'book_to_libraries.book_id')
        //     ->where('book_to_libraries.library_id', $id)
        //     ->get();

        // $books = Book::select('books.*') // Seleccionar todos los campos de la tabla books
        //     ->join('book_to_libraries', 'books.id', '=', 'book_to_libraries.book_id')
        //     ->where('book_to_libraries.library_id', $id)
        //     ->get();

        // Quiero obtener los libros con todos sus datos y su library id que estén en la biblioteca con el id que se pasa por parametro
        $books = Book::select('books.*') // Seleccionar todos los campos de la tabla books
            ->join('book_to_libraries', 'books.id', '=', 'book_to_libraries.book_id')
            ->where('book_to_libraries.library_id', $id)
            ->get();

        // quiero obtener la biblioteca con el id que se pasa por parametro
        $currentLibrary = Library::find($id);

        $librariesWithBookCount = Library::where('user_id', auth()->id())
        ->withCount('books') // Contar el número de libros para cada biblioteca
        ->get();


        //mandar a la vista de show con inertia la biblioteca con el id que se pasa por parametro y los libros que tiene
        return Inertia::render('Libraries/Show', [
            // 'library' => Library::find($id),
            'books' => $books,
            'libraries' => Library::where('user_id', auth()->id())->get(),
            'currentLibrary' => $currentLibrary,
            'librariesWithBookCount' => $librariesWithBookCount


        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Library $library)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Library $library)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        // Encuentra el libro
        $library = Library::findOrFail($id);

        // Verifica si el libro tiene una foto y si no es "base.jpg"
        // if ($book->portada && $book->portada !== 'public/photos/base.jpg') {
        //     // Si tiene una foto y no es "base.jpg", elimínala
        //     Storage::delete($book->portada);
        // }

        // Elimina el libro
        $library->delete();
    }
}
