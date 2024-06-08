<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\BookToLibrary;
use App\Models\Book;
use App\Models\Library;

class BookToLibraryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_add_book_to_library()
    {
        $this->withoutExceptionHandling();
        
        $book = Book::factory()->create();
        $library = Library::factory()->create();

        $response = $this->post("/book-to-library", [
            'book_id' => $book->id,
            'library_id' => $library->id
        ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('book_to_libraries', [
            'book_id' => $book->id,
            'library_id' => $library->id
        ]);
    }

    /** @test */
    public function user_cannot_add_duplicate_book_to_library()
    {
        $book = Book::factory()->create();
        $library = Library::factory()->create();

        $bookToLibrary = BookToLibrary::create([
            'book_id' => $book->id,
            'library_id' => $library->id
        ]);

        $response = $this->post("/book-to-library", [
            'book_id' => $book->id,
            'library_id' => $library->id
        ]);

        $response->assertStatus(302);
        $this->assertEquals(1, BookToLibrary::count());
    }

    /** @test */
    public function user_can_remove_book_from_library()
    {
        $book = Book::factory()->create();
        $library = Library::factory()->create();

        $bookToLibrary = BookToLibrary::create([
            'book_id' => $book->id,
            'library_id' => $library->id
        ]);

        $response = $this->delete("/book-to-library/{$book->id}/{$library->id}");

        $response->assertStatus(200);
        $this->assertEquals(0, BookToLibrary::count());
    }
}
