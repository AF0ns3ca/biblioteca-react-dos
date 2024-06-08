<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Review;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ReviewControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_review()
    {
        // Crear un usuario de prueba
        $user = User::factory()->create();

        // Autenticar como el usuario creado
        $this->actingAs($user);

        // Crear una revisión de prueba
        $review = Review::factory()->make();

        // Hacer una solicitud para crear una revisión
        $response = $this->post(route('reviews.store'), [
            'user_id' => $review->user_id,
            'book_id' => $review->book_id,
            'review' => $review->review,
        ]);

        // Verificar que la revisión se haya creado correctamente
        $response->assertRedirect(route('reviews.index'));
        $this->assertDatabaseHas('reviews', [
            'user_id' => $review->user_id,
            'book_id' => $review->book_id,
            'review' => $review->review,
        ]);
    }

    public function test_can_update_review()
    {
        // Crear una revisión de prueba
        $review = Review::factory()->create();

        // Hacer una solicitud para actualizar la revisión
        $response = $this->put(route('reviews.update', $review->id), [
            'review' => 'Updated review text',
        ]);

        // Verificar que la revisión se haya actualizado correctamente
        $response->assertRedirect(route('dashboard'));
        $this->assertDatabaseHas('reviews', [
            'id' => $review->id,
            'review' => 'Updated review text',
        ]);
    }


    // Otros métodos de prueba para otros casos de uso, como la visualización de revisiones, la edición de revisiones, etc.
}
