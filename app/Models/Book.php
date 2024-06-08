<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{

    // Relacion con tabla readings
    public function readings()
    {
        return $this->hasMany(Reading::class);
    }

    // Relacion con tabla pivote
    public function libraries()
{
    return $this->belongsToMany(Library::class, 'book_to_libraries');
}

    // Relacion con tabla rate conde un libro puede tener muchos rates
    public function rates()
    {
        return $this->hasMany(Rate::class);
    }

    // Relacion con tabla reviews
    public function reviews()
    {
        return $this->hasMany(Review::class);
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
