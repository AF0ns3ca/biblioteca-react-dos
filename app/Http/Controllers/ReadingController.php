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

class ReadingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        // devolver las ultimas Readings de cada libro
        $lastReadings = Reading::where('user_id', auth()->id())
            ->latest()
            ->get()
            ->unique('book_id');

        $wantToReadBooksId = Reading::where('user_id', auth()->id())
            ->where('want_to_read', true)
            ->latest()
            ->pluck('book_id');

        $wantToReadBooks = Book::whereIn('id', $wantToReadBooksId)->get();
        // conteo de libros que estan en estado quiero leer
        $wantToReadBooksCount = $wantToReadBooks->count();
        
        // devolver todos los libros que esten en estado leyendo
        $readingBooksId = Reading::where('user_id', auth()->id())
            ->where('want_to_read', false)
            ->whereNull('end_date')
            ->latest()
            ->pluck('book_id');
        
        $readingBooks = Book::whereIn('id', $readingBooksId)->get();
        // conteo de libros que esten en estado leyendo
        $readingBooksCount = $readingBooks->count();
           
        // devolver todos los libros que esten en estado leido
        $readBooksId = Reading::where('user_id', auth()->id())
            ->where('want_to_read', false)
            ->whereNotNull('end_date')
            ->latest()
            ->pluck('book_id');

        $readBooks = Book::whereIn('id', $readBooksId)->get();
        // conteo de libros que esten en estado leido
        $readBooksCount = $readBooks->count();

        foreach ($wantToReadBooks as $book) {
            $book->status = 'quiero_leer';
        }
    
        foreach ($readingBooks as $book) {
            $book->status = 'leyendo';
        }
    
        foreach ($readBooks as $book) {
            $book->status = 'leido';
        }

        
    

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
     * Remove the specified resource from storage.
     */
    public function destroy(Reading $reading)
    {
        //
    }
}
