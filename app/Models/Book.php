<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{

    protected $fillable = [
        'titulo',
        'autor',
        'serie',
        'num_serie',
        'paginas',
        'estante',
        'balda',
        'fila',
        'portada'
    ];

    use HasFactory;
}
