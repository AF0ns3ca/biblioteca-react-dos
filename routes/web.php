<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\BookToLibraryController;
use App\Models\BookToLibrary;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('books', 'App\Http\Controllers\BookController');
// En routes/web.php
Route::get('/books', [BookController::class, 'index'])->name('books.index');


// ruta a destroy con id
Route::get('/books/{id}', 'App\Http\Controllers\BookController@destroy')->name('books.destroy');

Route::resource('libraries', 'App\Http\Controllers\LibraryController');

Route::post('/libraries', [LibraryController::class, 'store'])->name('libraries.store');
Route::delete('/libraries/{id}', 'App\Http\Controllers\LibraryController@destroy')->name('libraries.destroy');

// Ruta a Book_To_Library metodo store

Route::post('/booktolibrary', [BookToLibraryController::class, 'store'])->name('booktolibrary.store');

// Ruta a Book_To_Library metodo destroy con los parametros bookid y libraryod

Route::delete('/booktolibrary/{book_id}/{library_id}', 'App\Http\Controllers\BookToLibraryController@destroy')->name('booktolibrary.destroy');

//Ruta a metodo Rate store
Route::post('/rate/store', 'App\Http\Controllers\RateController@store')->name('rate.store');
Route::put('/rate/update', 'App\Http\Controllers\RateController@update')->name('rate.update');
Route::delete('/rate/destroy/{id}', 'App\Http\Controllers\RateController@destroy')->name('rate.destroy');







require __DIR__.'/auth.php';
