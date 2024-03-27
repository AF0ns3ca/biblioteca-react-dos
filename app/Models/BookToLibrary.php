<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookToLibrary extends Model
{


    protected $fillable = [
        'book_id',
        'library_id'
    ];

    use HasFactory;
}
