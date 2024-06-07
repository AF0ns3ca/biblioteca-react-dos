<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Book;
use App\Models\Library;
use App\Models\Rate;
use Illuminate\Support\Facades\Storage;
use App\Models\Reading;




class BookController extends Controller
{
    /**
     * Función para mostrar todos los libros, ordenados por título y con su estado de lectura y bibliotecas asociadas al usuario autenticado en la aplicación. También se puede filtrar por autor. 
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {

        // Obtén el usuario autenticado con su rol
        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        // Inicializar la variable para determinar si la página es la primera
        $pageOne = false;

        // Obtener el autor de la solicitud
        $autor = $request->query('autor');

        if ($autor) {
            $books = Book::where('autor', 'like', "%{$autor}%")->get();
            $pageOne = true;
        } else {
            // Obtener todos los libros ordenados por titulo
            $books = Book::orderBy('titulo')->get();
        }

        $librariesWithBookCount = Library::where('user_id', auth()->id())
            ->withCount('books') // Contar el número de libros para cada biblioteca
            ->get();

        // Añadir a cada libro su status
        $books->map(function ($book) {
            $reading = Reading::where('book_id', $book->id)
                ->where('user_id', auth()->id())
                ->latest()
                ->first();

            // Determinar el estado del libro
            if ($reading && $reading->end_date) {
                $status = 'leido';
            } elseif ($reading && $reading->start_date) {
                $status = 'leyendo';
            } elseif ($reading && $reading->want_to_read) {
                $status = 'quiero_leer';
            } else {
                // Si no hay registro de lectura, establecer el estado predeterminado
                $status = '';
            }

            $book->status = $status;

            return $book;
        });

        $books->map(function ($book) {
            $libraries = Library::select('libraries.id', 'libraries.nombre')
                ->join('book_to_libraries', 'libraries.id', '=', 'book_to_libraries.library_id')
                ->where('book_to_libraries.book_id', $book->id)
                ->where('libraries.user_id', auth()->id()) // Filtrar por el usuario autenticado
                ->get();

            $book->libraries = $libraries;

            return $book;
        });

        return Inertia::render('Books/Index', [
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ],
            // devolver los libros ordenados por titulo
            'books' => $books,
            // Mandamos el conteo de libros por biblioteca
            'librariesWithBookCount' => $librariesWithBookCount,
            'pageOne' => $pageOne,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //redirige a la pagina add en la carpeta templates
        return view('books.store');
    }

    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'titulo' => 'required|max:255',
            'autor' => 'required|max:255',
            'serie' => 'max:255|nullable',
            'num_serie' => 'numeric|nullable',
            'descripcion' => 'nullable',
            'paginas' => 'required|numeric',
            'portada' => 'image|nullable|mimes:jpeg,png,jpg,gif,svg|max:2048',

        ]);


        if ($request->hasFile('portada')) {
            $portada = $request->file('portada');
            $path = $portada->store('public/photos');
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
        return to_route('admin.books');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        $books = Book::select('books.*', 'rate.rate as rate', 'book_to_libraries.library_id as library')
            ->leftJoin('rate', function ($join) {
                $join->on('books.id', '=', 'rate.book_id')
                    ->where('rate.user_id', auth()->id());
            })
            ->leftJoin('book_to_libraries', 'books.id', '=', 'book_to_libraries.book_id')
            ->where('books.id', $id) // Agregamos la condición para obtener el libro específico
            ->get();

        $books->map(function ($book) {
            $libraries = Library::select('libraries.id', 'libraries.nombre')
                ->join('book_to_libraries', 'libraries.id', '=', 'book_to_libraries.library_id')
                ->where('book_to_libraries.book_id', $book->id)
                ->where('libraries.user_id', auth()->id()) // Filtrar por el usuario autenticado
                ->get();

            $book->libraries = $libraries;

            return $book;
        });

        // Encuentra el libro
        $book = $books->first();

        $autor = $book->autor;
        // Buscar libros del mismo autor ordenados primero por serie y numero y luego por titulo que no sean el mismo libro
        $booksAuthor = Book::where('autor', 'like', "%{$autor}%")->where('id', '!=', $book->id)->orderBy('serie')->orderBy('num_serie')->orderBy('titulo')->get();
        $booksAuthorCount = Book::where('autor', 'like', "%{$autor}%")->count();


        $serie = $book->serie;
        // Buscar libros de la misma serie ordenados por numero de serie y luego por titulo que no sean el mismo libro que no sea null
        $booksSerie = Book::where('serie', 'like', "%{$serie}%")->where('id', '!=', $book->id)->whereNotNull('num_serie')->orderBy('num_serie')->orderBy('titulo')->get();
        $booksSerieCount = Book::where('serie', 'like', "%{$serie}%")->count();

        $reading = Reading::where('book_id', $book->id)
            ->where('user_id', auth()->id())
            ->latest()
            ->first();

        // Determinar el estado del libro
        if ($reading && $reading->end_date) {
            $status = 'leido';
        } elseif ($reading && $reading->start_date) {
            $status = 'leyendo';
        } elseif ($reading && $reading->want_to_read) {
            $status = 'quiero_leer';
        } else {
            // Si no hay registro de lectura, establecer el estado predeterminado
            $status = null;
        }

        $book->status = $status;



        $librariesWithBookCount = Library::where('user_id', auth()->id())
            ->withCount('books') // Contar el número de libros para cada biblioteca
            ->get();

        // Devolver todas las fechas de inicio y fin de lectura del libro
        $dates = Reading::where('book_id', $book->id)
            ->where('user_id', auth()->id())
            ->whereNotNull('start_date')
            ->whereNotNull('end_date')
            ->get();

        // Contar el número de lecturas del libro, es decir los registros de lectura con el mismo libro_id y que tenga fecha de inicio y de fin
        $datesCount = Reading::where('book_id', $book->id)
            ->where('user_id', auth()->id())
            ->whereNotNull('start_date')
            ->whereNotNull('end_date')
            ->count();


        // Devolver con inertia
        return Inertia::render('Books/Show', [
            'book' => $book,
            'booksAuthor' => $booksAuthor,
            'booksSerie' => $booksSerie,
            'booksAuthorCount' => $booksAuthorCount,
            'booksSerieCount' => $booksSerieCount,
            'librariesWithBookCount' => $librariesWithBookCount,
            'dates' => $dates,
            'datesCount' => $datesCount,
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        // $book = Book::findOrFail($id);
        // return view('books.edit', compact('book'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {


        $book = Book::findOrFail($id);  


        
        $validatedData = $request->validate([
            'titulo' => 'required|max:255',
            'autor' => 'required|max:255',
            'serie' => 'max:255|nullable',
            'num_serie' => 'numeric|nullable',
            'descripcion' => 'nullable',
            'paginas' => 'required|numeric',
            'portada' => 'image|nullable|mimes:jpeg,png,jpg,gif,svg|max:2048',

        ]);


        if ($request->hasFile('portada')) {
            $portada = $request->file('portada');
            $path = $portada->store('public/photos');
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
            $validatedData['portada'] = $book->portada;
        }

       

        $book->update($validatedData);
        // return to_route('admin.books');
    }


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

        return to_route('admin.books');
    }
}
