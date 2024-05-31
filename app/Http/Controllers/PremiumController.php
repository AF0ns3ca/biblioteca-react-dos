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
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = Auth::user()->load('roles');
        $userRole = $user->roles->first()->role;
        return Inertia::render('Premium/Index', [
            'auth' => [
                'user' => array_merge($user->toArray(), ['role' => $userRole]),
            ]

        ]);
    }

    public function createCheckoutSession(Request $request)
    {
        // Lógica para crear la sesión de pago en Stripe

        $stripe = new StripeClient(env('STRIPE_SECRET_KEY'));
        $plan = $request->input('plan');
        $priceId = '';

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

        $checkout_session = $stripe->checkout->sessions->create([
            'line_items' => [
                [
                    'price' => $priceId,
                    'quantity' => 1,
                ]
            ],
            'mode' => 'subscription',
            'success_url' => route('premium.update'),
            'cancel_url' => route('dashboard'),
        ]);

        return Inertia::location($checkout_session->url);
    }

    public function updateSubscription()
    {

        $user = Auth::user();
        $user->roles()->detach(2);
        $user->roles()->attach(3); 

        return redirect()->route('dashboard');
    }

}
