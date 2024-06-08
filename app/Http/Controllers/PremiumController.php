<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\StripeClient;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Role;

class PremiumController extends Controller
{
    /**
     * Display the premium subscription index page.
     */
    public function index()
    {
        // Obtener el usuario autenticado y su rol
        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;

        // Renderizar la vista Premium/Index con los datos del usuario autenticado
        return Inertia::render('Premium/Index', [
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ]
        ]);
    }

    /**
     * Create a new checkout session for subscription.
     */
    public function createCheckoutSession(Request $request)
    {
        // Crear una sesión de pago en Stripe según el plan seleccionado por el usuario

        // Crear una instancia de StripeClient con la clave secreta de Stripe
        $stripe = new StripeClient(env('STRIPE_SECRET_KEY'));
        
        // Obtener el plan seleccionado por el usuario desde la solicitud
        $plan = $request->input('plan');
        $priceId = '';

        // Asignar el ID del precio correspondiente al plan seleccionado
        switch ($plan) {
            case 'monthly':
                $priceId = env('STRIPE_PRICE_MONTHLY');
                break;
            case 'annual':
                $priceId = env('STRIPE_PRICE_ANNUAL');
                break;
            default:
                return response()->json(['error' => 'Plan seleccionado inválido'], 400);
        }

        // Crear la sesión de pago en Stripe
        $checkout_session = $stripe->checkout->sessions->create([
            'line_items' => [
                [
                    'price' => $priceId,
                    'quantity' => 1,
                ]
            ],
            'mode' => 'subscription',
            'success_url' => route('premium.update'), // URL de éxito después del pago
            'cancel_url' => route('dashboard'), // URL de cancelación de pago
        ]);

        // Redireccionar a la URL de la sesión de pago en Stripe
        return Inertia::location($checkout_session->url);
    }

    /**
     * Update the user subscription after successful payment.
     */
    public function updateSubscription()
    {
        // Obtener el usuario autenticado
        $user = Auth::user();

        // Desasociar el rol gratuito (ID 2) y asociar el rol premium (ID 3)
        $user->roles()->detach(2);
        $user->roles()->attach(3);

        // Redireccionar al panel de control después de actualizar la suscripción
        return redirect()->route('dashboard');
    }
}
