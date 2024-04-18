<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Library extends Model
{

    // Relacion con usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacion con tabla pivote
    public function books()
{
    return $this->belongsToMany(Book::class, 'book_to_libraries');
}

    protected $fillable = [
        'nombre',
        'tipo',
        'user_id'
    ];

    use HasFactory;
}
