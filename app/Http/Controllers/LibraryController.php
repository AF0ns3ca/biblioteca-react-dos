<?php

namespace App\Http\Controllers;

use App\Models\Library;
use Illuminate\Support\Facades\Auth;
use App\Models\Book;
use App\Models\BookToLibrary;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Rate;

class LibraryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Cargar información del usuario autenticado
        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;
        
        // Obtener todas las bibliotecas del usuario con el recuento de libros para cada una
        $librariesWithBookCount = Library::where('user_id', auth()->id())
            ->withCount('books')
            ->get();

        // Renderizar la vista de índice con Inertia
        return Inertia::render('Libraries/Index', [
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ],
            'librariesWithBookCount' => $librariesWithBookCount,
            "role" => $user->roles()->pluck('role')->first()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Renderizar la vista de creación con Inertia
        return Inertia::render('Libraries/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Obtener el usuario autenticado
            $user = auth()->user();

            // Verificar el límite de bibliotecas para usuarios normales
            if ($user->roles->pluck('role')->join(', ') === 'user' && $user->libraries()->count() >= 5) {
                // Retornar con un mensaje de error si se alcanza el límite
                return to_route(('libraries.index'));
            }

            // Agregar el ID de usuario a los datos validados
            $request->merge(['user_id' => $user->id]);
            $validatedData = $request->validate([
                'nombre' => 'required',
                'tipo' => 'required',
                'user_id' => 'required'
            ]);

            // Crear la biblioteca con los datos validados
            Library::create($validatedData);

            return to_route(('libraries.index'));
        } catch (\Exception $e) {
            // Manejar cualquier excepción y devolver un mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Obtener información del usuario autenticado
        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        // Obtener libros asociados a la biblioteca específica
        $books = Book::select('books.*', 'rate.rate as rate', 'book_to_libraries.library_id as library')
            ->leftJoin('rate', function ($join) {
                $join->on('books.id', '=', 'rate.book_id')
                    ->where('rate.user_id', auth()->id());
            })
            ->leftJoin('book_to_libraries', 'books.id', '=', 'book_to_libraries.book_id')
            ->where('book_to_libraries.library_id', $id)
            ->get();

        // Mapear las bibliotecas para cada libro
        $books->map(function ($book) {
            $libraries = Library::select('libraries.id', 'libraries.nombre')
                ->join('book_to_libraries', 'libraries.id', '=', 'book_to_libraries.library_id')
                ->where('book_to_libraries.book_id', $book->id)
                ->where('libraries.user_id', auth()->id())
                ->get();

            $book->libraries = $libraries;

            return $book;
        });

        // Obtener la biblioteca actual
        $currentLibrary = Library::find($id);

        // Obtener bibliotecas con el recuento de libros para cada una
        $librariesWithBookCount = Library::where('user_id', auth()->id())
            ->withCount('books')
            ->get();

        // Renderizar la vista de detalle con Inertia
        return Inertia::render('Libraries/Show', [
            'books' => $books,
            'libraries' => Library::where('user_id', auth()->id())->get(),
            'currentLibrary' => $currentLibrary,
            'librariesWithBookCount' => $librariesWithBookCount,
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Library $library)
    {
        // Esta función podría implementarse si se desea permitir la edición de bibliotecas.
        // Por ahora, no se ha implementado ninguna lógica aquí.
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Encontrar la biblioteca a actualizar
        $library = Library::findOrFail($id);

        // Actualizar la biblioteca con los datos del formulario
        $library->update($request->all());

        // Redireccionar al índice de bibliotecas después de la actualización
        return to_route('libraries.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Encontrar la biblioteca a eliminar
        $library = Library::findOrFail($id);

        // Eliminar la biblioteca
        $library->delete();

        // Redireccionar al índice de bibliotecas después de la eliminación
        return to_route('libraries.index');
    }
}
