<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Library;

class LibraryControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_create_library()
    {
        $this->withoutExceptionHandling();

        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post("/libraries", [
            'nombre' => 'Biblioteca 1',
            'tipo' => 'Pública',
            'user_id' => $user->id
        ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('libraries', [
            'nombre' => 'Biblioteca 1',
            'tipo' => 'Pública',
            'user_id' => $user->id
        ]);
    }

    /** @test */
    public function user_can_view_libraries()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get('/libraries');

        $response->assertStatus(200);
        $response->assertViewIs('libraries.index');
    }

    /** @test */
    public function user_can_delete_library()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $library = Library::factory()->create(['user_id' => $user->id]);

        $response = $this->delete("/libraries/{$library->id}");

        $response->assertStatus(302);
        $this->assertDatabaseMissing('libraries', ['id' => $library->id]);
    }

    // Otros métodos de prueba para editar, ver una biblioteca específica, etc.
}
