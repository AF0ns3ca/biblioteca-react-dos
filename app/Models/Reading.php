<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reading extends Model
{

    // Relacion con la tabla books
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    protected $fillable = ['book_id', 'want_to_read', 'start_date', 'end_date'];

    use HasFactory;
}
