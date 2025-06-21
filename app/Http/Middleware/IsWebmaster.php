<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // ajouter
use Symfony\Component\HttpFoundation\Response;

class IsWebmaster
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && Auth::user()->isWebmaster()) {
            return $next($request);
        }

        abort(403, 'Accès refusé. Vous devez être webmaster.');
    }
}
