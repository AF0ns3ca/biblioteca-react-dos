<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class BookTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_view_all_books()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get('/books');

        $response->assertStatus(200);
        // Add more assertions based on the expected behavior
    }

    /** @test */
    public function user_can_create_a_book()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post('/books', [
            'titulo' => 'Example Book',
            'autor' => 'John Doe',
            // Add other required fields
            'portada' => UploadedFile::fake()->image('book.jpg')
        ]);

        $response->assertStatus(302);
        $response->assertRedirect('/admin.books');
        $this->assertCount(1, Book::all());
        // Add more assertions based on the expected behavior
    }

    /** @test */
    public function user_can_view_a_book()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $book = Book::factory()->create();

        $response = $this->get("/books/{$book->id}");

        $response->assertStatus(200);
        // Add more assertions based on the expected behavior
    }

    /** @test */
    public function user_can_update_a_book()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $this->actingAs($user);

        $book = Book::factory()->create();

        $response = $this->put("/books/{$book->id}", [
            'titulo' => 'Updated Book Title',
            // Add other fields to update
        ]);

        $response->assertStatus(200);
        $this->assertEquals('Updated Book Title', $book->fresh()->titulo);
        // Add more assertions based on the expected behavior
    }

    /** @test */
    public function user_can_delete_a_book()
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $this->actingAs($user);

        $book = Book::factory()->create();

        $response = $this->delete("/books/{$book->id}");

        $response->assertStatus(302);
        $response->assertRedirect('/admin.books');
        $this->assertCount(0, Book::all());
        // Add more assertions based on the expected behavior
    }
}
