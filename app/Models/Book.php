<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{

    // Relacion con tabla pivote
    public function libraries()
{
    return $this->belongsToMany(Library::class, 'book_to_libraries');
}

    protected $fillable = [
        'titulo',
        'autor',
        'serie',
        'num_serie',
        'paginas',
        'descripcion',
        'portada'
    ];

    use HasFactory;
}
