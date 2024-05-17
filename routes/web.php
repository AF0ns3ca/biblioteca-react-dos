<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\BookToLibraryController;
use App\Http\Controllers\RateController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ReadingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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

        // Renderiza la vista del dashboard y pasa los datos del usuario y su rol
        return Inertia::render('Dashboard');
    })->name('dashboard');

});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        // Obtén el usuario autenticado
        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        return Inertia::render('Dashboard', [
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

    //Ruta a metodo Rate store
    // Route::post('/rate/store', 'App\Http\Controllers\RateController@store')->name('rate.store');
    // Route::put('/rate/update', 'App\Http\Controllers\RateController@update')->name('rate.update');
    // Route::delete('/rate/destroy/{id}', 'App\Http\Controllers\RateController@destroy')->name('rate.destroy');
    Route::post('/rate/store', [RateController::class, 'store'])->name('rate.store');
    Route::put('/rate/update/{book}', [RateController::class, 'update'])->name('rate.update');
    Route::delete('/rate/destroy/{book}', [RateController::class, 'destroy'])->name('rate.destroy');

    Route::get('/reading', [ReadingController::class, 'index'])->name('readings.index');

    Route::post('/want_to_read', [ReadingController::class, 'wantRead'])->name('readings.wantRead');
    Route::post('/reading', [ReadingController::class, 'reading'])->name('readings.reading');
    Route::post('/read', [ReadingController::class, 'read'])->name('readings.read');
    Route::post('/update-reading-status', [ReadingController::class, 'updateStatus']);


});

Route::middleware(['auth', 'verified', 'check.role:admin'])->group(function () {
    Route::get('/admin_user_view',[AdminController::class, 'userView'])->name('admin.userview');
    Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
    Route::delete('/admin/users/{id}', [AdminController::class, 'userDestroy'])->name('admin.userDestroy');
    Route::get('/admin/books', [AdminController::class, 'books'])->name('admin.books');
    Route::post('/store/books', [BookController::class, 'store'])->name('books.store');
    Route::patch('/update/books/{id}', [BookController::class, 'update'])->name('books.update');
    Route::delete('/books/{id}', 'App\Http\Controllers\BookController@destroy')->name('books.destroy');


});





require __DIR__ . '/auth.php';
