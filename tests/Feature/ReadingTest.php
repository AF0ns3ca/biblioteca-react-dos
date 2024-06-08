<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Book;
use App\Models\Reading;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ReadingControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_update_reading_status_to_want_to_read()
    {
        // Crear un usuario de prueba
        $user = User::factory()->create();

        // Crear un libro de prueba
        $book = Book::factory()->create();

        // Crear una lectura asociada al usuario y al libro
        $reading = Reading::factory()->create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'want_to_read' => false,
        ]);

        // Hacer una solicitud para actualizar el estado de lectura a "Quiero leer"
        $response = $this->actingAs($user)
                         ->post('/update-reading-status', [
                             'book_id' => $book->id,
                             'status' => 'quiero_leer',
                         ]);

        // Verificar que la lectura se haya actualizado correctamente
        $response->assertRedirect();
        $this->assertTrue($user->readings()->where('book_id', $book->id)->first()->want_to_read);
    }

    // Otros métodos de prueba para otros casos de uso, como actualizar a "Leyendo" o "Leído", eliminar lecturas, etc.
}
