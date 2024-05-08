<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{

    protected $table = 'rate';

    protected $fillable = ['user_id', 'book_id', 'rate'];

    // Relacion con libros donde un libro puede tener muchos rates
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    use HasFactory;
}
