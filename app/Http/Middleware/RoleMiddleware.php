<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth; // ajouter 

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): \Symfony\Component\HttpFoundation\Response  $next
     * @param  mixed  ...$roles  // 👈 On récupère TOUS les rôles passés en paramètres
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
            // Vérifie que l'utilisateur est authentifié
            if (! auth()->check() ) {
                abort(401, 'Tu dois être connecté.');
            }

            // Si son rôle n'est pas dans le tableau, accès refusé
            if (! in_array(auth()->user()->role, $roles)) {
                abort(403, 'Accès refusé');
            }

            return $next($request);

    }
}
