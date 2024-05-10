<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\BookToLibraryController;
use App\Http\Controllers\RateController;
use App\Http\Controllers\AdminController;
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
    Route::get('/admin', function () {
        return Inertia::render('Admin/Index');
    })->name('admin.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


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

});

Route::middleware(['auth', 'verified', 'check.role:admin'])->group(function () {
    Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
    Route::delete('/admin/users/{id}', [AdminController::class, 'userDestroy'])->name('admin.userDestroy');
    Route::get('/admin/books', [AdminController::class, 'books'])->name('admin.books');

});





require __DIR__ . '/auth.php';
