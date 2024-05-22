<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\BookToLibraryController;
use App\Http\Controllers\RateController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ReadingController;
use App\Http\Controllers\ReviewController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified', 'check.role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, "index"])->name('admin.index');

    Route::get('/dashboard', function () {
        // Obtén el usuario autenticado
        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        

        // Renderiza la vista del dashboard y pasa las reseñas con usuarios y libro con rating
        $reviews = Review::with(['book' => function ($query){
            // Cargar la relación 'rate' dentro de 'book'
            $query->leftJoin('rate', function ($join) {
                $join->on('books.id', '=', 'rate.book_id')
                    ->where('rate.user_id', auth()->id());
            })
                       
            ->select('books.*', 'rate.rate as rate');
        }, 'user'])
        ->get();



        return Inertia::render('Dashboard', [
            'reviews' => $reviews,
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ],

        ]);
    })->name('dashboard');

});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        // Obtén el usuario autenticado
        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        // Renderiza la vista del dashboard y pasa las reseñas
        $reviews = Review::with(['book' => function ($query) {
            // Subconsulta para obtener el user_id del libro que se ha reseñado
            $query->select('books.*')
                  ->leftJoin('reviews', 'books.id', '=', 'reviews.book_id')
                  ->leftJoin('rate', function ($join) {
                      $join->on('books.id', '=', 'rate.book_id')
                           ->whereRaw('rate.user_id = reviews.user_id');
                  })
                  ->select('books.*', \DB::raw('COALESCE(rate.rate, 0) as rate'));
        }, 'user'])
        ->get();
        
        
        
        
        
        

        return Inertia::render('Dashboard', [
            'reviews' => $reviews,
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ],

        ]);
    })->name('dashboard');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::resource('books', 'App\Http\Controllers\BookController');
    // En routes/web.php
    Route::get('/books', [BookController::class, 'index'])->name('books.index');


    // ruta a destroy con id


    Route::resource('libraries', 'App\Http\Controllers\LibraryController');

    Route::post('/libraries', [LibraryController::class, 'store'])->name('libraries.store');
    Route::delete('/libraries/{id}', 'App\Http\Controllers\LibraryController@destroy')->name('libraries.destroy');

    // Ruta a Book_To_Library metodo store

    Route::post('/booktolibrary', [BookToLibraryController::class, 'store'])->name('booktolibrary.store');

    // Ruta a Book_To_Library metodo destroy con los parametros bookid y libraryod

    Route::delete('/booktolibrary/{book_id}/{library_id}', 'App\Http\Controllers\BookToLibraryController@destroy')->name('booktolibrary.destroy');

    Route::post('/rate/store', [RateController::class, 'store'])->name('rate.store');
    Route::put('/rate/update/{book}', [RateController::class, 'update'])->name('rate.update');
    Route::delete('/rate/destroy/{book}', [RateController::class, 'destroy'])->name('rate.destroy');

    Route::get('/reading', [ReadingController::class, 'index'])->name('readings.index');

    Route::post('/want_to_read', [ReadingController::class, 'wantRead'])->name('readings.wantRead');
    Route::post('/reading', [ReadingController::class, 'reading'])->name('readings.reading');
    Route::post('/read', [ReadingController::class, 'read'])->name('readings.read');
    Route::post('/update-reading-status', [ReadingController::class, 'updateStatus']);

    Route::delete('/deletereading', 'App\Http\Controllers\ReadingController@destroy')->name('readings.destroy');

    Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
    Route::post('/reviews/store', [ReviewController::class, 'store'])->name('reviews.store');
    Route::patch('/reviews/update/{id}', [ReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/reviews/{id}', 'App\Http\Controllers\ReviewController@destroy')->name('reviews.destroy');


});

Route::middleware(['auth', 'verified', 'check.role:admin'])->group(function () {
    Route::get('/admin_user_view', [AdminController::class, 'userView'])->name('admin.userview');
    Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
    Route::delete('/admin/users/{id}', [AdminController::class, 'userDestroy'])->name('admin.userDestroy');
    Route::get('/admin/books', [AdminController::class, 'books'])->name('admin.books');
    Route::post('/store/books', [BookController::class, 'store'])->name('books.store');
    Route::patch('/update/books/{id}', [BookController::class, 'update'])->name('books.update');
    Route::delete('/books/{id}', 'App\Http\Controllers\BookController@destroy')->name('books.destroy');


});





require __DIR__ . '/auth.php';
