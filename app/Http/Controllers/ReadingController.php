<?php

namespace App\Http\Controllers;

use App\Models\Reading;
use App\Models\Library;
use App\Models\Book;
use App\Models\BookToLibrary;
use App\Models\Rate;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReadingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        // Obtener las últimas lecturas de cada libro
        $lastReadings = Reading::where('user_id', auth()->id())
            ->latest()
            ->get()
            ->unique('book_id');

        // Obtener los IDs de los libros que el usuario quiere leer
        $wantToReadBooksId = Reading::where('user_id', auth()->id())
            ->where('want_to_read', true)
            ->latest()
            ->pluck('book_id');

        // Obtener los libros con sus rates
        $wantToReadBooks = Book::select('books.*', 'rate.rate as rate')
            ->leftJoin('rate', function ($join) {
                $join->on('books.id', '=', 'rate.book_id')
                    ->where('rate.user_id', auth()->id());
            })
            ->whereIn('books.id', $wantToReadBooksId)
            ->get();

        $wantToReadBooks->map(function ($book) {
            $libraries = Library::select('libraries.id', 'libraries.nombre')
                ->join('book_to_libraries', 'libraries.id', '=', 'book_to_libraries.library_id')
                ->where('book_to_libraries.book_id', $book->id)
                ->where('libraries.user_id', auth()->id()) // Filtrar por el usuario autenticado
                ->get();

            $book->libraries = $libraries;

            return $book;
        });
        $wantToReadBooksCount = $wantToReadBooks->count();

        // Obtener los IDs de los libros que el usuario está leyendo
        $readingBooksId = Reading::where('user_id', auth()->id())
            ->where('want_to_read', false)
            ->whereNull('end_date')
            ->latest()
            ->pluck('book_id');

        // Obtener los libros con sus rates
        $readingBooks = Book::select('books.*', 'rate.rate as rate')
            ->leftJoin('rate', function ($join) {
                $join->on('books.id', '=', 'rate.book_id')
                    ->where('rate.user_id', auth()->id());
            })
            ->whereIn('books.id', $readingBooksId)
            ->get();

        $readingBooks->map(function ($book) {
            $libraries = Library::select('libraries.id', 'libraries.nombre')
                ->join('book_to_libraries', 'libraries.id', '=', 'book_to_libraries.library_id')
                ->where('book_to_libraries.book_id', $book->id)
                ->where('libraries.user_id', auth()->id()) // Filtrar por el usuario autenticado
                ->get();

            $book->libraries = $libraries;

            return $book;
        });

        $readingBooksCount = $readingBooks->count();

        // Obtener los IDs de los libros que el usuario ha leído
        $readBooksId = Reading::where('user_id', auth()->id())
            ->where('want_to_read', false)
            ->whereNotNull('end_date')
            ->latest()
            ->pluck('book_id');

        // Obtener los libros con sus rates
        $readBooks = Book::select('books.*', 'rate.rate as rate')
            ->leftJoin('rate', function ($join) {
                $join->on('books.id', '=', 'rate.book_id')
                    ->where('rate.user_id', auth()->id());
            })
            ->whereIn('books.id', $readBooksId)
            ->get();

            $readBooks->map(function ($book) {
                // Obtener las bibliotecas asociadas al libro para el usuario autenticado
                $libraries = Library::select('libraries.id', 'libraries.nombre')
                    ->join('book_to_libraries', 'libraries.id', '=', 'book_to_libraries.library_id')
                    ->where('book_to_libraries.book_id', $book->id)
                    ->where('libraries.user_id', auth()->id())
                    ->get();
            
                // Obtener las fechas start_date y end_date desde la tabla readings
                $reading = DB::table('readings')
                    ->select('start_date', 'end_date')
                    ->where('book_id', $book->id)
                    ->where('user_id', auth()->id())
                    ->first();
            
                // Agregar las bibliotecas al objeto del libro
                $book->libraries = $libraries;
            
                // Agregar start_date y end_date al objeto del libro, si existen
                $book->start_date = $reading ? $reading->start_date : null;
                $book->end_date = $reading ? $reading->end_date : null;
            
                return $book;
            });

        $readBooksCount = $readBooks->count();

        // Asignar el estado a cada libro
        foreach ($wantToReadBooks as $book) {
            $book->status = 'quiero_leer';
        }

        foreach ($readingBooks as $book) {
            $book->status = 'leyendo';
        }

        foreach ($readBooks as $book) {
            $book->status = 'leido';
        }

        // Obtener las bibliotecas con el conteo de libros
        $librariesWithBookCount = Library::where('user_id', auth()->id())
            ->withCount('books')
            ->get();


        return Inertia::render('Readings/Index', [
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ],
            'wantToReadBooks' => $wantToReadBooks,
            'readingBooks' => $readingBooks,
            'readBooks' => $readBooks,
            'wantToReadBooksCount' => $wantToReadBooksCount,
            'readingBooksCount' => $readingBooksCount,
            'readBooksCount' => $readBooksCount,
            'librariesWithBookCount' => $librariesWithBookCount,
        ]);
    }


    public function updateStatus(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'status' => 'required|in:quiero_leer,leyendo,leido',
            'want_to_read' => 'boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        $userId = auth()->id();
        $bookId = $request->book_id;

        // Buscar si existe un registro de lectura para este libro y usuario
        $existingReading = Reading::where('user_id', $userId)
            ->where('book_id', $bookId)
            ->latest()
            ->first();

        // Crear un nuevo registro si no existe uno existente
        // o si el registro existente no cumple con las condiciones para ser actualizado
        if (!$existingReading || ($existingReading->want_to_read === 0 && $existingReading->start_date && $existingReading->end_date)) {
            $reading = new Reading();
            $reading->user_id = $userId;
            $reading->book_id = $bookId;
        } else {
            // Actualizar el registro existente
            $reading = $existingReading;
        }

        // Actualizar o crear el registro según el estado seleccionado
        if ($request->status === 'quiero_leer') {
            $wantToRead = true;
            $startDate = null;
            $endDate = null;
        } elseif ($request->status === 'leyendo') {
            $wantToRead = false;
            $startDate = $reading->start_date ?? now(); // Si hay una fecha de inicio existente, mantenerla
            $endDate = null;
        } elseif ($request->status === 'leido') {
            $wantToRead = false;
            $startDate = $reading->start_date ?? now(); // Si hay una fecha de inicio existente, mantenerla
            $endDate = now();
        }

        // Guardar el registro de lectura
        $reading->want_to_read = $wantToRead;
        $reading->start_date = $startDate;
        $reading->end_date = $endDate;
        $reading->save();

        return redirect()->back()->with('success', 'Book status updated successfully.');
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
        //

    }

    /**
     * Display the specified resource.
     */
    public function show(Reading $reading)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reading $reading)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reading $reading)
    {
        //
    }

    /**
     * Update the reading dates.
     */
    public function updateDates(Request $request, $id)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $reading = Reading::findOrFail($id);
        $reading->start_date = $request->start_date;
        $reading->end_date = $request->end_date;
        $reading->save();

        // Devolver la vista anterior
        return redirect()->back()->with('success', 'Reading dates updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // Validar los datos de la solicitud
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'status' => 'required|in:quiero_leer,leyendo,leido',
        ]);

        try {
            // Obtener los parámetros de la solicitud
            $userId = $request->user_id;
            $bookId = $request->book_id;
            $status = $request->status;

            // Definir las condiciones basadas en el estado proporcionado
            switch ($status) {
                case 'quiero_leer':
                    $conditions = [
                        ['user_id', '=', $userId],
                        ['book_id', '=', $bookId],
                        ['want_to_read', '=', true],
                    ];
                    break;
                case 'leyendo':
                    $conditions = [
                        ['user_id', '=', $userId],
                        ['book_id', '=', $bookId],
                        ['want_to_read', '=', false],
                        ['start_date', 'IS NOT', null],
                        ['end_date', '=', null],
                    ];
                    break;
                case 'leido':
                    $conditions = [
                        ['user_id', '=', $userId],
                        ['book_id', '=', $bookId],
                        ['want_to_read', '=', false],
                        ['start_date', 'IS NOT', null],
                        ['end_date', 'IS NOT', null],
                    ];
                    break;
                default:
                    // Si el estado no es válido, devolver un mensaje de error
                    return redirect()->back()->with('error', 'Invalid status');
            }

            // Buscar la lectura que cumple con las condiciones proporcionadas
            $reading = Reading::where($conditions)->first();

            // Verificar si se encontró una lectura
            if ($reading) {
                // Eliminar la lectura
                $reading->delete();

                // Devolver la vista anterior
                return redirect()->back()->with('success', 'Reading deleted successfully');
            } else {
                // Si no se encontró ninguna lectura, devolver un mensaje de error
                return redirect()->back()->with('error', 'Reading not found');
            }
        } catch (\Exception $e) {
            // Capturar y manejar cualquier excepción que ocurra
            dd($e->getMessage()); // Muestra el mensaje de error
        }
    }

    public function deleteReading(string $id)
    {
        $reading = Reading::findOrFail($id);
        $reading->delete();

        return redirect()->back()->with('success', 'Reading deleted successfully');

    }


}
