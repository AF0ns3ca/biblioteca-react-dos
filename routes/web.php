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
    // -------------------------- Rutas de admin --------------------------
    Route::get('/admin', [AdminController::class, "index"])->name('admin.index');
    // Route::get('/admin_user_view', [AdminController::class, 'userView'])->name('admin.userview');
    Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
    Route::delete('/admin/users/{id}', [AdminController::class, 'userDestroy'])->name('admin.userDestroy');
    Route::get('/admin/books', [AdminController::class, 'books'])->name('admin.books');
    // -------------------------- Rutas de libros --------------------------
    Route::post('/store/books', [BookController::class, 'store'])->name('books.store');
    Route::patch('/update/books/{id}', [BookController::class, 'update'])->name('books.update');
    Route::delete('/books/{id}', [BookController::class, 'destroy'])->name('books.destroy');
    // Route::get('/dashboard', function () {  
    //     $user = Auth::user()->load('roles');
    //     $userRole = $user->roles->first()->role;        
    //     $reviews = Review::with(['book' => function ($query) {
    //         $query->select('books.*')
    //               ->leftJoin('reviews', 'books.id', '=', 'reviews.book_id')
    //               ->leftJoin('rate', function ($join) {
    //                   $join->on('books.id', '=', 'rate.book_id')
    //                        ->whereRaw('rate.user_id = reviews.user_id');
    //               })
    //               ->select('books.*', \DB::raw('COALESCE(rate.rate, 0) as rate'));
    //     }, 'user'])
    //     ->get();
    //     return Inertia::render('Dashboard', [
    //         'reviews' => $reviews,
    //         'auth' => [
    //             'user' => array_merge($user->toArray(), ['role' => $userRole]),
    //         ],
    //     ]);
    // })->name('dashboard');
});


Route::middleware(['auth', 'verified'])->group(function () {
    // -------------------------- Rutas de dashboard --------------------------
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

    // -------------------------- Rutas de perfil --------------------------
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // -------------------------- Rutas de libros --------------------------
    Route::resource('books', 'App\Http\Controllers\BookController');
    Route::get('/books', [BookController::class, 'index'])->name('books.index');
    
    // -------------------------- Rutas de bibliotecas --------------------------
    Route::resource('libraries', 'App\Http\Controllers\LibraryController');
    Route::post('/libraries', [LibraryController::class, 'store'])->name('libraries.store');
    Route::delete('/libraries/{id}', 'App\Http\Controllers\LibraryController@destroy')->name('libraries.destroy');
    
    // -------------------------- Rutas de Book_To_Library --------------------------
    Route::post('/booktolibrary', [BookToLibraryController::class, 'store'])->name('booktolibrary.store');
    Route::delete('/booktolibrary/{book_id}/{library_id}', [BookToLibraryController::class, 'destroy'])->name('booktolibrary.destroy');

    // -------------------------- Rutas de Rate --------------------------
    Route::post('/rate/store', [RateController::class, 'store'])->name('rate.store');
    Route::put('/rate/update/{book}', [RateController::class, 'update'])->name('rate.update');
    Route::delete('/rate/destroy/{book}', [RateController::class, 'destroy'])->name('rate.destroy');

    // -------------------------- Rutas de Reading --------------------------
    Route::get('/reading', [ReadingController::class, 'index'])->name('readings.index');
    Route::post('/want_to_read', [ReadingController::class, 'wantRead'])->name('readings.wantRead');
    Route::post('/reading', [ReadingController::class, 'reading'])->name('readings.reading');
    Route::post('/read', [ReadingController::class, 'read'])->name('readings.read');
    Route::post('/update-reading-status', [ReadingController::class, 'updateStatus']);
    Route::delete('/deletereading', [ReadingController::class, 'destroy'])->name('readings.destroy');

    // -------------------------- Rutas de Reviews --------------------------
    Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
    Route::post('/reviews/store', [ReviewController::class, 'store'])->name('reviews.store');
    Route::patch('/reviews/update/{id}', [ReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
});







require __DIR__ . '/auth.php';
