<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Book;
use Illuminate\Support\Facades\Storage;



class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Books/Index', [
            'books' => Book::all()
        ]);
    }

    public function indexLastBooks()
    {
        // Lógica para mostrar los últimos 3 libros añadidos
        $lastBooks = Book::orderBy('created_at', 'desc')->take(3)->get();
        $booksCount = Book::count();
        $pagesCount = Book::sum('paginas');
        $authorsCount = Book::distinct()->count('autor');
        $seriesCount = Book::distinct()->count('serie');

        return view('welcome', ['lastBooks' => $lastBooks, 'booksCount' => $booksCount, 'authorsCount' => $authorsCount, 'seriesCount' => $seriesCount, 'pagesCount' => $pagesCount]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //redirige a la pagina add en la carpeta templates
        return view('books.store');
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     //
    //     $validatedData = $request->validate([
    //         'titulo' => 'required|max:45',
    //         'autor' => 'required|max:45',
    //         'serie' => 'max:45|nullable',
    //         'num_serie' => 'numeric|nullable',
    //         'paginas' => 'required|numeric',
    //         'estante' => 'required|numeric',
    //         'balda' => 'required|max:45',
    //         'fila' => 'required|max:45',
    //         'portada' => 'image|nullable'

    //     ]);

    //     if ($request->hasFile('portada')) {
    //         $path = $request->file('portada')->store('public/photos');
    //         $validatedData['portada'] = $path;
    //     } else {
    //         $path = 'public/photos/base.jpg';
    //         $validatedData['portada'] = $path;
    //     }

    //     Book::create($validatedData);
    //     return redirect(route('books.index'))->with('success', 'Book is successfully saved');
    // }

    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'titulo' => 'required|max:255',
            'autor' => 'required|max:255',
            'serie' => 'max:255|nullable',
            'num_serie' => 'numeric|nullable',
            'paginas' => 'required|numeric',
            'estante' => 'required|numeric',
            'balda' => 'required|max:255',
            'fila' => 'required|max:255'

        ]);

        if ($request->hasFile('portada')) {
            $path = $request->file('portada')->store('public/photos');
            $validatedData['portada'] = $path;
        } elseif ($request->has('url_portada')) {
            // Obtener la URL de la portada desde la solicitud
            $url = $request->input('url_portada');

            // Validar si la URL es válida (puedes agregar más validaciones según tus necesidades)
            if (filter_var($url, FILTER_VALIDATE_URL)) {
                // Asignar la URL como la portada
                $validatedData['portada'] = $url;
            } else {
                // En caso de que la URL no sea válida, asignar la portada base.jpg local
                $validatedData['portada'] = null;
            }
        } else {
            // Si no se proporciona ni un archivo ni una URL, asignar la portada null
            $validatedData['portada'] = null;
        }


        Book::create($validatedData);
        return redirect(route('books.index'))->with('success', 'Book is successfully saved');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $book = Book::findOrFail($id);
        // Devolver con inertia
        return Inertia::render('Books/Show', [
            'book' => $book
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $book = Book::findOrFail($id);
        return view('books.edit', compact('book'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $validatedData = $request->validate([
            'titulo' => 'required|max:255',
            'autor' => 'required|max:255',
            'serie' => 'max:255|nullable',
            'num_serie' => 'numeric|nullable',
            'paginas' => 'required|numeric',
            'estante' => 'required|numeric',
            'balda' => 'required|max:255',
            'fila' => 'required|max:255',
            'portada' => 'image|nullable'

        ]);

        if ($request->hasFile('portada')) {
            $path = $request->file('portada')->store('public/photos');
            $validatedData['portada'] = $path;
        } elseif ($request->has('url_portada')) {
            // Obtener la URL de la portada desde la solicitud
            $url = $request->input('url_portada');

            // Validar si la URL es válida (puedes agregar más validaciones según tus necesidades)
            if (filter_var($url, FILTER_VALIDATE_URL)) {
                // Asignar la URL como la portada
                $validatedData['portada'] = $url;
            } else {
                // En caso de que la URL no sea válida, mantener la portada actual
                $book = Book::findOrFail($id);
                $validatedData['portada'] = $book->portada;
            }
        } else {
            // Si no se proporciona ni un archivo ni una URL, si la portada ya existe, mantenerla
            $book = Book::findOrFail($id);
            $validatedData['portada'] = $book->portada;

        }

        Book::whereId($id)->update($validatedData);
        return redirect(route('books.index'))->with('success', 'Book is successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(string $id)
    // {

    //     $book = Book::findOrFail($id);
    //     $book->delete();
    //     return redirect(route('books.index'))->with('success', 'Book is successfully deleted');
    // }

    // public function destroy(string $id)
    // {
    //     // Encuentra el libro
    //     $book = Book::findOrFail($id);

    //     // Verifica si el libro tiene una foto
    //     if ($book->portada) {
    //         // Si tiene una foto, elimínala
    //         Storage::delete($book->portada);
    //     }

    //     // Elimina el libro
    //     $book->delete();

    //     // Redirige con un mensaje de éxito
    //     return redirect(route('books.index'))->with('success', 'Book is successfully deleted');
    // }

    // public function destroy(string $id)
    // {
    //     // Encuentra el libro
    //     $book = Book::findOrFail($id);

    //     // Verifica si el libro tiene una foto y si no es "base.jpg"
    //     if ($book->portada && $book->portada !== 'public/photos/base.jpg') {
    //         // Si tiene una foto y no es "base.jpg", elimínala
    //         Storage::delete($book->portada);
    //     }

    //     // Elimina el libro
    //     $book->delete();

    //     // Redirige con un mensaje de éxito
    //     return redirect(route('books.index'))->with('success', 'Book is successfully deleted');
    // }

    public function destroy(string $id)
    {
        // Encuentra el libro
        $book = Book::findOrFail($id);

        // Verifica si el libro tiene una foto y si no es "base.jpg"
        if ($book->portada && $book->portada !== 'public/photos/base.jpg') {
            // Si tiene una foto y no es "base.jpg", elimínala
            Storage::delete($book->portada);
        }

        // Elimina el libro
        $book->delete();
    }
}
