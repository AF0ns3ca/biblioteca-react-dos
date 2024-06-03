<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\BookToLibraryController;
use App\Http\Controllers\RateController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ReadingController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PremiumController;
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

Route::options('/{any}', function () {
    return response()->json([], 200);
})->where('any', '.*');

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
        $reviews = Review::with([
            'book' => function ($query) {
                // Cargar la relación 'rate' dentro de 'book'
                $query->leftJoin('rate', function ($join) {
                    $join->on('books.id', '=', 'rate.book_id')
                        ->where('rate.user_id', auth()->id());
                })
                ->select('books.*', 'rate.rate as rate');
            },
            'user'
        ])
        ->orderBy('updated_at', 'desc') // Primero ordena por fecha de modificación en orden descendente
        ->orderBy('created_at', 'desc') // Luego ordena por fecha de creación en orden descendente
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
    Route::get('/books', [BookController::class, 'index'])->name('books.index');
    Route::get('/books/{id}', [BookController::class, 'show'])->name('books.show');

    // -------------------------- Rutas de bibliotecas --------------------------
    Route::get('/libraries', [LibraryController::class, 'index'])->name('libraries.index');
    Route::post('/libraries', [LibraryController::class, 'store'])->name('libraries.store');
    Route::get('/libraries/{id}', [LibraryController::class, 'show'])->name('libraries.show');
    Route::put('/libraries/{id}', [LibraryController::class, 'update'])->name('libraries.update');
    Route::delete('/libraries/{id}', [LibraryController::class, 'destroy'])->name('libraries.destroy');

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
    Route::get('/readings/{id}/edit-dates', [ReadingController::class, 'editDates'])->name('readings.editDates');
    Route::put('/readings/{id}/update-dates', [ReadingController::class, 'updateDates'])->name('readings.updateDates');
    Route::delete('/readings/{id}/delete-dates', [ReadingController::class, 'deleteReading'])->name('readings.deleteReading');

    // -------------------------- Rutas de Reviews --------------------------
    Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
    Route::post('/reviews/store', [ReviewController::class, 'store'])->name('reviews.store');
    Route::patch('/reviews/update/{id}', [ReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy'])->name('reviews.destroy');

    // -------------------------- Rutas de Premium --------------------------
    Route::get('/premium', [PremiumController::class, 'index'])->name('premium.index');
    Route::post('/create-checkout-session', [PremiumController::class, 'createCheckoutSession'])->name('premium.checkout');
    Route::get('/update-subscription', [PremiumController::class, 'updateSubscription'])->name('premium.update');
});



require __DIR__ . '/auth.php';
