<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        // devuelve las reviews de la base de datos junto con el rate de los libros y el nombre del usuario que ha hecho la review
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
            ->get();

        return Inertia::render('Dashboard', [
            'reviews' => $reviews,
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ],
        ]);
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
        $validated = $request->validate([
            'user_id' => 'required',
            'book_id' => 'required',
            'review' => 'required',
        ]);

        $review = Review::create($validated);

        // Devolver a dashboard con todas las reviews

        return redirect()->route('reviews.index');

    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        //






    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $validatedData = $request->validate([
        'review' => 'required',
    ]);

    Review::whereId($id)->update($validatedData);

    return to_route('dashboard');

}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        //
    }
}
