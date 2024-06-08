<?php

namespace Tests\Feature;

use App\Models\Book;
use App\Models\Library;
use App\Models\Rate;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_index(): void
    {
        $response = $this->get('/admin');

        $response->assertStatus(200);
    }

    public function test_admin_users(): void
    {
        $response = $this->get('/admin/users');

        $response->assertStatus(200);
    }

    public function test_admin_books(): void
    {
        $response = $this->get('/admin/books');

        $response->assertStatus(200);
    }

    public function test_admin_user_destroy(): void
    {
        $user = User::factory()->create();

        $response = $this->delete("/admin/users/{$user->id}");

        $response->assertRedirect('/admin/users');
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_admin_book_destroy(): void
    {
        $book = Book::factory()->create();

        $response = $this->delete("/admin/books/{$book->id}");

        $response->assertRedirect('/admin/books');
        $this->assertDatabaseMissing('books', ['id' => $book->id]);
    }

    public function test_admin_user_view(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get('/dashboard');

        $response->assertStatus(200);
    }
}
