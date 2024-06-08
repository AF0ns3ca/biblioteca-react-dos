<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle($request, Closure $next, $role)
    {
        if (!Auth::check() || !Auth::user()->roles->pluck('role')->contains($role)) {
            abort(403, 'No tienes permiso para acceder a este área.');
        }

        return $next($request);
    }
}


