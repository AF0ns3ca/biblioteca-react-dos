<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookTest extends TestCase
{
    use RefreshDatabase;

    public function test_books_can_be_created(): void
    {
        $response = $this->post('/store/books', [
            'titulo' => 'The Great Gatsby',
            'autor' => 'F. Scott Fitzgerald',
            'serie' => 'The Great Gatsby',
            'num_serie' => 1,
            'paginas' => 180,
            'descripcion' => 'The Great Gatsby es una novela escrita por el autor estadounidense F. Scott Fitzgerald. Terminada en 1925 y publicada en 1925, la obra maestra de Fitzgerald es ahora considerada por muchos como una crítica de la sociedad estadounidense de la época del jazz en la década de 1920.',
            'portada' => 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FGreat-Gatsby-F-Scott-Fitzgerald%2Fdp%2F0743273567&psig=AOvVaw3Q6Z6
            1Q&ust=1633940730000000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjV9J6VzvMCFQAAAAAdAAAAABAD',
        ]);

        $response->assertRedirect('/books');
        $this->assertDatabaseHas('books', [
            'titulo' => 'The Great Gatsby',
            'autor' => 'F. Scott Fitzgerald',
            'serie' => 'The Great Gatsby',
            'num_serie' => 1,
            'paginas' => 180,
            'descripcion' => 'The Great Gatsby es una novela escrita por el autor estadounidense F. Scott Fitzgerald. Terminada en 1925 y publicada en 1925, la obra maestra de Fitzgerald es ahora considerada por muchos como una crítica de la sociedad estadounidense de la época del jazz en la década de 1920.',
            'portada' => 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FGreat-Gatsby-F-Scott-Fitzgerald%2Fdp%2F0743273567&psig=AOvVaw3Q6Z6
            1Q&ust=1633940730000000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjV9J6VzvMCFQAAAAAdAAAAABAD',
        ]);
    }

    public function test_books_can_be_updated(): void
    {
        $book = Book::factory()->create();

        $response = $this->put("/books/{$book->id}", [
            'title' => 'The Great Gatsby',
            'author' => 'F. Scott Fitzgerald',
        ]);

        $response->assertRedirect('/books');
        $this->assertDatabaseHas('books', [
            'title' => 'The Great Gatsby',
            'author' => 'F. Scott Fitzgerald',
        ]);
    }

    public function test_books_can_be_deleted(): void
    {
        $book = Book::factory()->create();

        $response = $this->delete("/books/{$book->id}");

        $response->assertRedirect('/books');
        $this->assertDatabaseMissing('books', [
            'id' => $book->id,
        ]);
    }
}
